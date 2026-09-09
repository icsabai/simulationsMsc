# Computer Simulations in Physics — Course site

This folder contains the course website (HTML, CSS, JS) and the Google Apps Script that powers presentation signup, results, and config (deadlines, schedule). The script is deployed as a web app; the site is hosted separately on github pages.

---

## Start of semester checklist

At the beginning of each new semester, go through the following steps so the site and signup system match the current course.

### 1. Script: update CONFIG (Apps Script)

Edit the **CONFIG** object at the top of `appsscript_code.js` in the Google Apps Script project.

| Setting | What to do |
|--------|------------|
| **`SITE_URL`** | Base URL where the course site is hosted (used in cancel/change links in emails). |
| **`SIGNUPS_SPREADSHEET_ID`** | ID of the spreadsheet that has the **Signups** and **Students** sheets (from the sheet URL: `.../d/THIS_PART/edit`). Leave empty only if the script is bound to that spreadsheet. |
| **`STUDENTS_SHEET_ID`** | ID or full URL of the **grades spreadsheet** (the one with project grades). Used to check "has all grades", to show results, and as the "here" link in the Results section. |
| **`STUDENTS_SHEET_NAMES`** | Optional. If your grades file has multiple sheets, list the tab name(s) that contain the canonical Neptun list (e.g. `['Main']`). If empty, all sheets are read. |
| **`dates`** | Presentation signup dates in `"d MMM yyyy"` format, e.g. `['18 Nov 2025', '25 Nov 2025', '2 Dec 2025', '9 Dec 2025']`. These appear in the Sign Up dropdown and slot table. |
| **`maxSlotsPerDate`** | Maximum number of slots per presentation date (e.g. `10`). |
| **`deadlineCards`** | Array of deadline entries shown in the **Deadlines** section and in the hero countdown. Each item has: `logo`, `logoClass`, `subtitle`, `date` (display, e.g. `"18 Nov. 2025"`), `dateValue` (parseable, e.g. `"18 November 2025 12:00:00 GMT+01:00"`), `dateText` (hero subtitle), `description` (HTML for the card detail, including Kooplex paths if needed). Update dates and any course codes/paths (e.g. `courses/2025-...assignments/...`) for the new semester. |

After editing, **save** and **redeploy** the web app (Deploy → Manage deployments → Edit → New version) so the live site gets the new config.

---

### 2. Signup sheet: clear last year's data

The script reads/writes a sheet named **Signups** in the spreadsheet identified by `SIGNUPS_SPREADSHEET_ID`. It expects a header row and data rows below.

- Open that spreadsheet and go to the **Signups** tab.
- **Keep the header row** (e.g. `Date`, `SlotNumber`, `NeptunID`, `Name`, `Email`, `CancelToken`, `Timestamp`, `HasAllGrades`).
- **Delete all data rows** from the previous semester (or clear their contents). This avoids mixing old signups with the new ones.
- Clear the **Students** tab too (keep the header if present).

---

### 3. Grades sheet: prepare for current students

The **grades spreadsheet** (the one pointed to by `STUDENTS_SHEET_ID`) is used to:

- Decide who can sign up (Neptun IDs that appear in the sheet),
- Show "has all grades" in the signup flow,
- Power the **Results** section (grades and feedback).

Do the following:

1. **Create or open the grades spreadsheet** for the new semester (or reuse the same file and update its contents).
2. **Ensure it contains Neptun IDs for all current students.** The script reads Neptun IDs from the first column of the configured sheet(s). If you use `STUDENTS_SHEET_NAMES`, only those tabs are read; otherwise all sheets are read (union of first columns).
3. **Update CONFIG** in the script so `STUDENTS_SHEET_ID` points to this spreadsheet (ID or full URL).
4. Ensure the sheet layout and any grading logic (e.g. which columns count as "project 1", "project 2", "presentation") match what the script expects for "has all grades" and for the Results section. Adjust the script if you change the layout.

---

### 4. Course schedule description in the HTML

The **About** section in `index.html` contains a fixed "Schedule for 20XX/XX …" list (intro sessions, deadlines, rooms, etc.). This is plain HTML and is **not** driven by the script.

- Update the **academic year and semester** in the heading.
- Update **all listed dates and events** (intro sessions, deadlines, rooms, times) to match the new semester.
- Adjust any other course-specific text in that section (consultation info, links, etc.).

The **Deadlines** section (cards and the description under them) is filled from the script's `deadlineCards`; that's covered in step 1.

---

### 5. Requirements PDF

The site links to a single main requirements document in several places (e.g. "Detailed requirements can be found [here](szamszim_req2025.pdf).").

- **Replace or overwrite** the file (e.g. `szamszim_req2025.pdf`) in the same folder as `index.html` with the new semester's requirements PDF, **or**
- **Rename** the new PDF to the same filename the site uses (so links don't break), **or**
- **Update every link** in `index.html` that points to the requirements PDF (search for the current filename, e.g. `szamszim_req2025.pdf`) to the new filename.

After updating, ensure all requirement links (Requirements section, About, etc.) open the correct PDF.

---

## Quick reference

| Task | Where |
|------|--------|
| Presentation dates, deadlines, grades sheet, schedule cards | `appsscript_code.js` → **CONFIG** |
| Clear old signups | Google Sheet → **Signups** tab |
| Neptun list for signup & results | Grades spreadsheet + **CONFIG** `STUDENTS_SHEET_ID` / `STUDENTS_SHEET_NAMES` |
| Course schedule text (intro sessions, rooms, etc.) | `index.html` → About section |
| Requirements PDF | Replace/rename file or update links in `index.html` |

After changes: save the script and **redeploy** the web app; re-upload the updated `index.html` (and new PDF if needed) to GitHub.
