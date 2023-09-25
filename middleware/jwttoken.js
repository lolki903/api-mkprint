const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_TOKEN; // Utilisez une clé sécurisée et unique

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("authorization");
    console.log("tokennnn",token);
    if (token) {
        jwt.verify(token, jwtKey, (err, payload) => {
            if (err) {
                return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
            } else {
                // Si la vérification du token est réussie, vous pouvez accéder aux informations du payload via payload
                req.userId = payload.userId;
                console.log("payload",payload);
                next();
            }
        });
    } else {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
}
