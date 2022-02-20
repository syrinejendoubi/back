const router = require("express").Router();
const { findAllDisciplined , createDisciplined , findDisciplined,  deleteDisciplined , updateDisciplined , } = require("../../controllers/disciplinedsController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All disciplineds
router.get("/disciplineds" ,protect, findAllDisciplined);
// Add disciplined
router.post("/disciplineds", createDisciplined);
// get disciplined by id 
router.get("/disciplineds/:disciplinedId" , findDisciplined );
// update disciplined
router.put("/disciplineds/:disciplinedId" ,updateDisciplined );
// delete disciplined
router.delete("/disciplineds/:disciplinedId" ,deleteDisciplined );


module.exports = router;
