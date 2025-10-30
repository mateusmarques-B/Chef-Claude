export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  return (
    <section>
      <h2>Ingredientes nas mãos:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Pronto para uma receita?</h3>
            <p>Gere uma receita da sua lista de ingredientes</p>
          </div>
          <button onClick={props.getRecipe} disabled={props.loading}>
            {props.loading ? "Carregando..." : "Pegue a receita"}
          </button>
        </div>
      )}
    </section>
  );
}
