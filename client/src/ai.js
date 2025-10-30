export async function getRecipeFromGemini(ingredients) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe`, {
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
