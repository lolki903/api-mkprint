const express = require("express");
const router = express.Router();

const { getuser,createuser,login } =  require("../controllers/user.js");
// const { verifyToken } = require("../middleware/jwttoken.js");
const { checkOrigin } = require("../middleware/apiUrl.js");

router.get("/get", checkOrigin,getuser);
router.post("/create" ,checkOrigin, createuser);
router.post("/login" ,/*verifyToken ,*/login);
// router.post("/create" , createNewsletter);

module.exports = router;
// export default router;