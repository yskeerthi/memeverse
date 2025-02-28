import React, { useState, useRef, useEffect } from "react";
import "./MemeUploader.css";

const MemeUploader = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [captionPosition, setCaptionPosition] = useState(150);
  const canvasRef = useRef(null);
  const captions = [
    "When life gives you lemons 🍋",
    "Me trying to be productive 🤡",
    "Code works, I don’t know why...",
    "Friday mood activated! 😎",
    "Me waiting for my crush to text 😴",
  ];

  // Handle Image Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw Image and Caption on Canvas
  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = image;

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        ctx.strokeText(caption, canvas.width / 2, captionPosition);
        ctx.fillText(caption, canvas.width / 2, captionPosition);
      };
    }
  }, [image, caption, captionPosition]);

  return (
    <div className="main-cont">
    <div className="meme-container">
      <h1 className="title">Upload Your Meme</h1>

      <div className="upload-section">
        <label htmlFor="meme-file">Select Image:</label>
        <input type="file" id="meme-file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="caption-section">
        <label htmlFor="caption-input">Enter Caption:</label>
        <input
          type="text"
          id="caption-input"
          placeholder="Enter your meme text..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={() => setCaption(captions[Math.floor(Math.random() * captions.length)])}>
          Generate Random Caption
        </button>
      </div>

      <h3 className="preview-title">Preview</h3>
      <div className="preview-section">
        <canvas ref={canvasRef} id="meme-canvas" width={300} height={300}></canvas>
      </div>

      <div className="adjustment-section">
        <label>Adjust Caption:</label>
        <input
          type="range"
          id="text-position"
          min="20"
          max="280"
          value={captionPosition}
          onChange={(e) => setCaptionPosition(e.target.value)}
        />
      </div>

      <button onClick={() => alert("Meme Uploaded Successfully! 🎉")}>Upload Meme</button>
    </div>
    </div>
  );
};

export default MemeUploader;
