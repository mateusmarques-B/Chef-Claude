import Markdown from "react-markdown";
import { useEffect, useRef } from "react";

// No ambiente do Canvas, é comum carregar bibliotecas externas dessa forma.
const PDF_SCRIPTS = [
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
];

function loadScripts(urls) {
  urls.forEach((url) => {
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export default function ClaudeRecipe({ recipe }) {
  // carrega as dependências PDF uma única vez
  useEffect(() => {
    loadScripts(PDF_SCRIPTS);
  }, []);

  // Ref para a seção a exportar
  const recipeRef = useRef(null);

  if (!recipe || typeof recipe != "object" || !recipe.name) {
    return (
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Claude Recomenda:</h2>
        <p>Aguardando receita...</p>
      </section>
    );
  }

  const markdownContent = `
    ${recipe.name}
    ${recipe.description || "Uma receita deliciosa gerada pelo Chef Claude."}

    ${recipe.ingredients
      .map((ing) => `-${ing.quantity} ${ing.unit} de ${ing.item}`)
      .join("\n")}

    ${recipe.instructions
      .map((instr, index) => `${index + 1}. ${instr}`)
      .join("\n")}
    `.trim();

  const handleExportPDF = () => {
    if (
      typeof window.html2canvas === "undefined" ||
      typeof window.jspdf === "undefined" ||
      !recipeRef.current
    ) {
      console.error(
        "Bibliotecas jspdf ou html2canvas não carregadas completamente."
      );
      return;
    }

    // feedback visual de carregamento
    const exportButton = document.getElementById("export-pdf-button");
    exportButton.textContent = "A gerar PDF...";
    exportButton.disabled = true;

    //Obtém o elemento que contém a receita
    const input = recipeRef.current;

    //Inicializa o jsPDF
    const { jsPDF } = new window.jspdf();
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWiddth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    //Renderiza o elemento HTML em um Canvas
    window
      .html2canvas(input, { scale: 2, logging: false })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Adiciona a imagem ao PDF
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Lógica para múltilas páginas
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        // Salva o arquivo
        pdf.save(
          `receita-${recipe.name.replace(/\s/g, "_").toLowerCase()}.pdf`
        );

        // Restaura o botão
        exportButton.textContent = "Exportar para PDF";
        exportButton.disabled = false;
      })
      .catch((err) => {
        console.error("Erro ao gerar PDF:", err);
        exportButton.textContent = "Erro ao exportar";
        exportButton.disabled = false;
      });
  };

  return (
    <section className="suggested-recipe-wrapper">
      <div
        ref={recipeRef}
        className="suggested-recipe-container p-6 bg-white shadow-xl rounded-lg mb-4"
        aria-live="polite"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          Chef Claude Recommends:
        </h2>
        <Markdown>{markdownContent}</Markdown>
      </div>

      <button
        id="export-pdf-button"
        onClick={handleExportPDF}
        className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg 
          shadow-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
      >
        Exportar para PDF
      </button>
    </section>
  );
}
