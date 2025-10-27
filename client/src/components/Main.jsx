import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import Spinner from "./Spinner";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
import jsPDF from "jspdf";


export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    setLoading(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function exportRecipe(recipeText) {
    const doc = new jsPDF();
    doc.text(recipeText, 10, 10);
    doc.save("recipe.pdf");
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700"></h1>

      <form
        action={addIngredient}
        className="flex justify-center gap-3 h-[38px]"
      >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          className="rounded-md border border-gray-300 px-[13px] py-[9px] shadow-sm flex-grow min-w-[150px] max-w-[400px]"
        />

        <button
          type="submit"
          className="rounded-md bg-[#141413] text-[#fafaf8] w-[150px] text-sm font-medium"
        >
          + Add ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          loading={loading}
        />
      )}
      {loading && <Spinner />}

      {recipe && (
        <div className="mt-8">
          <ClaudeRecipe recipe={recipe} />
        </div>
      )}
      
    </main>
  );
}
