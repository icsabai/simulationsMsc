/**
 * Google Apps Script — Presentation Signup Web App
 * Deploy as web app (Execute as: Me, Who has access: Anyone).
 * Copy this file into your Apps Script project and set CONFIG below.
 *
 * CONFIG is the single place to edit each semester: presentation dates (dates), grades sheet (STUDENTS_SHEET_ID),
 * and deadline cards + hero counter (deadlineCards). The site and main.js get these via ?action=getConfig.
 */

var CONFIG = {
  SITE_URL: 'https://icsabai.github.io/simulationsMsc/',  // e.g. where index.html is hosted; used in cancel links
  STUDENTS_SHEET_ID: 'https://docs.google.com/spreadsheets/d/1V2mHFHfB3dCdR3buSh-o_CBYimAoBVoH6xl6DVeBiW8/edit?usp=sharing',  // Grades sheet; first column of each tab = Neptun ID (used for validation + refreshStudents)
  SIGNUPS_SPREADSHEET_ID: '1zikT1R7deWme6bUkOOv3fisRSnJcKCucqp7tX3gRYdU',  // e.g. '1abc...' or leave empty only if the script is bound to that spreadsheet
  // Optional: only read Neptun IDs from these sheet names (exact match). If omitted or empty, all sheets are read (union of all first columns).
  STUDENTS_SHEET_NAMES: [],  // e.g. ['Main'] or ['Sheet1'] — use the tab that has your canonical list of 46 students
  dates: ['18 Nov 2025', '25 Nov 2025', '2 Dec 2025', '9 Dec 2025'], // these are the presentation dates. Deadline dates are set below. BOTH NEED TO BE SET!!
  maxSlotsPerDate: 10,
  // Optional: timezone for date cells (e.g. 'Europe/Budapest'). Used when normalizing Date objects to match dates above.
  SPREADSHEET_TIMEZONE: 'Europe/Budapest',
  // Deadline cards and hero counter: single source for Deadlines section and countdown. Order = display order. dateValue = parseable date string for counter; dateText = hero subtitle; description = HTML for card detail.
  deadlineCards: [
    { logo: 'SD', logoClass: 'sd', subtitle: 'Short description', date: '21 Sept. 2025', dateValue: '21 September 2025 23:59:59 GMT+02:00', dateText: 'September 21, 2025 (Sunday) - Short description', description: '<span class="time d-block text-muted mb-2">Until 23:59, 21 Sept. 2025</span><h2 class="h5">Deadline for short description</h2><p class="mb-0">Upload a PDF document to <a href="https://k8plex-edu.elte.hu/hub/">Kooplex</a> into <code>courses/2025-szmitgpesszimulcikcompsimf20em2025.assignments/2025sd</code> introducing your chosen topic and your plans in a concise manner. You will receive feedback that will help with your final submission. (<a href="kooplex_tutorial2019.pdf">Kooplex tutorial</a>)</p>' },
    { logo: 'Pv1', logoClass: 'pv', subtitle: 'Project v1.0', date: '12 Oct. 2025', dateValue: '12 October 2025 23:59:59 GMT+02:00', dateText: 'October 12, 2025 (Sunday) - Project v1.0', description: '<span class="time d-block text-muted mb-2">Until 23:59, 12 Oct. 2025</span><h2 class="h5">Deadline for Project v1.0</h2><p class="mb-0">Upload a PDF document and appropriate code/notebook files to <a href="https://k8plex-edu.elte.hu/hub/">Kooplex</a> into <code>courses/2025-szmitgpesszimulcikcompsimf20em2025.assignments/2025p1</code> as your first submission. (<a href="kooplex_tutorial2019.pdf">Kooplex tutorial</a>)</p>' },
    { logo: 'Pv2', logoClass: 'pv', subtitle: 'Project v2.0', date: '9 Nov. 2025', dateValue: '9 November 2025 23:59:59 GMT+01:00', dateText: 'November 9, 2025 (Sunday) - Project v2.0', description: '<span class="time d-block text-muted mb-2">Until 23:59, 9 Nov. 2025</span><h2 class="h5">Deadline for Project v2.0 and response letter</h2><p class="mb-0">Upload two PDF documents (updated project report and response letter) to <a href="https://k8plex-edu.elte.hu/hub/">Kooplex</a> into <code>courses/2025-szmitgpesszimulcikcompsimf20em2025.assignments/2025p2</code> as your final submission. (<a href="kooplex_tutorial2019.pdf">Kooplex tutorial</a>)</p>' },
    { logo: 'Pr1', logoClass: 'pr', subtitle: 'Presentations', date: '18 Nov. 2025', dateValue: '18 November 2025 12:00:00 GMT+01:00', dateText: 'November 18, 2025 (Tuesday) - Presentations day 1', description: '<span class="time d-block text-muted mb-2">12:00–14:00, 18 Nov. 2025</span><h2 class="h5">Presentations</h2><p class="mb-2">Prepare a 10-minute presentation based on your project submissions summarizing your most important results and figures. Sign up for a time slot in the <a href="#signup">Sign Up</a> section.</p><p class="mb-0"><b>Presentations will be held online, on Microsoft Teams.</b></p>' },
    { logo: 'Pr2', logoClass: 'pr', subtitle: 'Presentations', date: '25 Nov. 2025', dateValue: '25 November 2025 12:00:00 GMT+01:00', dateText: 'November 25, 2025 (Tuesday) - Presentations day 2', description: '<span class="time d-block text-muted mb-2">12:00–14:00, 25 Nov. 2025</span><h2 class="h5">Presentations</h2><p class="mb-2">Prepare a 10-minute presentation based on your project submissions summarizing your most important results and figures. Sign up for a time slot in the <a href="#signup">Sign Up</a> section.</p><p class="mb-0"><b>Presentations will be held online, on Microsoft Teams.</b></p>' },
    { logo: 'Pr3', logoClass: 'pr', subtitle: 'Presentations', date: '2 Dec. 2025', dateValue: '2 December 2025 12:00:00 GMT+01:00', dateText: 'December 2, 2025 (Tuesday) - Presentations day 3', description: '<span class="time d-block text-muted mb-2">12:00–14:00, 2 Dec. 2025</span><h2 class="h5">Presentations</h2><p class="mb-2">Prepare a 10-minute presentation based on your project submissions summarizing your most important results and figures. Sign up for a time slot in the <a href="#signup">Sign Up</a> section.</p><p class="mb-0"><b>Presentations will be held online, on Microsoft Teams.</b></p>' },
    { logo: 'Pr4', logoClass: 'pr', subtitle: 'Presentations', date: '9 Dec. 2025', dateValue: '9 December 2025 12:00:00 GMT+01:00', dateText: 'December 9, 2025 (Tuesday) - Presentations day 4', description: '<span class="time d-block text-muted mb-2">12:00–14:00, 9 Dec. 2025</span><h2 class="h5">Presentations</h2><p class="mb-2">Prepare a 10-minute presentation based on your project submissions summarizing your most important results and figures. Sign up for a time slot in the <a href="#signup">Sign Up</a> section.</p><p class="mb-0"><b>Presentations will be held online, on Microsoft Teams.</b></p>' }
  ]
};


