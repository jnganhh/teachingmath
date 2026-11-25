---
name: math-practice-firebase
description: Standard Firebase Firestore & teacher reporting setup for all new math practice and drill pages in jnganhh/teachingmath.
---

# Math Practice & Drill Standard (jnganhh/teachingmath)

Whenever creating a new practice or drill webpage in this repository:

1. **Connect to Firebase Firestore (`mathpractice-9a4cc`, Spark free tier):**
   - Load `firebase-app-compat.js` and `firebase-firestore-compat.js` (`10.14.1`) plus `./firebase-config.js` (which sets `window.MATHPRACTICE_FIREBASE_CONFIG`).
   - Write to `mpm2d_students/{docId}` (or `{course}_students` if rules allow, currently `mpm2d_students` and `mpm2d_reports` are open in Firestore rules) and append completion events to `mpm2d_reports`.
2. **Always label the type of practice clearly in every Firestore document:**
   - Include `course` (e.g. `'MPM2D'`, `'MCR3U'`, `'MTH1W'`),
   - Include `practiceType` (e.g. `'MPM2D Math Drill Center'`, `'MCR3U Inverse Functions Drill'`),
   - Include `mode` / `lastMode` and `modesPracticed` so the teacher can filter and see exactly what type of practice each student completed.
3. **Include student identity, local progress, feedback, hints, break timer, and teacher reporting:**
   - Student sign-in (`name`, `cls`) saved in `localStorage`.
   - Scaffolded hints + worked solution + diagnostic feedback.
   - Active-work break timer.
   - Automatic report at 20 correct answers + manual **Submit Report to Teacher** button (syncing to Firestore and optionally Apps Script email).
