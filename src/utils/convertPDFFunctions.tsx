import { API_BASE_URL } from "./config";

export const uploadFileConvertWord = async (
  file: File,
  endpointURL: string
): Promise<boolean> => {
  if (!file) {
    alert("Por favor selecciona un archivo antes de subir.");
    return false;
  }

  const formData = new FormData();
  formData.append("file", file);

  // Obtener el nombre original sin extensión
  const originalFileName = file.name.split(".").slice(0, -1).join(".");

  try {
    const response = await fetch(`${API_BASE_URL}/api/${endpointURL}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(
        `Error al convertir el archivo: ${
          errorResponse.error || "Error desconocido"
        }`
      );
      return false;
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Verificar si el archivo tiene contenido
    if (blob.size === 0) {
      alert("Error: El archivo descargado está vacío.");
      return false;
    }

    // Crear una URL temporal para el archivo
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace de descarga y ejecutarlo
    const a = document.createElement("a");
    a.href = url;
    a.download = `${originalFileName}.docx`; // Asegurar la extensión correcta
    document.body.appendChild(a);
    a.click();

    // Eliminar el enlace del DOM y liberar memoria
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error al subir el archivo", error);
    alert("Hubo un problema al procesar el archivo.");
    return false;
  }
};

export const uploadFileConvertExcel = async (
  file: File,
  endpointURL: string
): Promise<boolean> => {
  if (!file) {
    alert("Por favor selecciona un archivo antes de subir.");
    return false;
  }

  const formData = new FormData();
  formData.append("file", file);

  // Obtener el nombre original sin extensión
  const originalFileName = file.name.split(".").slice(0, -1).join(".");

  try {
    const response = await fetch(`${API_BASE_URL}/api/${endpointURL}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(
        `Error al convertir el archivo: ${
          errorResponse.error || "Error desconocido"
        }`
      );
      return false;
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Verificar si el archivo tiene contenido
    if (blob.size === 0) {
      alert("Error: El archivo descargado está vacío.");
      return false;
    }

    // Crear una URL temporal para el archivo
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace de descarga y ejecutarlo
    const a = document.createElement("a");
    a.href = url;
    a.download = `${originalFileName}.xlsx`;
    document.body.appendChild(a);
    a.click();

    // Eliminar el enlace del DOM y liberar memoria
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error al subir el archivo", error);
    alert("Hubo un problema al procesar el archivo.");
    return false;
  }
};

export const uploadFileConvertPowerPoint = async (
    file: File,
    endpointURL: string
  ): Promise<boolean> => {
    if (!file) {
      alert("Por favor selecciona un archivo antes de subir.");
      return false;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    // Obtener el nombre original sin extensión
    const originalFileName = file.name.split(".").slice(0, -1).join(".");
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/${endpointURL}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(
          `Error al convertir el archivo: ${
            errorResponse.error || "Error desconocido"
          }`
        );
        return false;
      }
  
      // Convertir la respuesta en un Blob
      const blob = await response.blob();
  
      // Verificar si el archivo tiene contenido
      if (blob.size === 0) {
        alert("Error: El archivo descargado está vacío.");
        return false;
      }
  
      // Crear una URL temporal para el archivo
      const url = window.URL.createObjectURL(blob);
  
      // Crear un enlace de descarga y ejecutarlo
      const a = document.createElement("a");
      a.href = url;
      a.download = `${originalFileName}.pptx`;
      document.body.appendChild(a);
      a.click();
  
      // Eliminar el enlace del DOM y liberar memoria
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      return true;
    } catch (error) {
      console.error("Error al subir el archivo", error);
      alert("Hubo un problema al procesar el archivo.");
      return false;
    }
  };