// If CONFIG has a full Google Sheets URL, extract the spreadsheet ID; otherwise return as-is.
function parseSpreadsheetId(value) {
  if (!value || typeof value !== 'string') return value;
  var s = value.trim();
  var match = s.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : s;
}

// Month names for output (CONFIG.dates use "18 Nov 2025" format).
var MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Normalize date from sheet (Date object or string) to "18 Nov 2025" format to match CONFIG.dates.
// Handles: Date (uses CONFIG.SPREADSHEET_TIMEZONE or Europe/Budapest to avoid UTC off-by-one);
// strings like "18 Nov 2025", "18.11.2025", "18/11/2025", "2025.11.18", "2025. nov. 18." etc.
function normalizeDateString(val) {
  if (val instanceof Date) {
    var tz = (CONFIG.SPREADSHEET_TIMEZONE || 'Europe/Budapest');
    return Utilities.formatDate(val, tz, 'd MMM yyyy');
  }
  var s = String(val || '').trim();
  if (!s) return s;
  // Already "18 Nov 2025" style
  if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(s)) return s;
  var day, month, year;
  // dd.MM.yyyy or d.M.yyyy
  var m1 = s.match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})$/);
  if (m1) { day = parseInt(m1[1], 10); month = parseInt(m1[2], 10); year = parseInt(m1[3], 10); }
  if (!m1) {
    var m2 = s.match(/^(\d{4})[.\-/]\s*(\d{1,2})[.\-/]\s*(\d{1,2})$/);
    if (m2) { year = parseInt(m2[1], 10); month = parseInt(m2[2], 10); day = parseInt(m2[3], 10); }
  }
  if (!m1 && !m2) {
    var m3 = s.match(/^(\d{1,2})[\/](\d{1,2})[\/](\d{4})$/);
    if (m3) { day = parseInt(m3[1], 10); month = parseInt(m3[2], 10); year = parseInt(m3[3], 10); }
  }
  if (!m1 && !m2 && !m3) {
    var m4 = s.match(/^(\d{4})[.\s]+([a-záéíóöőúüű]+)[.\s]+(\d{1,2})\.?$/i);
    if (m4) { year = parseInt(m4[1], 10); month = parseMonthName(m4[2]); day = parseInt(m4[3], 10); }
  }
  if (day != null && month >= 1 && month <= 12 && year) {
    return day + ' ' + MONTH_NAMES[month - 1] + ' ' + year;
  }
  // Sheet serial date (e.g. display "45678" or value from getValues is Date) — treat numeric string as serial
  if (/^\d+$/.test(s)) {
    var serial = parseInt(s, 10);
    var d = new Date((serial - 25569) * 86400 * 1000); // Sheets/Excel epoch
    if (!isNaN(d.getTime())) return normalizeDateString(d);
  }
  return s;
}

