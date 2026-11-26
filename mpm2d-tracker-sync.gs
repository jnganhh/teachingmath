/**
 * MPM2D Participation, Attendance & Growing Success Cloud Sync (Google Apps Script)
 *
 * Versioned, Lock-Protected & Teacher-Authorized Sync for iPad Safari, Phone & MacBook.
 *
 * Setup Instructions:
 * 1. Go to https://script.google.com -> Open your MPM2D Tracker Sync project.
 * 2. Paste this entire file and click Save.
 * 3. Set your private Teacher Sync Secret:
 *    - Click Project Settings (gear icon) -> Script Properties -> Add script property:
 *      Property: TEACHER_SYNC_SECRET
 *      Value: (choose any private passphrase, e.g. my-mpm2d-secret-2026)
 *    - (Or run setTeacherSyncSecret('your-secret') once from the editor.)
 * 4. Click "Deploy" -> "Manage deployments" -> Edit (pencil) -> New version -> Deploy.
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (requests are gated by TEACHER_SYNC_SECRET on every read & write)
 * 5. In mpm2d-teacher-9f4k2x.html on each device (Roster -> Cloud Sync), enter both:
 *    - Your Web App URL (https://script.google.com/macros/s/.../exec)
 *    - Your Teacher Sync Secret
 */

function setTeacherSyncSecret(secret) {
  if (!secret || String(secret).trim().length < 6) {
    throw new Error('Please choose a secret at least 6 characters long.');
  }
  PropertiesService.getScriptProperties().setProperty('TEACHER_SYNC_SECRET', String(secret).trim());
}

function isAuthorized_(providedToken, props) {
  var expected = (props.getProperty('TEACHER_SYNC_SECRET') || '').trim();
  if (!expected) return true; // Backward-compatible until teacher sets TEACHER_SYNC_SECRET
  return String(providedToken || '').trim() === expected;
}

function sanitizeSheetCell_(val) {
  var s = val === null || val === undefined ? '' : String(val);
  if (/^[=+\-@\t\r]/.test(s)) return "'" + s;
  return val;
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var payload = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();

    if (!isAuthorized_(payload.token, props)) {
      return jsonOut_({ ok: false, unauthorized: true, error: 'Unauthorized: invalid or missing Teacher Sync Secret.' });
    }

    if (payload.action === 'save' && payload.state) {
      var currentRev = parseInt(props.getProperty('CURRENT_REVISION') || '0', 10);
      var lastOpId = props.getProperty('LAST_OP_ID') || '';
      var lastUpdated = props.getProperty('LAST_UPDATED') || new Date().toISOString();

      if (payload.opId && payload.opId === lastOpId) {
        return jsonOut_({ ok: true, revision: currentRev, savedAt: lastUpdated, deduplicated: true });
      }

      if (!payload.forceOverwrite && payload.baseRevision !== undefined && payload.baseRevision !== null) {
        var baseRev = parseInt(payload.baseRevision, 10);
        if (!isNaN(baseRev) && currentRev > 0 && baseRev !== currentRev) {
          var existingRaw = props.getProperty('LATEST_STATE_JSON');
          return jsonOut_({
            ok: false,
            conflict: true,
            currentRevision: currentRev,
            lastUpdated: lastUpdated,
            state: existingRaw ? JSON.parse(existingRaw) : null,
            error: 'Sync conflict: another device saved revision ' + currentRev + ' (you based on ' + baseRev + ').'
          });
        }
      }

      var nextRev = currentRev + 1;
      var savedAt = new Date().toISOString();
      var stateStr = JSON.stringify(payload.state);
      props.setProperty('LATEST_STATE_JSON', stateStr);
      props.setProperty('CURRENT_REVISION', String(nextRev));
      props.setProperty('LAST_UPDATED', savedAt);
      if (payload.opId) props.setProperty('LAST_OP_ID', String(payload.opId));

      syncToSpreadsheet_(payload.state, payload.summaryRows || []);

      return jsonOut_({ ok: true, revision: nextRev, savedAt: savedAt });
    }

    return jsonOut_({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var token = (e && e.parameter && e.parameter.token) ? e.parameter.token : '';
    if (!isAuthorized_(token, props)) {
      return jsonOut_({ ok: false, unauthorized: true, error: 'Unauthorized: invalid or missing Teacher Sync Secret.' });
    }

    var raw = props.getProperty('LATEST_STATE_JSON');
    var lastUpdated = props.getProperty('LAST_UPDATED') || null;
    var currentRev = parseInt(props.getProperty('CURRENT_REVISION') || '0', 10);

    return jsonOut_({
      ok: true,
      revision: currentRev,
      lastUpdated: lastUpdated,
      state: raw ? JSON.parse(raw) : null
    });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function syncToSpreadsheet_(state, summaryRows) {
  var props = PropertiesService.getScriptProperties();
  var sheetId = props.getProperty('TRACKER_SHEET_ID');
  var ss;

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

  var summarySheet = ss.getSheetByName('Growing Success Summary');
  if (!summarySheet) {
    summarySheet = ss.getSheets()[0];
    summarySheet.setName('Growing Success Summary');
  }
  summarySheet.clearContents();
  var headers = [
    'Last Synced', 'Period', 'Student Name', 'Present', 'Late', 'Absent',
    'Total Tallies', 'Responsibility', 'Organization', 'Independent Work',
    'Collaboration', 'Initiative', 'Self-Regulation', 'Report Card Comment Stem'
  ];
  summarySheet.appendRow(headers);

  var nowStr = new Date().toLocaleString();
  summaryRows.forEach(function(row) {
    var safeRow = [nowStr].concat(row.map(sanitizeSheetCell_));
    summarySheet.appendRow(safeRow);
  });

  var rawSheet = ss.getSheetByName('JSON Snapshots');
  if (!rawSheet) {
    rawSheet = ss.insertSheet('JSON Snapshots');
    rawSheet.appendRow(['Timestamp', 'Active Date', 'JSON Backup Payload']);
  }
  rawSheet.appendRow([new Date(), sanitizeSheetCell_(state.activeDate || ''), JSON.stringify(state).slice(0, 49000)]);
}
