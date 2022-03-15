const router = require("express").Router();
const { findAllInvitation , createInvitation , findInvitation,  deleteInvitation , updateInvitation , } = require("../../controllers/invitationsController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All invitations
router.get("/invitations" , findAllInvitation);
// Add invitation
router.post("/invitations", createInvitation);
// get invitation by id 
router.get("/invitations/:invitationId" , findInvitation );
// update invitation
router.put("/invitations/:invitationId" ,updateInvitation );
// delete invitation
router.delete("/invitations/:invitationId" ,deleteInvitation );


module.exports = router;
