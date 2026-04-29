// limayNotebookOptions.js

export const notebookProduct = {
  productId: "limay-notebook-full-photo-lined-spiral",

  productName: "Custom Spiral Notebook",

  brand: "Limay Studio",

  notebookType: null, 
  // ejemplo cuando el cliente seleccione:
  // "lined", "blank", "planner"

  binding: "spiral",
  // siempre argollado

  coverStyle: null,
  // ejemplo:
  // "full_photo_cover"

  customerName: "",

  uploadedImage: null,
  // aquí irá la imagen que suba el cliente

  text: {
    value: "",
    color: "#000000",
    fontFamily: "Arial Black, Arial, sans-serif",
    fontSize: 64,
    fontWeight: 900,

    position: {
      x: 50,
      y: 12,
    },

    allowDrag: true,
    allowResize: true,
  },

  layoutRules: {
    imageMustCoverEntireFront: true,
    noBackgroundColorVisible: true,
    keepImageProportions: true,
    textMustBeReadable: true,
    doNotDistortImage: true,
    doNotDistortText: true,
    notebookMustLookPhysical: true,
  },

  mockupStyle: {
    background: "soft neutral background",
    lighting: "warm natural lighting",
    shadows: "realistic soft shadows",
    aesthetic: "premium product photography",
    quality: "ultra realistic 4K",
  },

  preview: {
    showSpiralBinding: true,
    spiralSide: "left",
    roundedCorners: true,
    realisticShadow: true,
  },
};