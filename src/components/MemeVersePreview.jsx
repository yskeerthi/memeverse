import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemeVersePreview.css"; 


const gifs = [
  "/one.gif",
  "/two.gif",
  "/threee.gif",
];

const MemeVersePreview = () => {
  const [textVisible, setTextVisible] = useState(true);
  const [gifIndex, setGifIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    createParticles();
    animateText();
  }, []);

  const createParticles = () => {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;
    particlesContainer.innerHTML = "";
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particlesContainer.appendChild(particle);
    }
  };

  const animateText = () => {
    setTimeout(() => {
      setTextVisible(false);
      setGifIndex(0);
    }, 2500);
  };

  useEffect(() => {
    if (gifIndex >= 0 && gifIndex < gifs.length) {
      const timeout = setTimeout(() => {
        setGifIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timeout);
    } else if (gifIndex >= gifs.length) {
      setTimeout(() => {
        navigate("/explorer");
      }, 1000);
    }
  }, [gifIndex, navigate]);

  return (
    <div className="preview-container">
      <div id="particles" className="particle-container"></div>
      {textVisible && (
        <div id="text-container" className="text-overlay">
          <h1 className="meme-text">
            MEME<br />VERSE
          </h1>
        </div>
      )}
      {gifIndex >= 0 && gifIndex < gifs.length && (
        <div id="gif-container" className="gif-overlay">
          <img src={gifs[gifIndex]} className="gif-image" alt="Meme GIF" />
        </div>
      )}
    </div>
  );
};

export default MemeVersePreview;
