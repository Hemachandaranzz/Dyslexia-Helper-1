// customization.js

/**
 * Customization Options for User Reading Experience.
 * - Allows users to change font style, font color, background color, line spacing, and margins.
 * - Saves preferences in localStorage for persistence across sessions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const fontStyleSelect = document.getElementById("fontStyle");
  const fontColorInput = document.getElementById("fontColor");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const lineSpacingSlider = document.getElementById("lineSpacing");
  const textMarginSlider = document.getElementById("textMargin");

  initializeCustomization();

  fontStyleSelect.addEventListener("change", applyFontStyle);
  fontColorInput.addEventListener("input", applyFontColor);
  backgroundColorInput.addEventListener("input", applyBackgroundColor);
  lineSpacingSlider.addEventListener("input", applyLineSpacing);
  textMarginSlider.addEventListener("input", applyTextMargin);
});

function initializeCustomization() {
  const savedPrefs = JSON.parse(localStorage.getItem("userPreferences")) || {};

  document.getElementById("fontStyle").value =
    savedPrefs.fontStyle || "OpenDyslexic";
  document.getElementById("fontColor").value =
    savedPrefs.fontColor || "#000000";
  document.getElementById("backgroundColor").value =
    savedPrefs.backgroundColor || "#FFFFFF";
  document.getElementById("lineSpacing").value = savedPrefs.lineSpacing || 1.6;
  document.getElementById("textMargin").value = savedPrefs.textMargin || 10;

  applyFontStyle();
  applyFontColor();
  applyBackgroundColor();
  applyLineSpacing();
  applyTextMargin();
}

function applyFontStyle() {
  const fontStyle = document.getElementById("fontStyle").value;
  document.getElementById("bookDisplay").style.fontFamily = fontStyle;
  savePreference("fontStyle", fontStyle);
}

function applyFontColor() {
  const fontColor = document.getElementById("fontColor").value;
  document.getElementById("bookDisplay").style.color = fontColor;
  savePreference("fontColor", fontColor);
}

function applyBackgroundColor() {
  const backgroundColor = document.getElementById("backgroundColor").value;
  document.getElementById("bookDisplay").style.backgroundColor =
    backgroundColor;
  savePreference("backgroundColor", backgroundColor);
}

function applyLineSpacing() {
  const lineSpacing = document.getElementById("lineSpacing").value;
  document.getElementById("bookDisplay").style.lineHeight = lineSpacing;
  savePreference("lineSpacing", lineSpacing);
}

function applyTextMargin() {
  const textMargin = document.getElementById("textMargin").value;
  document.getElementById("bookDisplay").style.margin = `${textMargin}px`;
  savePreference("textMargin", textMargin);
}

function savePreference(key, value) {
  const savedPrefs = JSON.parse(localStorage.getItem("userPreferences")) || {};
  savedPrefs[key] = value;
  localStorage.setItem("userPreferences", JSON.stringify(savedPrefs));
}
