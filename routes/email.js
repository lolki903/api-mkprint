const express = require("express");
const router = express.Router();

const { validate } = require("../controllers/email.js");
const { verifyToken } = require("../middleware/jwttoken.js");

// router.get("/get", verifyToken,getuser);
router.post("/validate" , validate);
// router.post("/login" ,verifyToken ,login);
// router.post("/create" , createNewsletter);

module.exports = router;
// export default router;