const SUPABASE_URL = "https://unkciujfohuqdkhfpmqi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVua2NpdWpmb2h1cWRraGZwbXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNjA5OTIsImV4cCI6MjA5ODkzNjk5Mn0.7_BgkiOohCJzaxpVwqDkDG3iahRGq6Z1wPXA5_HjAUo";

const headers = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

// Fetch one existing product to see its shape
const res = await fetch(`${SUPABASE_URL}/rest/v1/products?limit=1`, { headers });
const data = await res.json();
console.log("Sample product keys:", data[0] ? Object.keys(data[0]) : "no products");
console.log("Sample product:", JSON.stringify(data[0], null, 2));
