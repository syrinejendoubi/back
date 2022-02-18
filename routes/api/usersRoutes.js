const router = require("express").Router();
const { findAllUser , createUser , findUser,  deleteUser , updateUser , } = require("../../controllers/usersController");
const { protect, authorize } = require("../../middleware/authMiddleware");
// Get All users
router.get("/users",protect ,findAllUser);
// Add user
router.post("/users", createUser);
// get user by id 
router.get("/users/:userId",protect , findUser );
// update user
router.put("/users/:userId",protect ,updateUser );
// delete user
router.delete("/users/:userId",protect ,deleteUser );


module.exports = router;
