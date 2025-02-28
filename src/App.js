import React from "react";
import { Routes, Route } from "react-router-dom";
import MemeExplorer from "./components/MemeExplorer";
import MemeUploader from "./components/MemeUploader";
import MemeVersePreview from "./components/MemeVersePreview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MemeVersePreview />} />
      <Route path="/explorer" element={<MemeExplorer />} />
      <Route path="/upload" element={<MemeUploader />} />
    </Routes>
  );
};

export default App;
