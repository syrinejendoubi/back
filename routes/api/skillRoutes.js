const router = require("express").Router();
// const { protect, authorize } = require("../../middleware/authMiddleware");
const {
  CreateSkill,
  deleteSkill,
  updateSkill,
  findSingleSkill,
  findAllSkills
} = require("../../controllers/skillController");

router.post("/createSkill", CreateSkill);

router.get("/all/skills/:discipline", findAllSkills);

// get skill by id
router.get("/skill/:skillId", findSingleSkill);
// update skill
router.put("/skill/:skillId", updateSkill);
// delete skill
router.delete("/skill/:skillId", deleteSkill);

module.exports = router;
