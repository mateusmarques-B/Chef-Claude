import React from "react";
export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient} className="text-gray-700 leading-7">
      {ingredient}
    </li>
  ));
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm>justify-between bg-[#f0efeb] p-4 sm:p-6 rounded-lg">
          <div ref={props.ref}>
            <h3 className="text-lg font-medium leading-6">
              Ready for a recipe?
            </h3>
            <p className="text-sm text-gray-500 leading-5">
              Generate a recipe from your list of ingredients
            </p>
          </div>
          <button
            onClick={props.getRecipe}
            disabled={props.loading}
            className="mt-4 sm:mt-0 bg-[#d17557] hover:bg-[#bb6246] text-[#fafaf8] text-sm font-medium px-4 py-2 rounded shadow"
          >
            {props.loading ? "Loading..." : "Get a recipe"}
          </button>
        </div>
      )}
    </section>
  );
}
