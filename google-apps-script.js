// ============================================
// PASTE THIS INTO GOOGLE APPS SCRIPT EDITOR
// (Extensions → Apps Script in your Google Sheet)
// ============================================

function doPost(e) {
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

  // Optional: send yourself an email notification
  if (data.source === 'contact') {
    MailApp.sendEmail({
      to: 'brooke@bsocialdigital.com',
      subject: 'New Lead from B Social Website — ' + (data.name || 'Unknown'),
      body: 'Name: ' + (data.name || '') + '\n' +
            'Email: ' + (data.email || '') + '\n' +
            'Company: ' + (data.company || '') + '\n' +
            'Message: ' + (data.message || '') + '\n' +
            'Source: ' + (data.source || '')
    });
  }

  if (data.source === 'checklist') {
    MailApp.sendEmail({
      to: 'brooke@bsocialdigital.com',
      subject: 'New Checklist Download — ' + (data.email || 'Unknown'),
      body: 'Someone downloaded the Ad Account Audit Checklist!\n\n' +
            'Email: ' + (data.email || '')
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
