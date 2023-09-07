const express = require("express");
const { createmessage, getmessage } = require("../controllers/message");
const router = express.Router();

// router.get("/get", verifyToken,getuser);
router.get("/get",getmessage)
router.post("/create" , createmessage);
// router.post("/login" ,verifyToken ,login);
// router.post("/create" , createNewsletter);

module.exports = router;
// export default router;