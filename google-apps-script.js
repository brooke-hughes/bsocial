// ============================================
// PASTE THIS INTO GOOGLE APPS SCRIPT EDITOR
// (Extensions → Apps Script in your Google Sheet)
// Then: Deploy → New Deployment → Web App
//   Execute as: Me
//   Who has access: Anyone
// ============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),                          // Timestamp
      data.name || '',                     // Name
      data.email || '',                    // Email
      data.company || '',                  // Company
      data.message || '',                  // Message
      data.source || 'Unknown'             // Source (checklist or contact)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This handles GET requests too (useful for testing)
function doGet(e) {
  return ContentService
    .createTextOutput('B Social Leads script is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}
