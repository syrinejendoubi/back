const router = require("express").Router();
const {
  findAllDiscipline,
  createDiscipline,
  findDiscipline,
  deleteDiscipline,
  updateDiscipline,
} = require("../../controllers/disciplinesController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All disciplines
router.get("/disciplines", findAllDiscipline);
// Add discipline
router.post("/disciplines", createDiscipline);
// get discipline by id
router.get("/disciplines/:disciplineId", findDiscipline);
// update discipline
router.put("/disciplines/:disciplineId", updateDiscipline);
// delete discipline
router.delete("/disciplines/:disciplineId", deleteDiscipline);

module.exports = router;
