document.getElementById('download-btn').addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    const fontSize = document.getElementById('font-size').value;
    const color = document.getElementById('color').value;
    const fontFamily = document.getElementById('font-family').value;
  
    const jsPDF = window.jspdf.jsPDF; // Ensure you have jsPDF library loaded
    const doc = new jsPDF();
  
    doc.setFont(fontFamily);
    doc.setFontSize(parseInt(fontSize));
    doc.setTextColor(color);
  
    // Page settings
    const pageHeight = doc.internal.pageSize.height; // Height of a page
    const pageWidth = doc.internal.pageSize.width; // Width of a page
    const margin = 10; // Margin from edges
    const lineHeight = fontSize * 0.35; // Adjust line height based on font size
    const usableHeight = pageHeight - margin * 2; // Usable height for text
  
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
  
    let cursorY = margin; // Start writing from the top margin
  
    // Write lines to the PDF, adding pages as needed
    lines.forEach((line) => {
      if (cursorY + lineHeight > usableHeight) {
        // Add a new page if text exceeds current page height
        doc.addPage();
        cursorY = margin; // Reset cursor to top margin
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight; // Move cursor down for the next line
    });
  
    // Save the PDF
    doc.save('styled-text.pdf');
  });
document.getElementById('preview-btn').addEventListener('click', () => {
    // Get user input and style options
    const text = document.getElementById('text-input').value;
    const fontSize = document.getElementById('font-size').value;
    const color = document.getElementById('color').value;
    const fontFamily = document.getElementById('font-family').value;
  
    // Get the preview container
    const preview = document.getElementById('preview');
  
    // Check if text is empty
    if (!text.trim()) {
      preview.innerHTML = '<p style="color: red;">Please enter some text to preview.</p>';
      return;
    }
  
    // Apply styles and update the preview
    preview.style.fontSize = fontSize + 'px';
    preview.style.color = color;
    preview.style.fontFamily = fontFamily;
    preview.textContent = text;
  });
  