export async function GET(req) {
  const categories = ["Tech", "Fashion", "Hardware", "Science", "Daily Use"];

  const products = [
    {
      id: 1,
      name: "Tech Product 1",
      price: "299.99",
      category: "Tech",
      image: "/products/tech1.jpeg",
      description: "High-quality tech item with cutting-edge features.",
    },
    {
      id: 2,
      name: "Fashion Product 1",
      price: "89.99",
      category: "Fashion",
      image: "/products/fashion1.jpeg",
      description: "Stylish and comfortable fashion wear.",
    },
    {
      id: 3,
      name: "Hardware Product 1",
      price: "149.50",
      category: "Hardware",
      image: "/products/hardware1.jpeg",
      description: "Durable and reliable hardware tool.",
    },
    {
      id: 4,
      name: "Science Product 1",
      price: "59.90",
      category: "Science",
      image: "/products/science1.jpeg",
      description: "Educational science kit for curious minds.",
    },
    {
      id: 5,
      name: "Daily Use Product 1",
      price: "19.99",
      category: "Daily Use",
      image: "/products/dailyuse1.jpeg",
      description: "Essential daily use item for convenience.",
    },
    {
      id: 6,
      name: "Tech Product 2",
      price: "449.00",
      category: "Tech",
      image: "/products/tech2.jpeg",
      description: "Advanced tech gadget for professionals.",
    },
    {
      id: 7,
      name: "Fashion Product 2",
      price: "120.00",
      category: "Fashion",
      image: "/products/fashion2.jpeg",
      description: "Elegant fashion item for special occasions.",
    },
    {
      id: 8,
      name: "Hardware Product 2",
      price: "199.99",
      category: "Hardware",
      image: "/products/hardware2.jpeg",
      description: "Heavy-duty hardware for tough jobs.",
    },
    {
      id: 9,
      name: "Science Product 2",
      price: "75.49",
      category: "Science",
      image: "/products/science2.jpeg",
      description: "Lab-tested science experiment kit.",
    },
    {
      id: 10,
      name: "Daily Use Product 2",
      price: "29.95",
      category: "Daily Use",
      image: "/products/dailyuse2.jpeg",
      description: "Handy product for everyday household tasks.",
    },
  ];

  return Response.json({
    products,
    categories,
  });
}