function parseMonthName(str) {
  if (!str) return 0;
  var s = str.replace(/\./g, '').toLowerCase();
  var names = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  var hu = ['jan','feb','márc','ápr','máj','jún','júl','aug','szep','okt','nov','dec'];
  for (var i = 0; i < 12; i++) {
    if (names[i] === s || hu[i] === s || s.indexOf(names[i]) === 0 || s.indexOf(hu[i]) === 0) return i + 1;
  }
  return 0;
}

// Spreadsheet that has tabs "Signups" and "Students". Use CONFIG.SIGNUPS_SPREADSHEET_ID if set (required for standalone web app); otherwise getActiveSpreadsheet().
function getSignupsSpreadsheet() {
  var id = CONFIG.SIGNUPS_SPREADSHEET_ID;
  if (id && String(id).trim()) return SpreadsheetApp.openById(parseSpreadsheetId(id));
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('Set CONFIG.SIGNUPS_SPREADSHEET_ID to your Signups spreadsheet ID (from the sheet URL: .../d/SPREADSHEET_ID/edit). Required when the script is run as a web app.');
  return active;
}

function getSheetByNameIgnoreCase(ss, name) {
  var sheets = ss.getSheets();
  var lower = String(name).toLowerCase();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName().toLowerCase() === lower) return sheets[i];
  }
  return null;
}

function getSignupsSheet() {
  var ss = getSignupsSpreadsheet();
  var sh = getSheetByNameIgnoreCase(ss, 'Signups');
  if (!sh) {
    sh = ss.insertSheet('Signups');
    sh.appendRow(['Date', 'SlotNumber', 'NeptunID', 'Name', 'Email', 'CancelToken', 'Timestamp', 'HasAllGrades']);
  }
  return sh;
}

function getStudentsSheet() {
  var ss = getSignupsSpreadsheet();
  var sh = getSheetByNameIgnoreCase(ss, 'Students');
  if (!sh) {
    sh = ss.insertSheet('Students');
    sh.appendRow(['NeptunID']);
  }
  return sh;
}

/** Returns 1-based column index of first "HasAllGrades" header in row 1, or 8 if none. */
function getHasAllGradesColIndex(sh) {
  var headerRow = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 8)).getValues()[0];
  for (var c = 0; c < headerRow.length; c++) {
    if (String(headerRow[c] || '').trim().toLowerCase() === 'hasallgrades') return c + 1;
  }
  return 8;
}

