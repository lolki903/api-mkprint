const express = require("express");
const router = express.Router();

const { getuser, createuser, login } = require("../controllers/user.js");

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Récupérer tous les utilisateurs.
 *     responses:
 *       200:
 *         description: Liste de tous les utilisateurs.
 */

router.get("/get", getuser);

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Créer un nouvel utilisateur.
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
 *               password:
 *                 type: string
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       409:
 *         description: Erreur de création d'utilisateur.
 */

router.post("/create", createuser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Connectez-vous en tant qu'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès.
 *       409:
 *         description: Erreur de connexion d'utilisateur.
 */

router.post("/login", login);

module.exports = router;
