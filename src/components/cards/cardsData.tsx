import PDFWord from "../../assets/icons/PDF-Word.svg";
import PDFExcel from "../../assets/icons/PDF-Excel.svg";
import PDFPowerPoint from "../../assets/icons/PDF-PowerPoint.svg";
import PDFJpg from "../../assets/icons/PDF-JPG.svg";

const apps = [
  {
    image: PDFWord,
    title: "PDF a Word",
    description:
      "Convierte tus documentos WORD a PDF con la máxima calidad y exactamente igual que el archivo DOC o DOCX original.",
    url: "/PDFToWord",
  },
  {
    image: PDFExcel,
    title: "PDF a Excel",
    description: "Extrae directamente datos de PDF a Excel en pocos segundos.",
    url: "PDFToExcel",
  },
  {
    image: PDFPowerPoint,
    title: "PDF a PowerPoint",
    description:
      "Convierte tus archivos PDF a presentaciones PPTX de POWERPOINT.",
    url: "PDFToPowerPoint",
  },
  {
    image: PDFJpg,
    title: "PDF a JPG",
    description:
      "Extrae todas las imágenes que están dentro de un PDF o convierte cada página en una imagen JPG.",
    url: "PDFToJPG",
  },
];

export default apps;