function getSignupsData() {
  var sh = getSignupsSheet();
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return [];
  var numCols = Math.max(7, sh.getLastColumn());
  if (numCols < 8) numCols = 8;
  var data = sh.getRange(2, 1, lastRow, numCols).getValues();
  var dateDisplay = sh.getRange(2, 1, lastRow, 1).getDisplayValues();
  var dateCol = 0, slotCol = 1, neptunCol = 2, nameCol = 3, emailCol = 4, tokenCol = 5;
  var hasAllGradesCol = getHasAllGradesColIndex(sh);
  var hasAllGradesIdx = hasAllGradesCol - 1;
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    var neptunId = String(data[i][neptunCol] || '').trim();
    var rawDate = dateDisplay[i][0] != null && dateDisplay[i][0] !== '' ? dateDisplay[i][0] : data[i][dateCol];
    var hasAllGradesCell = hasAllGradesIdx < data[i].length ? data[i][hasAllGradesIdx] : undefined;
    var hasAllGrades = (hasAllGradesCell === true || hasAllGradesCell === 'TRUE' || hasAllGradesCell === 1 || hasAllGradesCell === '1');
    rows.push({
      date: normalizeDateString(rawDate),
      slotNumber: parseInt(data[i][slotCol], 10) || 0,
      neptunId: neptunId,
      name: String(data[i][nameCol] || '').trim(),
      email: String(data[i][emailCol] || '').trim(),
      cancelToken: String(data[i][tokenCol] || '').trim(),
      hasAllGrades: hasAllGrades,
      sheetRowIndex: i + 2
    });
  }
  return rows;
}

function getStudentsList() {
  var sh = getStudentsSheet();
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return [];
  var col = 0;
  var list = [];
  for (var i = 1; i < data.length; i++) {
    var n = String(data[i][col] || '').trim().toUpperCase();
    if (n) list.push(n);
  }
  return list;
}

function isStudentValid(neptunId) {
  var students = getStudentsList();
  var upper = String(neptunId || '').toUpperCase();
  for (var i = 0; i < students.length; i++) if (students[i] === upper) return true;
  return false;
}

/**
 * Returns true if the student has a valid (non-zero number) "Final grade" in at least 2 sheets
 * whose name contains "project" (case-insensitive) in the grades spreadsheet (STUDENTS_SHEET_ID).
 * Each such sheet: first column = Neptun ID, and a "Final grade" column (by header name).
 */
function checkStudentHasAllProjectGrades(neptunId) {
  var gradesId = parseSpreadsheetId(CONFIG.STUDENTS_SHEET_ID);
  if (!gradesId || String(gradesId).indexOf('YOUR_') >= 0) return true;
  var upper = String(neptunId || '').toUpperCase();
  var gradesSs;
  try {
    gradesSs = SpreadsheetApp.openById(gradesId);
  } catch (e) {
    return true;
  }
  var sheets = gradesSs.getSheets();
  var projectSheets = [];
  for (var s = 0; s < sheets.length; s++) {
    if (sheets[s].isSheetHidden()) continue;
    if (sheets[s].getName().toLowerCase().indexOf('project') >= 0) projectSheets.push(sheets[s]);
  }
  if (projectSheets.length < 2) return true;
  var validCount = 0;
  for (var p = 0; p < projectSheets.length; p++) {
    var sh = projectSheets[p];
    var data = sh.getDataRange().getValues();
    if (data.length < 2) continue;
    var header = data[0];
    var finalGradeCol = findHeaderCol(header, ['final grade', 'finalgrade']);
    if (finalGradeCol < 0) continue;
    var neptunCol = 0;
    for (var r = 1; r < data.length; r++) {
      if (String(data[r][neptunCol] || '').trim().toUpperCase() !== upper) continue;
      var gradeVal = data[r][finalGradeCol];
      var num = typeof gradeVal === 'number' ? gradeVal : parseFloat(String(gradeVal || '').trim(), 10);
      if (!isNaN(num) && num !== 0) { validCount++; break; }
    }
  }
  return validCount >= 2;
}

function setSignupHasAllGrades(sheetRowIndex, value) {
  var sh = getSignupsSheet();
  var col = getHasAllGradesColIndex(sh);
  if (sh.getRange(1, col).getValue() !== 'HasAllGrades') {
    sh.getRange(1, col).setValue('HasAllGrades');
  }
  sh.getRange(sheetRowIndex, col).setValue(value);
}

