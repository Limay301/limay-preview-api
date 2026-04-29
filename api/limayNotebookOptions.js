// limayNotebookOptions.js

export const notebookFormOptions = [
  {
    id: "notebookType",
    title: "Choose Your Notebook Style",
    type: "select",
    required: true,
    options: [
      {
        label: "Lined (Everyday writing)",
        value: "lined",
      },
      {
        label: "Blank (Free creativity)",
        value: "blank",
      },
      {
        label: "Planner (Stay organized)",
        value: "planner",
      },
    ],
  },

  {
    id: "coverStyle",
    title: "Choose Your Cover Style",
    type: "select",
    required: true,
    options: [
      {
        label: "Full Photo Cover (Upload your own image)",
        value: "full_photo_cover",
      },
      {
        label: "Photo Frame Cover (Photo with visible border)",
        value: "photo_frame",
      },
      {
        label: "Minimal Name Cover (Clean name design)",
        value: "minimal_name_cover",
      },
    ],
  },

  {
    id: "coverColor",
    title: "Choose Your Cover Color",
    type: "color",
    required: false,
    defaultValue: "#F5EDE3",
    condition: (formData) =>
      formData.coverStyle === "photo_frame" ||
      formData.coverStyle === "minimal_name_cover",
  },

  {
    id: "image",
    title: "Upload Your Photo",
    type: "file",
    required: true,
    condition: (formData) =>
      formData.coverStyle === "full_photo_cover" ||
      formData.coverStyle === "photo_frame",
  },

  {
    id: "name",
    title: "Add Your Name",
    type: "text",
    required: true,
    placeholder: "Enter your name (e.g. Sam)",
  },

  {
    id: "fontSize",
    title: "Adjust Text Size",
    type: "slider",
    required: false,
    min: 32,
    max: 100,
    defaultValue: 64,
  },
];

export const defaultNotebookSelection = {
  notebookType: "",
  coverStyle: "",
  coverColor: "#F5EDE3",
  image: null,
  name: "",
  fontSize: 64,
  binding: "spiral",
};

export function getVisibleNotebookFields(formData) {
  return notebookFormOptions.filter((field) => {
    if (!field.condition) return true;
    return field.condition(formData);
  });
}

export function getAutoTextColor(coverStyle, coverColor) {
  if (coverStyle === "full_photo_cover") {
    return "#000000";
  }

  return isColorDark(coverColor) ? "#FFFFFF" : "#000000";
}

export function generateNotebookConfig(formData) {
  const coverStyle = formData.coverStyle;
  const coverColor = formData.coverColor || "#F5EDE3";

  return {
    brand: "Limay Studio",

    notebookType: formData.notebookType,
    binding: "spiral",

    coverStyle,
    coverColor:
      coverStyle === "full_photo_cover" ? null : coverColor,

    image:
      coverStyle === "full_photo_cover" ||
      coverStyle === "photo_frame"
        ? formData.image
        : null,

    name: formData.name,

    text: {
      value: formData.name,
      color: getAutoTextColor(coverStyle, coverColor),
      fontSize: formData.fontSize || 64,
      fontFamily: "Arial Black, Arial, sans-serif",
      fontWeight: 900,
      position: getDefaultTextPosition(coverStyle),
      allowDrag: true,
      allowResize: true,
    },

    rules: getNotebookRules(coverStyle),

    preview: {
      showSpiralBinding: true,
      spiralSide: "left",
      realisticShadow: true,
      roundedCorners: true,
    },
  };
}

function getDefaultTextPosition(coverStyle) {
  if (coverStyle === "full_photo_cover") {
    return { x: 50, y: 12 };
  }

  if (coverStyle === "photo_frame") {
    return { x: 50, y: 88 };
  }

  if (coverStyle === "minimal_name_cover") {
    return { x: 50, y: 50 };
  }

  return { x: 50, y: 50 };
}

function getNotebookRules(coverStyle) {
  if (coverStyle === "full_photo_cover") {
    return {
      imageMustCoverEntireFront: true,
      noBackgroundColorVisible: true,
      coverColorActsAsTextColor: true,
      textMustBeReadable: true,
      doNotDistortImage: true,
      doNotDistortText: true,
    };
  }

  if (coverStyle === "photo_frame") {
    return {
      imageInsideFrame: true,
      coverColorVisible: true,
      autoTextColorByCoverColor: true,
      textMustBeReadable: true,
      doNotDistortImage: true,
      doNotDistortText: true,
    };
  }

  if (coverStyle === "minimal_name_cover") {
    return {
      noPhotoRequired: true,
      coverColorVisible: true,
      autoTextColorByCoverColor: true,
      textMustBeReadable: true,
      doNotDistortText: true,
    };
  }

  return {};
}

function isColorDark(hexColor = "#FFFFFF") {
  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 150;
}
