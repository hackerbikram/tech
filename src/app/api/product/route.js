export async function GET(req) {
  const categories = ["Tech", "Fashion", "Hardware", "Science", "Daily Use"];

  const products = Array.from({ length: 120 }, (_, i) => {
    const category = categories[i % categories.length];
    return {
      id: i + 1,
      name: `${category} Product ${i + 1}`,
      price: (Math.random() * 500 + 10).toFixed(2),
      category,
      image: `/products/${category.toLowerCase().replace(/\s/g, "")}${(i % 5) + 1}.jpeg`,
      description: `High-quality ${category.toLowerCase()} item number ${i + 1}.`,
    };
  });

  return Response.json({
    products,
    categories,
  });
}