function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function buildGetSlotsResponse() {
  var signups = getSignupsData();
  for (var r = 0; r < signups.length; r++) {
    if (signups[r].hasAllGrades === false) {
      var nowHasAll = checkStudentHasAllProjectGrades(signups[r].neptunId);
      if (nowHasAll) {
        setSignupHasAllGrades(signups[r].sheetRowIndex, true);
        signups[r].hasAllGrades = true;
      }
    }
  }
  var dates = CONFIG.dates;
  var maxSlots = CONFIG.maxSlotsPerDate;
  var result = { dates: [] };
  for (var d = 0; d < dates.length; d++) {
    var dateStr = dates[d];
    var forDate = [];
    for (var r = 0; r < signups.length; r++) {
      if (signups[r].date === dateStr) forDate.push(signups[r]);
    }
    forDate.sort(function(a, b) { return (a.slotNumber || 0) - (b.slotNumber || 0) || (a.sheetRowIndex || 0) - (b.sheetRowIndex || 0); });
    var slots = [];
    for (var i = 0; i < forDate.length; i++) {
      slots.push({ neptunId: forDate[i].neptunId, hasAllGrades: forDate[i].hasAllGrades });
    }
    result.dates.push({
      date: dateStr,
      maxSlots: maxSlots,
      slots: slots
    });
  }
  return result;
}

/**
 * Returns grades/feedback rows for a Neptun ID from the grades spreadsheet (STUDENTS_SHEET_ID).
 * Each sheet: first column or column named Neptun/Neptun ID; returns that row as label-value pairs.
 */
function getResultsImpl(neptunId) {
  var upper = String(neptunId || '').trim().toUpperCase();
  if (!upper) return { error: 'Missing Neptun ID.' };
  var gradesId = parseSpreadsheetId(CONFIG.STUDENTS_SHEET_ID);
  if (!gradesId || String(gradesId).indexOf('YOUR_') >= 0) return { error: 'Grades sheet is not configured.' };
  var gradesSs;
  try {
    gradesSs = SpreadsheetApp.openById(gradesId);
  } catch (e) {
    return { error: 'Could not open grades sheet.' };
  }
  var sheets = gradesSs.getSheets();
  var results = [];
  for (var s = 0; s < sheets.length; s++) {
    var sh = sheets[s];
    if (sh.isSheetHidden()) continue;
    var sheetNameLower = sh.getName().toLowerCase();
    if (sheetNameLower.indexOf('shortdesc') < 0 && sheetNameLower.indexOf('project') < 0) continue;
    var lastRow = sh.getLastRow();
    if (lastRow < 2) continue;
    var numCols = sh.getLastColumn();
    if (numCols < 1) continue;
    var data = sh.getRange(1, 1, lastRow, numCols).getValues();
    var display = sh.getRange(1, 1, lastRow, numCols).getDisplayValues();
    var header = data[0] || [];
    var neptunCol = findHeaderCol(header, ['neptun', 'neptun id', 'neptunid']);
    if (neptunCol < 0) neptunCol = 0;
    var rowIndex = -1;
    for (var r = 1; r < data.length; r++) {
      if (String(data[r][neptunCol] || '').trim().toUpperCase() === upper) { rowIndex = r; break; }
    }
    if (rowIndex < 0) continue;
    var rowDisplay = display[rowIndex] || [];
    var pairs = [];
    for (var c = 0; c < header.length; c++) {
      var label = String(header[c] || '').trim() || 'Column ' + (c + 1);
      var value = rowDisplay[c] != null && rowDisplay[c] !== '' ? String(rowDisplay[c]).trim() : '';
      pairs.push({ label: label, value: value });
    }
    results.push({ title: sh.getName(), pairs: pairs });
  }
  return { results: results };
}

