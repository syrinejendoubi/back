const router = require("express").Router();
const { findAllEvent , createEvent , findEvent,  deleteEvent , updateEvent ,findEventCratedByMycoachs } = require("../../controllers/eventController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All events
router.get("/events" , findAllEvent);
// Add event
router.post("/events", createEvent);
// get event by id 
router.get("/events/:eventId" , findEvent );
// update event
router.put("/events/:eventId" ,updateEvent );
// delete event
router.delete("/events/:eventId" ,deleteEvent );

router.get("/joueur/:userId/events",findEventCratedByMycoachs);


module.exports = router;
