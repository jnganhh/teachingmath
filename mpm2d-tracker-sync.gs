/**
 * MPM2D Participation, Attendance & Growing Success Cloud Sync (Google Apps Script)
 *
 * Works seamlessly across iPad Safari, Desktop Chrome, and GitHub Pages!
 *
 * Setup Instructions (2 minutes):
 * 1. Go to https://script.google.com (signed in with your gapps.yrdsb.ca or personal Google account) -> New Project.
 * 2. Paste this entire file and click Save.
 * 3. Click "Deploy" -> "New deployment" -> Select type: "Web app".
 *    - Description: MPM2D Tracker Sync
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 4. Authorize and copy the generated Web App URL (https://script.google.com/macros/s/.../exec).
 * 5. In mpm2d-participation-tracker.html on your iPad or computer, open the "👥 Roster / Sync" tab
 *    and paste the Web App URL into the "Google Cloud Sync (iPad & Multi-Device)" box!
 *
 * What this script does automatically:
 * - Saves your complete JSON state in ScriptProperties so you can Pull/Push between your iPad and Desktop.
 * - Creates & updates a readable Google Sheet ("MPM2D Growing Success Tracker Backup") in your Google Drive
 *   with a live summary tab of all 3 periods + timestamped snapshot logs so your data can never disappear.
 */

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();

    if (payload.action === 'save' && payload.state) {
      const stateStr = JSON.stringify(payload.state);
      props.setProperty('LATEST_STATE_JSON', stateStr);
      props.setProperty('LAST_UPDATED', new Date().toISOString());

      // Also write a human-readable table to Google Sheets in Drive
      syncToSpreadsheet_(payload.state, payload.summaryRows || []);

      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const raw = props.getProperty('LATEST_STATE_JSON');
    const lastUpdated = props.getProperty('LAST_UPDATED') || null;

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        lastUpdated: lastUpdated,
        state: raw ? JSON.parse(raw) : null
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function syncToSpreadsheet_(state, summaryRows) {
  const props = PropertiesService.getScriptProperties();
  let sheetId = props.getProperty('TRACKER_SHEET_ID');
  let ss;

  if (sheetId) {
    try {
      ss = SpreadsheetApp.openById(sheetId);
    } catch (e) {
      ss = null;
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.create('MPM2D Growing Success Tracker Backup');
    props.setProperty('TRACKER_SHEET_ID', ss.getId());
  }

  // Sheet 1: Live Report Card Summary across all 3 periods
  let summarySheet = ss.getSheetByName('Growing Success Summary');
  if (!summarySheet) {
    summarySheet = ss.getSheets()[0];
    summarySheet.setName('Growing Success Summary');
  }
  summarySheet.clearContents();
  const headers = [
    'Last Synced', 'Period', 'Student Name', 'Present', 'Late', 'Absent',
    'Total Tallies', 'Responsibility', 'Organization', 'Independent Work',
    'Collaboration', 'Initiative', 'Self-Regulation', 'Report Card Comment Stem'
  ];
  summarySheet.appendRow(headers);

  const nowStr = new Date().toLocaleString();
  summaryRows.forEach(function(row) {
    summarySheet.appendRow([nowStr].concat(row));
  });

  // Sheet 2: Raw JSON Snapshot History (Rolling backup log)
  let rawSheet = ss.getSheetByName('JSON Snapshots');
  if (!rawSheet) {
    rawSheet = ss.insertSheet('JSON Snapshots');
    rawSheet.appendRow(['Timestamp', 'Active Date', 'JSON Backup Payload']);
  }
  rawSheet.appendRow([new Date(), state.activeDate || '', JSON.stringify(state).slice(0, 49000)]);
}