function getConfigImpl() {
  var gradesId = parseSpreadsheetId(CONFIG.STUDENTS_SHEET_ID);
  var gradesSheetUrl = '';
  if (gradesId && String(gradesId).indexOf('YOUR_') < 0) {
    gradesSheetUrl = 'https://docs.google.com/spreadsheets/d/' + gradesId + '/edit?usp=sharing';
  }
  return {
    signupDates: CONFIG.dates,
    maxSlotsPerDate: CONFIG.maxSlotsPerDate,
    gradesSheetUrl: gradesSheetUrl,
    deadlineCards: CONFIG.deadlineCards || []
  };
}

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};
  var action = params.action;
  var callback = params.callback;
  var output;
  try {
    if (action === 'getSlots') {
      output = buildGetSlotsResponse();
    } else if (action === 'getSignup') {
      var token = params.token;
      if (!token) {
        output = { error: 'Missing token' };
      } else {
        var signups = getSignupsData();
        var row = null;
        for (var r = 0; r < signups.length; r++) { if (signups[r].cancelToken === token) { row = signups[r]; break; } }
        if (!row) output = { error: 'Invalid or expired token' };
        else output = { neptunId: row.neptunId, name: row.name, date: row.date };
      }
    } else if (action === 'signup') {
      // GET/JSONP signup fallback when POST (iframe) is blocked (403) or times out
      var payload = {
        action: 'signup',
        neptunId: params.neptunId,
        name: params.name,
        email: params.email,
        date: params.date
      };
      output = handleSignup(payload);
    } else if (action === 'cancel') {
      // GET/JSONP cancel fallback when POST (iframe) is blocked (403) or times out
      output = handleCancel({ token: params.token });
    } else if (action === 'getResults') {
      var nid = params.neptunId;
      output = getResultsImpl(nid);
    } else if (action === 'getConfig') {
      output = getConfigImpl();
    } else if (action === 'refreshStudents') {
      refreshStudentsImpl();
      output = { success: true, message: 'Students list updated from grades sheet.' };
    } else {
      output = { error: 'Unknown action' };
    }
  } catch (err) {
    output = { error: err.message || 'Server error' };
  }
  // For cross-origin usage (e.g. university hosting), support JSONP to avoid CORS restrictions.
  if (callback && (action === 'getSlots' || action === 'getSignup' || action === 'signup' || action === 'cancel' || action === 'getResults' || action === 'getConfig')) return jsonpResponse(output, callback);
  return jsonResponse(output);
}

function parseFormUrlEncoded(body) {
  var params = {};
  if (!body || typeof body !== 'string') return params;
  var pairs = body.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var eq = pairs[i].indexOf('=');
    var key = eq >= 0 ? decodeURIComponent(pairs[i].substring(0, eq).replace(/\+/g, ' ')) : decodeURIComponent(pairs[i].replace(/\+/g, ' '));
    var val = eq >= 0 ? decodeURIComponent(pairs[i].substring(eq + 1).replace(/\+/g, ' ')) : '';
    params[key] = val;
  }
  return params;
}

function doPost(e) {
  var params = e && e.parameter ? e.parameter : {};
  var payload;
  if (e && e.postData && e.postData.contents) {
    var body = e.postData.contents;
    var trimmed = (body || '').trim();
    if (trimmed.indexOf('{') === 0) {
      try {
        payload = JSON.parse(body);
      } catch (err) {
        return jsonResponse({ error: 'Invalid JSON body' });
      }
    } else {
      params = parseFormUrlEncoded(body);
      payload = {
        action: params.action,
        neptunId: params.neptunId,
        name: params.name,
        email: params.email,
        date: params.date,
        token: params.token
      };
    }
  } else {
    payload = {
      action: params.action,
      neptunId: params.neptunId,
      name: params.name,
      email: params.email,
      date: params.date,
      token: params.token
    };
  }
  var action = payload.action;
  var output;
  try {
    if (action === 'signup') {
      output = handleSignup(payload);
    } else if (action === 'cancel') {
      output = handleCancel(payload);
    } else {
      output = { error: 'Unknown action' };
    }
  } catch (err) {
    output = { error: err.message || 'Server error' };
  }
  var callback = params.callback;
  if (callback && /^[a-zA-Z_$][\w$.]*$/.test(String(callback))) {
    return ContentService.createTextOutput(
      '<!DOCTYPE html><html><body><script>window.parent.' + callback + '(' + JSON.stringify(output) + ');<\/script></body></html>'
    ).setMimeType(ContentService.MimeType.HTML);
  }
  return jsonResponse(output);
}

