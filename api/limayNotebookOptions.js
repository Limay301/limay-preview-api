export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const {
    coverStyle,
    notebookType,
    coverColor,
    name,
    phrase,
    textPlacement,
    textBackground
  } = req.body;

  const coverStyleMap = {
    "Full Photo Cover": `
Cover style: Full Photo Cover.
The uploaded image must cover the entire notebook front cover.
No background cover color should be visible.
The selected coverColor must be used as the text color.
Place the text in this position: ${textPlacement || "Auto Recommended"}.
If the photo is visually busy, use this text background option: ${textBackground || "Soft Transparent Overlay"}.
`,

    "Photo Frame": `
Cover style: Photo Frame.
Use the selected coverColor as the visible notebook background color.
Place the uploaded photo inside a clean centered frame.
The photo should not cover the entire notebook.
Leave visible margins around the frame.
Automatically choose black or white text based on the best contrast with the coverColor.
Place the name and phrase below or above the photo frame in a balanced layout.
`,

    "Minimal Name Cover": `
Cover style: Minimal Name Cover.
Use the selected coverColor as the main notebook background color.
Use the uploaded photo only as a small subtle accent if provided.
Do not make the photo the main visual element.
The main focus must be the name typography.
Automatically choose black or white text based on the best contrast with the coverColor.
Keep the design very clean, simple and premium.
`
  };

  const selectedCoverStyleInstructions = coverStyleMap[coverStyle] || coverStyleMap["Photo Frame"];

  const prompt = `
Create a realistic premium spiral notebook cover mockup for Limay Studio.

Notebook type: ${notebookType}

Text:
Name: ${name}
Phrase: ${phrase || ""}

Image:
Use the uploaded customer image according to the selected cover style.

Selected cover style instructions:
${selectedCoverStyleInstructions}

Physical product rules:
The notebook must be spiral bound.
Show spiral rings clearly on the left side.
The notebook must look like a real physical product.
Keep proportions realistic.
The design must be printable and physically realistic.

Layout:
Clean modern notebook cover design.
Balanced spacing.
Premium personalized product aesthetic.
Do not overcrowd the cover.

Lighting and scene:
Soft neutral background.
Warm natural lighting.
Realistic shadows.
High-end product photography style.

Important:
The text must be clear and readable.
Do not distort the uploaded image.
Do not distort the text.
Do not misspell the text.
Do not invent extra words.
Do not add unrelated decorative elements unless the selected style requires it.

Ultra realistic, premium aesthetic.
`;

  return res.status(200).json({
    success: true,
    message: "Notebook prompt generated successfully",
    received: {
      coverStyle,
      notebookType,
      coverColor,
      name,
      phrase,
      textPlacement,
      textBackground
    },
    prompt
  });
}
