import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PDFToWord from "./pages/PDFToWord";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdftoword" element={<PDFToWord />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
