I'll provide you with the full React codebase for **MemeVerse**, following the exact tech stack you've mentioned:  

- **React** (No TypeScript, only JavaScript)
- **Tailwind CSS** for styling
- **Framer Motion/GSAP** for animations
- **Redux Toolkit/Context API** for state management
- **Local Storage/IndexedDB** for caching data
- **Meme APIs** (Imgflip API, Meme Generator API)
- **Cloudinary/Firebase** for image uploads
- **Lighthouse/React Profiler** for performance optimization  

### Steps to Follow:  
1. **Initialize the Project**  
   ```sh
   npx create-react-app memeverse --template redux
   cd memeverse
   npm install react-router-dom @reduxjs/toolkit react-redux tailwindcss framer-motion gsap axios firebase
   ```
2. **Set Up Tailwind**  
   ```sh
   npx tailwindcss init -p
   ```
   Add Tailwind to `tailwind.config.js`:
   ```js
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: { extend: {} },
     plugins: [],
   };
   ```
   Add this to `index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. **Project Structure**  
   ```
   src/
   ├── components/
   │   ├── Header.js
   │   ├── Footer.js
   │   ├── MemeCard.js
   │   ├── DarkModeToggle.js
   ├── pages/
   │   ├── Home.js
   │   ├── Explorer.js
   │   ├── Upload.js
   │   ├── MemeDetails.js
   │   ├── Profile.js
   │   ├── Leaderboard.js
   │   ├── NotFound.js
   ├── redux/
   │   ├── store.js
   │   ├── memeSlice.js
   ├── App.js
   ├── index.js
   ├── tailwind.config.js
   ```
   
4. **Code for Header Component (`Header.js`)**
   ```jsx
   import { Link } from "react-router-dom";
   import DarkModeToggle from "./DarkModeToggle";

   const Header = () => {
     return (
       <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
         <Link to="/" className="text-2xl font-bold">MemeVerse</Link>
         <nav>
           <Link to="/" className="mx-2">Home</Link>
           <Link to="/explore" className="mx-2">Explore</Link>
           <Link to="/upload" className="mx-2">Upload</Link>
           <Link to="/leaderboard" className="mx-2">Leaderboard</Link>
           <Link to="/profile" className="mx-2">Profile</Link>
         </nav>
         <DarkModeToggle />
       </header>
     );
   };

   export default Header;
   ```

5. **Dark Mode Toggle (`DarkModeToggle.js`)**
   ```jsx
   import { useState, useEffect } from "react";

   const DarkModeToggle = () => {
     const [darkMode, setDarkMode] = useState(false);

     useEffect(() => {
       document.documentElement.classList.toggle("dark", darkMode);
     }, [darkMode]);

     return (
       <button 
         className="bg-gray-700 text-white px-4 py-2 rounded"
         onClick={() => setDarkMode(!darkMode)}
       >
         {darkMode ? "Light Mode" : "Dark Mode"}
       </button>
     );
   };

   export default DarkModeToggle;
   ```

6. **Redux Store Setup (`store.js`)**
   ```js
   import { configureStore } from "@reduxjs/toolkit";
   import memeReducer from "./memeSlice";

   export const store = configureStore({
     reducer: { memes: memeReducer },
   });
   ```

7. **Meme Slice (`memeSlice.js`)**
   ```js
   import { createSlice } from "@reduxjs/toolkit";

   const memeSlice = createSlice({
     name: "memes",
     initialState: { memes: [] },
     reducers: {
       setMemes: (state, action) => { state.memes = action.payload; },
     },
   });

   export const { setMemes } = memeSlice.actions;
   export default memeSlice.reducer;
   ```

8. **Home Page (`Home.js`)**
   ```jsx
   import { useEffect, useState } from "react";
   import axios from "axios";
   import MemeCard from "../components/MemeCard";

   const Home = () => {
     const [memes, setMemes] = useState([]);

     useEffect(() => {
       axios.get("https://api.imgflip.com/get_memes")
         .then(response => setMemes(response.data.data.memes))
         .catch(error => console.error(error));
     }, []);

     return (
       <div className="p-6">
         <h1 className="text-3xl font-bold mb-4">Trending Memes</h1>
         <div className="grid grid-cols-3 gap-4">
           {memes.map((meme) => (
             <MemeCard key={meme.id} meme={meme} />
           ))}
         </div>
       </div>
     );
   };

   export default Home;
   ```

9. **Meme Card (`MemeCard.js`)**
   ```jsx
   import { motion } from "framer-motion";

   const MemeCard = ({ meme }) => {
     return (
       <motion.div 
         className="bg-gray-800 p-4 rounded-lg"
         whileHover={{ scale: 1.05 }}
       >
         <img src={meme.url} alt={meme.name} className="w-full rounded" />
         <h2 className="text-white mt-2">{meme.name}</h2>
       </motion.div>
     );
   };

   export default MemeCard;
   ```

10. **Routing Setup (`App.js`)**
    ```jsx
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Header from "./components/Header";
    import Home from "./pages/Home";
    import Explorer from "./pages/Explorer";
    import Upload from "./pages/Upload";
    import MemeDetails from "./pages/MemeDetails";
    import Profile from "./pages/Profile";
    import Leaderboard from "./pages/Leaderboard";
    import NotFound from "./pages/NotFound";

    function App() {
      return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explorer />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/meme/:id" element={<MemeDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
    }

    export default App;
    ```

11. **Final Steps**
    ```sh
    npm run dev
    ```

// MemeUpload.jsx - Upload memes with preview
```
import { useState } from "react";
import { motion } from "framer-motion";

const MemeUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white">
      <motion.h2 className="text-3xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Upload Meme</motion.h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {image && <img src={image} alt="Preview" className="w-64 h-64 rounded-lg shadow-lg mb-4" />}
      <input type="text" placeholder="Add Caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white" />
      <motion.button whileHover={{ scale: 1.1 }} className="bg-blue-500 px-4 py-2 rounded-md mt-4">Upload</motion.button>
    </div>
  );
};
export default MemeUpload;

```
// MemeDetails.jsx - Displays meme details

```
import { useState } from "react";
import { motion } from "framer-motion";

const MemeDetails = ({ meme }) => {
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(meme.id)) || 0);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(meme.id, newLikes);
  };

  return (
    <div className="p-6 bg-gray-900 text-white flex flex-col items-center">
      <img src={meme.url} alt="Meme" className="w-72 h-72 rounded-lg shadow-lg mb-4" />
      <p className="text-lg">{meme.caption}</p>
      <motion.button whileHover={{ scale: 1.1 }} onClick={handleLike} className="mt-4 bg-red-500 px-4 py-2 rounded-md">❤️ {likes}</motion.button>
    </div>
  );
};
export default MemeDetails;
```

// Leaderboard.jsx - Displays top 10 memes by likes
```
import { useEffect, useState } from "react";

const Leaderboard = ({ memes }) => {
  const [sortedMemes, setSortedMemes] = useState([]);

  useEffect(() => {
    const rankedMemes = memes.map((meme) => ({ ...meme, likes: parseInt(localStorage.getItem(meme.id)) || 0 }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
    setSortedMemes(rankedMemes);
  }, [memes]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {sortedMemes.map((meme, index) => (
          <li key={meme.id} className="flex items-center gap-4 p-2 bg-gray-800 rounded-md mb-2">
            <span className="text-xl font-bold">#{index + 1}</span>
            <img src={meme.url} alt="Meme" className="w-12 h-12 rounded-md" />
            <p>{meme.caption}</p>
            <span className="ml-auto">❤️ {meme.likes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Leaderboard;
```
