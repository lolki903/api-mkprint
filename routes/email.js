const express = require("express");
const router = express.Router();

const { validate } = require("../controllers/email.js");
const { verifyToken } = require("../middleware/jwttoken.js");

/**
 * @swagger
 * /email/validate:
 *   post:
 *     summary: Validate email
 *     description: Validate email with verification code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               code: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       404:
 *         description: Invalid verification code
 *       500:
 *         description: Error in email verification
 */
router.post("/validate" , validate);

module.exports = router;
