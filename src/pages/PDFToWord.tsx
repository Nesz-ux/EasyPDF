import { useEffect, useState } from "react";
import "../assets/styles/UploadPage.css";
import { API_BASE_URL } from "../utils/config";

const PDFToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedDarkMode = JSON.parse(
        localStorage.getItem("darkMode") || "false"
      );
      setDarkMode(storedDarkMode);
    } catch (error) {
      console.error("Error loading data from localStorage", error);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      alert("No se seleccionó ningún archivo.");
      return;
    }

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      alert("No se seleccionó ningún archivo válido.");
      return;
    }

    // Validar tipo de archivo PDF
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.endsWith(".pdf")
    ) {
      alert("Por favor selecciona un archivo PDF.");
      return;
    }

    setFile(selectedFile);

    // Crear vista previa
    const objectURL = URL.createObjectURL(selectedFile);
    setPreviewURL(objectURL);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo antes de subir.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    // Obtener el nombre original sin extensión
    const originalFileName = file.name.split(".").slice(0, -1).join("."); // Alternativa a path.parse

    try {
      const response = await fetch(`${API_BASE_URL}/api/convertWord`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Usar el mismo nombre del archivo original pero con .docx
        const a = document.createElement("a");
        a.href = url;
        a.download = `${originalFileName}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Liberar memoria
      } else {
        const errorResponse = await response.json();
        alert(
          `Error al convertir el archivo: ${
            errorResponse.error || "Error desconocido"
          }`
        );
      }
    } catch (error) {
      console.error("Error al subir el archivo", error);
      alert("Hubo un problema al procesar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`containerUpload ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>Convierte PDF a Word</h1>

      <input type="file" accept=".pdf" onChange={handleFileChange} />

      {previewURL && (
        <iframe
          src={previewURL}
          title="Vista previa del PDF"
          className="pdf-preview"
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      )}

      <button onClick={handleUpload} className="upload-btn" disabled={loading}>
        {loading ? "Convirtiendo..." : "Subir PDF"}
      </button>
    </div>
  );
};

export default PDFToWord;
