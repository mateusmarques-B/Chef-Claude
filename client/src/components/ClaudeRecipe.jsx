import Markdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
  if (!recipe || typeof recipe != "object" || !recipe.name) {
    return (
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Claude Recomenda:</h2>
        <p>Aguardando receita ou erro no formato retornado...</p>
      </section>
    );
  }

  const markdownContent = `
    ${recipe.name}
    ${recipe.description || ""}

    ${recipe.ingredients
      .map((ing) => `-${ing.quantity} ${ing.unit} de ${ing.item}`)
      .join("\n")}

    ${recipe.instructions
      .map((instr, index) => `${index + 1}. ${instr}`)
      .join("\n")}
    `.trim();

  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <Markdown>{markdownContent}</Markdown>
    </section>
  );
}
