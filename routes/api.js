const express = require("express");
const router = express.Router();

// Models
const Institute = require("../models/Institute");
const Board = require("../models/Board");
const Medium = require("../models/Medium");
const ClassCategory = require("../models/ClassCategory");
const Standard = require("../models/Standard");
const Subject = require("../models/Subject");
const University = require("../models/University");
const Degree = require("../models/Degree");

// API: Register Institute and Related Data
router.post("/register/institute", async (req, res) => {
  const { instituteType, name, board, medium, classCategory, standard, subjects, university, degree } = req.body;

  try {
    // Step 1: Register the institute
    const institute = new Institute({ name, type: instituteType });
    let d = await institute.save();
    console.log('d',d)

    // Step 2: Handle School-specific data
    if (instituteType === "School") {
      // Add Board
      if (board) {
        const newBoard = new Board({ name: board });
        await newBoard.save();
      }

      // Add Medium
      if (medium) {
        const newMedium = new Medium({ name: medium });
        await newMedium.save();
      }

      // Add Class Category and Standards
      if (classCategory && standard) {
        const newClassCategory = new ClassCategory({ name: classCategory });
        await newClassCategory.save();

        const newStandard = new Standard({ name: standard, classCategoryId: newClassCategory._id });
        await newStandard.save();

        // Add Subjects
        if (subjects && subjects.length > 0) {
          for (const subject of subjects) {
            const newSubject = new Subject({ name: subject, standardId: newStandard._id });
            await newSubject.save();
          }
        }
      }
    }

    // Step 3: Handle College-specific data
    if (instituteType === "College") {
      if (university) {
        const newUniversity = new University({ name: university });
        await newUniversity.save();
      }

      if (degree) {
        const newDegree = new Degree({ name: degree });
        await newDegree.save();
      }
    }

    // Step 4: Competitive Exam Center (additional handling if needed)
    if (instituteType === "Competitive Exam Center") {
      // Add exam-specific logic here if required
    }

    res.json({ success: true, message: "Institute and related data registered successfully", instituteId: institute._id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
