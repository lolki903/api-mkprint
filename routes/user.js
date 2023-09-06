const express = require("express");
const router = express.Router();

const { getuser,createuser,login } =  require("../controllers/user.js");
const { verifyToken } = require("../middleware/jwttoken.js");

router.get("/get", verifyToken,getuser);
router.post("/create" , createuser);
router.post("/login" ,/*verifyToken ,*/login);
// router.post("/create" , createNewsletter);

module.exports = router;
// export default router;