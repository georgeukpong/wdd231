// Get the current year and update the copyright span
document.getElementById("copyright-year").textContent = new Date().getFullYear();

// Get the last modified date of the document and update the paragraph
document.getElementById("last-modified").textContent = "Last Modification: " + document.lastModified;
