// limayNotebookEngine.js

export function generateNotebookConfig(selection) {
  const baseConfig = {
    productId: "limay-notebook",
    binding: "spiral",

    notebookType: selection.notebookType || "lined",

    cover: {
      style: selection.coverStyle || "full_photo_cover",
      image: selection.image || null,
      backgroundColor: null,
    },

    text: {
      value: selection.name || "",
      color: "#000000",
      fontSize: 64,
      fontWeight: 900,
      fontFamily: "Arial Black, Arial, sans-serif",

      position: {
        x: 50,
        y: 12,
      },
    },

    rules: {},
  };

  // 🔥 CONDICIONAL: COVER STYLE
  if (baseConfig.cover.style === "full_photo_cover") {
    baseConfig.rules = {
      imageMustCoverEntireFront: true,
      noBackgroundVisible: true,
      allowOverlayText: true,
    };

    baseConfig.cover.backgroundColor = null;
  }

  if (baseConfig.cover.style === "color_cover") {
    baseConfig.rules = {
      useSolidColor: true,
      allowText: true,
    };

    baseConfig.cover.backgroundColor = selection.color || "#ffffff";
  }

  // 🔥 CONDICIONAL: COLOR DE TEXTO AUTOMÁTICO
  baseConfig.text.color = getAutoTextColor(
    baseConfig.cover.image,
    baseConfig.cover.backgroundColor
  );

  return baseConfig;
}
