export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { shortPhrase, specialDetails, style, color } = req.body;

  return res.status(200).json({
    success: true,
    message: "Odoo connected to Vercel successfully",
    received: {
      shortPhrase,
      specialDetails,
      style,
      color
    },
    preview_url: "https://placehold.co/900x900?text=Limay+Preview"
  });
}