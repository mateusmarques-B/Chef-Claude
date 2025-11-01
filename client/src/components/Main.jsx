import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import Spinner from "./Spinner";
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
    <main className="max-w-2xl mx-auto pt-[30px] pr-[30px] pb-[10px] pl-[30px]">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700"></h1>

      <form
        action={addIngredient}
        className="flex justify-center gap-3 h-[38px] mb-4"
      >
        <input
          type="text"
          placeholder="ex: oregano"
          aria-label="Add ingredient"
          name="ingredient"
          className="rounded-md border border-gray-300 px-[13px] py-[9px] shadow-sm flex-grow min-w-[150px] max-w-[400px]"
        />
        <button
          className="border-none rounded-md bg-[#141413] text-[#fafaf8] font-[Inter] w-40 text-sm font-medium 
            before:content-['+'] before:mr-1.5"
        >
          Add ingrediente
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
