const express = require("express");
const { createmessage, getmessage } = require("../controllers/message");
const router = express.Router();

/**
 * @swagger
 * /message/get:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve a list of all messages
 *     responses:
 *       200:
 *         description: A list of messages.
 */
router.get("/get",getmessage)

/**
 * @swagger
 * /message/create:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       206:
 *         description: Message created and verification email sent
 *       203:
 *         description: Message created
 *       409:
 *         description: Error creating message
 */
router.post("/create" , createmessage);

module.exports = router;
