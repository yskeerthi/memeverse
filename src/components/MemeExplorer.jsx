import React, { useState, useEffect } from "react";

const fetchMemes = async () => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    return data.data.memes; // API returns { success, data: { memes: [...] } }
  } catch (error) {
    console.error("Error fetching memes:", error);
    return [];
  }
};

const MemeExplorer = () => {
  const [allMemes, setAllMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const memesPerPage = 20;

  useEffect(() => {
    const loadMemes = async () => {
      const memes = await fetchMemes();
      setAllMemes(memes);
      setFilteredMemes(memes.slice(0, memesPerPage));
    };
    loadMemes();
  }, []);

  const loadMoreMemes = () => {
    const startIndex = (currentPage + 1) * memesPerPage;
    setFilteredMemes((prev) => [...prev, ...allMemes.slice(startIndex, startIndex + memesPerPage)]);
    setCurrentPage((prev) => prev + 1);
  };

  const searchMemes = (query) => {
    setSearchQuery(query);
    const filtered = allMemes.filter((meme) =>
      meme.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMemes(filtered.slice(0, memesPerPage));
  };

  return (
    <div style={{ background: "black", minHeight: "100vh", paddingTop: "60px" }}>
      {/* 🔹 HEADER NAVIGATION */}
      <header style={{ background: "#0A0B33", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <h1 style={{ color: "white", margin: 0, fontSize: "24px", fontWeight: "bold" }}>Meme Explorer</h1>
        <nav>
          <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0 }}>
            {["Trending", "Explorer", "Upload", "Details", "Leaderboard"].map((item, index) => (
              <li key={index} style={{ color: item === "Explorer" ? "#a855f7" : "white", cursor: "pointer", fontWeight: item === "Explorer" ? "bold" : "normal" }}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 🔹 PAGE CONTENT */}
      <div style={{ background: "linear-gradient(to bottom, #2e0249, #190026)", height:"100%", padding: "80px 20px" }}>
        <h2 style={{ color: "#a855f7", textAlign: "left", fontSize: "30px", paddingLeft: "30px", marginBottom: "20px" }}>
          Explore Memes
        </h2>

        {/* 🔹 SEARCH BAR */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search memes..."
            value={searchQuery}
            onChange={(e) => searchMemes(e.target.value)}
            style={{
              padding: "10px 15px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "20px",
              border: "none",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        {/* 🔹 MEME GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            padding: "0 30px",
          }}
        >
          {filteredMemes.map((meme) => (
            <div key={meme.id} style={{ background: "#333", borderRadius: "10px", overflow: "hidden" }}>
              <img
                src={meme.url} // ✅ Corrected Image URL from API
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
                alt={meme.name}
              />
            </div>
          ))}
        </div>

        {/* 🔹 LOAD MORE BUTTON */}
        {filteredMemes.length < allMemes.length && (
          <button
            onClick={loadMoreMemes}
            style={{
              padding: "10px 20px",
              background: "#a855f7",
              color: "white",
              borderRadius: "20px",
              marginTop: "20px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
            }}
          >
            Load More Memes
          </button>
        )}
      </div>
    </div>
  );
};

export default MemeExplorer;
