import { useEffect, useState } from "react";
import "../assets/styles/UploadPage.css";
import InputFile from "../components/inputFile/inputFilePDF/inputFile";
import { uploadPDFConvertToJPG } from "../utils/convertPDFFunctions";

const PDFToJPG: React.FC = () => {
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

  const handleUploadToJPG = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const success = await uploadPDFConvertToJPG(file, "convertJPG");
      if (success) {
        setFile(null);
        setPreviewURL(null);
      }
    } catch (error) {
      console.error("Error en la conversión de PDF a JPG:", error);
      alert("Hubo un error al procesar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`containerUpload ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1 className="title-word">
        Convierte PDF a <span style={{ color: "#d6bf2d" }}>JPG</span>{" "}
      </h1>
      <p>
        Convierte cada página de tu archivo PDF en una imagen JPG. Con la
        tecnología de
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
                onClick={handleUploadToJPG}
                className="upload-btn"
                disabled={loading || !file}
                style={{ backgroundColor: "#d6bf2d" }}
              >
                {loading ? "Cargando" : "Convertir a JPG"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFToJPG;
