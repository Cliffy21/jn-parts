export const API_BASE = "http://localhost:5000";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  return res.json();
}