function handleSignup(payload) {
  var neptunId = String(payload.neptunId || '').trim().toUpperCase();
  var name = String(payload.name || '').trim();
  var email = String(payload.email || '').trim();
  var date = String(payload.date || '').trim();

  if (!/^[A-Z0-9]{6}$/i.test(neptunId)) return { error: 'Neptun ID must be 6 alphanumeric characters.' };
  if (!name) return { error: 'Name is required.' };
  if (!email) return { error: 'Email is required.' };
  if (CONFIG.dates.indexOf(date) < 0) return { error: 'Invalid date.' };

  if (!isStudentValid(neptunId)) return { error: 'Neptun ID not found in course roster. Run refreshStudents in the backend if you updated the grades sheet.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    return { error: 'Server busy. Please try again.' };
  }
  try {
    var signups = getSignupsData();
    var alreadySigned = false;
    for (var r = 0; r < signups.length; r++) { if (signups[r].neptunId.toUpperCase() === neptunId) { alreadySigned = true; break; } }
    if (alreadySigned) {
      return { error: 'This Neptun ID already has a signup.' };
    }
    var forDate = [];
    for (var r = 0; r < signups.length; r++) if (signups[r].date === date) forDate.push(signups[r]);
    if (forDate.length >= CONFIG.maxSlotsPerDate) {
      return { error: 'This date is full.' };
    }
    var usedSlots = [];
    for (var r = 0; r < forDate.length; r++) usedSlots.push(forDate[r].slotNumber);
    var nextSlot = 1;
    while (usedSlots.indexOf(nextSlot) >= 0) nextSlot++;
    var cancelToken = generateUuid();
    var sh = getSignupsSheet();
    // Re-read and re-check right before writing to avoid race (two signups at once)
    var signupsAgain = getSignupsData();
    for (var r = 0; r < signupsAgain.length; r++) {
      if (signupsAgain[r].neptunId.toUpperCase() === neptunId) {
        return { error: 'This Neptun ID already has a signup.' };
      }
    }
    var hasAllGrades = checkStudentHasAllProjectGrades(neptunId);
    var col = getHasAllGradesColIndex(sh);
    if (sh.getRange(1, col).getValue() !== 'HasAllGrades') {
      sh.getRange(1, col).setValue('HasAllGrades');
    }
    sh.appendRow([date, nextSlot, neptunId, name, email, cancelToken, new Date().toISOString(), hasAllGrades]);

    var cancelLink = (CONFIG.SITE_URL || '').replace(/\/?$/, '/') + '?cancel=' + cancelToken;
    var body = 'Hello ' + name + ',\n\nYou are signed up for a presentation on ' + date + ' (12:00–14:00, online on Microsoft Teams).\n\nTo cancel your signup, use this link:\n' + cancelLink;
    if (!hasAllGrades) {
      body += '\n\nNote: You do not yet have an acceptable grade for both project submissions. You will need both before you can present.';
    }
    body += '\n\n— Computer Simulations in Physics';
    MailApp.sendEmail(email, 'Presentation signup confirmed – ' + date, body);

    return { success: true, date: date, slot: nextSlot, hasAllGrades: hasAllGrades };
  } finally {
    lock.releaseLock();
  }
}

function findHeaderCol(headerRow, allowedNames) {
  if (!headerRow || !allowedNames || allowedNames.length === 0) return -1;
  for (var c = 0; c < headerRow.length; c++) {
    var cell = String(headerRow[c] || '').trim().toLowerCase();
    for (var n = 0; n < allowedNames.length; n++) {
      if (cell === allowedNames[n]) return c;
    }
  }
  return -1;
}

