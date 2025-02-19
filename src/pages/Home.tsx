import { useState } from "react";
// Importing styles
import "../assets/styles/HomeStyle.css";
// Importing images
import LogoDasavena from "../assets/images/LogoDasavena.png";
import sun from "../assets/images/sol.webp";
import moon from "../assets/images/luna.webp";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="title-container">
        <img src={LogoDasavena} alt="Logo" />
        <h1 className="title">Dasavena EasyPDF</h1>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <button className="btn-change-mode" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <img src={sun} alt="ligth" width={35} height={35} />
          ) : (
            <img src={moon} alt="dark" width={35} height={35} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Home;
