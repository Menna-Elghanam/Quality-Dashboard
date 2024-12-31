import { get } from "../services/http";

export const handleDownload = async (format) => {
    try {
      const response = await get(`/api/file/${format}`,{},"blob");

      const blob = new Blob([response], {
        type: format === "csv" ? "text/csv" : "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        format === "csv" ? "records.csv" : "records.pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };