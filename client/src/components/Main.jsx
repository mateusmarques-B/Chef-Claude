import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromGemini } from "../ai";

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
    const recipeMarkdown = await getRecipeFromGemini(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="ex: oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingrediente</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          loading={loading}
        />
      )}
      {loading && <div className="spinner"></div>}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
