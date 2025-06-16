
export async function getRecipeFromMistral(ingredients) {
  const res = await fetch("http://localhost:3001/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });

  if (!res.ok) {
    throw new Error("Error when searching for recipe");
  }

  const data = await res.json();
  return data.recipe;
}
