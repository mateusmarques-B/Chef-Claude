import React from "react";
export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient} className="text-gray-700 leading-7 ">
      {ingredient}
    </li>
  ));
  return (
    <section>
      <h2 className="mb-2">Ingredientes nas mãos:</h2>
      <ul className="mb-12" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#f0efeb] p-4 sm:p-6 rounded-lg">
          <div ref={props.ref}>
            <h3 className="text-lg font-medium leading-6">
              Pronto para uma receita?
            </h3>
            <p className="text-[#6b7280] text-xs leading-5">
              Gere uma receita da sua lista de ingredientes
            </p>
          </div>
          <button
            className="border-none rounded-md bg-[#d17557] shadow-sm text-[#fafaf8] 
              px-[17px] py-[9px] font-[Inter] text-xs cursor-pointer"
            onClick={props.getRecipe}
            disabled={props.loading}
          >
            {props.loading ? "Carregando..." : "Pegue a receita"}
          </button>
        </div>
      )}
    </section>
  );
}
