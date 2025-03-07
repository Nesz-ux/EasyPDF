import { useEffect, useState } from "react";
import "../assets/styles/UploadPage.css";
import { API_BASE_URL } from "../utils/config";
import InputFile from "../components/inputFile/inputFilePDF/inputFile";

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

  // Función para manejar el archivo seleccionado desde el componente Form
  const handleFileChange = (selectedFile: File) => {
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

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewURL(null);
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
    const originalFileName = file.name.split(".").slice(0, -1).join(".");

    try {
      const response = await fetch(`${API_BASE_URL}/api/convertExcel`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Usar el mismo nombre del archivo original pero con .docx
        const a = document.createElement("a");
        a.href = url;
        a.download = `${originalFileName}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setFile(null);
        setPreviewURL(null);
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
      <h1 className="title-excel">
        Convierte PDF a <span>Excel</span>{" "}
      </h1>
      <p>
        Convierte tus PDF a WORD con una precisión increíble. Con la tecnología
        de
        <span className="adobe-text"> Adobe Acrobat.</span>
      </p>
      {previewURL && (
        <iframe
          src={previewURL}
          title="Vista previa del PDF"
          className="pdf-preview"
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      )}

      {!file ? (
        <InputFile onFileSelect={handleFileChange} />
      ) : (
        <div className="file-actions">
          {/* Mostrar el loader si está cargando */}
          {loading ? (
            <div
              style={{ borderBottom: "4px solid #185C37" }}
              className="loader"
            ></div>
          ) : (
            <>
              <button onClick={handleRemoveFile} className="remove-btn">
                Cancelar
              </button>

              <button
                style={{
                  backgroundColor: "#185C37",
                }}
                onClick={handleUpload}
                className="upload-btn"
                disabled={loading || !file}
              >
                {loading ? "Cargando" : "Convertir a Excel"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFToWord;
