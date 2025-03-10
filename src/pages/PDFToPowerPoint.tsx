import { useEffect, useState } from "react";
import "../assets/styles/UploadPage.css";
import InputFile from "../components/inputFile/inputFilePDF/inputFile";
import { uploadFileConvertPowerPoint } from "../utils/convertPDFFunctions";

const PDFToPowerPoint: React.FC = () => {
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

  const handleUploadToPowerPoint = async () => {
    if (!file) return;
    setLoading(true);
    const success = await uploadFileConvertPowerPoint(file, "convertPowerPoint");

    if (success) {
      setFile(null);
      setPreviewURL(null);
    }

    setLoading(false);
  };

  return (
    <div className={`containerUpload ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1 className="title-word">
        Convierte PDF a <span style={{color:"#D04423"}}>Power Point</span>{" "}
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
            <div className="loader"></div>
          ) : (
            <>
              <button onClick={handleRemoveFile} className="remove-btn">
                Cancelar
              </button>

              <button
                onClick={handleUploadToPowerPoint}
                className="upload-btn"
                disabled={loading || !file}
                style={{ backgroundColor: "#D04423" }}
              >
                {loading ? "Cargando" : "Convertir a PowerPoint"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFToPowerPoint;
