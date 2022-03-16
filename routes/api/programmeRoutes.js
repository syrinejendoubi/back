const router = require("express").Router();
const { findAllProgramme , createProgramme , findProgramme,  deleteProgramme , updateProgramme  } = require("../../controllers/programmeController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All programmes
router.get("/programmes" , findAllProgramme);
// Add programme
router.post("/programmes", createProgramme);
// get programme by id 
router.get("/programmes/:programmeId" , findProgramme );
// update programme
router.put("/programmes/:programmeId" ,updateProgramme );
// delete programme
router.delete("/programmes/:programmeId" ,deleteProgramme );


module.exports = router;
