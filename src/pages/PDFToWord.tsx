import { useState } from "react";
import { API_BASE_URL } from "../utils/config";
import "../assets/styles/UploadPage.css";

const PDFToWord = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      alert("No se seleccionó ningún archivo");
      return;
    }
    const selectedFile = files[0];
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    } else {
      alert("Por favor selecciona un archivo PDF");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch(`${API_BASE_URL}/pdf/convert`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(`Archivo subido: ${data.message}`);
    } catch (error) {
      console.error("Error al subir el archivo", error);
      alert("Error al subir el archivo");
    }
  };

  return (
    <div className="containerUpload">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {previewURL && (
        <iframe
          src={previewURL}
          title="Vista previa del PDF"
          className="pdf-preview"
        />
      )}

      <button onClick={handleUpload} className="upload-btn">
        Subir PDF
      </button>
    </div>
  );
};

export default PDFToWord;