function handleCancel(payload) {
  var token = String(payload.token || '').trim();
  if (!token) return { error: 'Missing token.' };

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    return { error: 'Server busy. Please try again.' };
  }
  try {
    var sh = getSignupsSheet();
    var data = sh.getDataRange().getValues();
    if (data.length < 2) return { error: 'Invalid or expired token.' };
    var header = data[0];
    var tokenCol = findHeaderCol(header, ['canceltoken', 'cancel token']);
    if (tokenCol < 0) return { error: 'Invalid sheet layout. Signups sheet must have a header row with a column named "CancelToken".' };
    var emailCol = findHeaderCol(header, ['email']);
    var dateCol = findHeaderCol(header, ['date']);
    var slotCol = findHeaderCol(header, ['slot', 'slotnumber']);
    var rowIndex = -1;
    var email = '';
    var dateFreed = '';
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][tokenCol] || '').trim() === token) {
        rowIndex = i + 1;
        if (emailCol >= 0) email = String(data[i][emailCol] || '').trim();
        if (dateCol >= 0) dateFreed = String(data[i][dateCol] || '').trim();
        break;
      }
    }
    if (rowIndex < 0) return { error: 'Invalid or expired token.' };
    if (dateCol >= 0) {
      var cancelledDateDisplay = sh.getRange(rowIndex, dateCol + 1).getDisplayValues()[0][0];
      if (cancelledDateDisplay != null && String(cancelledDateDisplay).trim() !== '') dateFreed = String(cancelledDateDisplay).trim();
    }
    sh.deleteRow(rowIndex);
    if (email) {
      MailApp.sendEmail(email, 'Presentation signup cancelled', 'Your presentation signup has been cancelled. Your slot is now free for others.\n\n— Computer Simulations in Physics');
    }
    if (slotCol >= 0 && dateFreed) {
      var lastRow = sh.getLastRow();
      if (lastRow >= 2) {
        var dataAfter = sh.getRange(2, 1, lastRow, Math.max(slotCol + 1, dateCol + 1, 2)).getValues();
        var dateDisplayAfter = sh.getRange(2, 1, lastRow, 1).getDisplayValues();
        var normalizedFreed = normalizeDateString(dateFreed);
        var rowsForDate = [];
        for (var j = 0; j < dataAfter.length; j++) {
          var d = dateDisplayAfter[j][0] != null && dateDisplayAfter[j][0] !== '' ? dateDisplayAfter[j][0] : dataAfter[j][dateCol];
          if (normalizeDateString(d) !== normalizedFreed) continue;
          rowsForDate.push({ sheetRow: j + 2, slot: parseInt(dataAfter[j][slotCol], 10) || 0 });
        }
        rowsForDate.sort(function(a, b) { return a.slot - b.slot; });
        for (var k = 0; k < rowsForDate.length; k++) {
          sh.getRange(rowsForDate[k].sheetRow, slotCol + 1).setValue(k + 1);
        }
      }
    }
    return { success: true, date: dateFreed };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Reads first column of every sheet in the grades spreadsheet (STUDENTS_SHEET_ID), skips header row, deduplicates, writes to Students tab.
 * Call GET ?action=refreshStudents manually after setting up the grades sheet each semester.
 */
function refreshStudentsImpl() {
  var gradesId = parseSpreadsheetId(CONFIG.STUDENTS_SHEET_ID);
  if (!gradesId || gradesId.indexOf('YOUR_') >= 0) throw new Error('STUDENTS_SHEET_ID is not set in CONFIG.');
  var gradesSs = SpreadsheetApp.openById(gradesId);
  var sheets = gradesSs.getSheets();
  var allowedNames = CONFIG.STUDENTS_SHEET_NAMES;
  var useOnlyNamedSheets = allowedNames && allowedNames.length > 0;
  var seen = {};
  var list = [];
  for (var s = 0; s < sheets.length; s++) {
    var sh = sheets[s];
    if (sh.isSheetHidden()) continue;  // Skip hidden sheets (e.g. old roster from a copied spreadsheet)
    if (useOnlyNamedSheets) {
      var name = sh.getName();
      var allowed = false;
      for (var n = 0; n < allowedNames.length; n++) if (allowedNames[n] === name) { allowed = true; break; }
      if (!allowed) continue;
    }
    // Always read column A (Neptun ID). getDataRange() would use the leftmost column with data,
    // which can be B on sheets where A is empty, giving wrong 6-char values from another column.
    var lastRow = Math.max(sh.getLastRow(), 1);
    var data = sh.getRange(1, 1, lastRow, 1).getValues();
    if (data.length < 2) continue;
    for (var i = 1; i < data.length; i++) {
      var raw = String(data[i][0] || '').trim();
      // Strip any non-alphanumeric (e.g. invisible/Unicode) so same ID from different sheets deduplicates
      var cell = raw.replace(/[^A-Za-z0-9]/g, '');
      if (cell.length === 6 && !seen[cell.toUpperCase()]) {
        seen[cell.toUpperCase()] = true;
        list.push([cell.toUpperCase()]);
      }
    }
  }
  var studentsSh = getStudentsSheet();
  studentsSh.clear();
  studentsSh.appendRow(['NeptunID']);
  if (list.length) studentsSh.getRange(2, 1, list.length, 1).setValues(list);
}

function jsonResponse(obj) {
  var text = JSON.stringify(obj);
  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonpResponse(obj, callback) {
  var cb = String(callback || '').replace(/[^\w$.]/g, '');
  if (!cb) cb = 'callback';
  var text = cb + '(' + JSON.stringify(obj) + ');';
  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// CORS: Apps Script does not support setting response headers. If your site is blocked by CORS
// when calling from a browser, host the page on the same domain as the script or use a proxy.
function doOptions() {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}
