const express = require("express");
const router = express.Router();

const { getNewsletters,createNewsletter } =  require("../controllers/realisation.js");

router.get("/get", getNewsletters);
router.post("/create" , createNewsletter);

module.exports = router;
// export default router;