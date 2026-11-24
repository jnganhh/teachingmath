/**
 * MPM2D Drill – milestone email receiver.
 * Setup:
 *  1. Go to https://script.google.com (signed in with your gapps.yrdsb.ca account) → New project.
 *  2. Paste this file, Save.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me    Who has access: Anyone
 *  4. Authorize, copy the Web app URL (https://script.google.com/macros/s/.../exec)
 *  5. Paste it into APPS_SCRIPT_URL in mpm2d-drill.html.
 * Each report is emailed to you and also logged in a Google Sheet ("MPM2D Drill Reports" in your Drive).
 */
const TEACHER_EMAIL = 'hokhei.ngan@gapps.yrdsb.ca';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const fields = ['Student', 'Class', 'Correct answers', 'Total attempts', 'Best streak',
                  'Total active minutes', 'Skill breakdown', 'Completed at'];
  const clean = v => String(v == null ? '' : v).slice(0, 2000);

  const body = fields.map(f => `${f}: ${clean(d[f])}`).join('\n');
  MailApp.sendEmail(TEACHER_EMAIL, clean(d._subject || 'MPM2D Drill report').slice(0, 200), body);

  getSheet_().appendRow([new Date(), ...fields.map(f => clean(d[f]))]);
  return ContentService.createTextOutput('ok');
}

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID'), ss;
  if (id) ss = SpreadsheetApp.openById(id);
  else {
    ss = SpreadsheetApp.create('MPM2D Drill Reports');
    ss.getSheets()[0].appendRow(['Received', 'Student', 'Class', 'Correct', 'Attempts', 'Best streak', 'Minutes', 'Skills', 'Completed at']);
    props.setProperty('SHEET_ID', ss.getId());
  }
  return ss.getSheets()[0];
}

/** Run once from the editor to test email permission. */
function testEmail() {
  doPost({ postData: { contents: JSON.stringify({ _subject: 'Test report', Student: 'Test S.', Class: 'P1', 'Correct answers': 20 }) } });
}
