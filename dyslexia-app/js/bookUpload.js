// bookUpload.js

/**
 * Book Upload functionality.
 * - Allows users to upload books (PDF, EPUB, TXT).
 * - Parses the uploaded file and displays its content in the app.
 */

document.addEventListener("DOMContentLoaded", () => {
  const bookUploadInput = document.getElementById("bookUpload");
  bookUploadInput.addEventListener("change", handleBookUpload);
});

/**
 * Handles the book upload event by processing the selected file.
 * Supports PDF, EPUB, and TXT file formats.
 */
function handleBookUpload(event) {
  const file = event.target.files[0];
  const fileType = file.type;

  if (fileType === "application/pdf") {
    parsePDF(file);
  } else if (fileType === "application/epub+zip") {
    parseEPUB(file);
  } else if (fileType.startsWith("text/")) {
    parseTXT(file);
  } else {
    alert("Unsupported file format. Please upload a PDF, EPUB, or TXT file.");
  }
}

/**
 * Parses a PDF file and displays its content.
 * @param {File} file - The PDF file to parse.
 */
function parsePDF(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const arrayBuffer = e.target.result;
    pdfjsLib.getDocument(arrayBuffer).promise.then((pdf) => {
      let pdfText = "";
      const numPages = pdf.numPages;
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        pdf.getPage(pageNum).then((page) => {
          page.getTextContent().then((textContent) => {
            textContent.items.forEach((item) => {
              pdfText += item.str + " ";
            });
            displayBookContent(pdfText);
          });
        });
      }
    });
  };
  reader.readAsArrayBuffer(file);
}

/**
 * Parses an EPUB file and displays its content.
 * @param {File} file - The EPUB file to parse.
 */
function parseEPUB(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const epubFile = e.target.result;
    ePub(epubFile).then((book) => {
      book.renderTo("bookDisplay");
    });
  };
  reader.readAsArrayBuffer(file);
}

/**
 * Parses a TXT file and displays its content.
 * @param {File} file - The TXT file to parse.
 */
function parseTXT(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    displayBookContent(text);
  };
  reader.readAsText(file);
}

/**
 * Displays the uploaded book content in the designated area.
 * @param {string} content - The book content to display.
 */
function displayBookContent(content) {
  const bookDisplay = document.getElementById("bookDisplay");
  bookDisplay.textContent = content;
}
