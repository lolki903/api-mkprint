const jwt = require('jsonwebtoken');

const jwtKey = "ymkprint54"; // Utilisez une clé sécurisée et unique

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("token",token);
    if (token) {
        jwt.verify(token, jwtKey, (err, payload) => {
            if (err) {
                return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
            } else {
                // Si la vérification du token est réussie, vous pouvez accéder aux informations du payload via payload
                req.user = payload; // Vous pouvez stocker les informations de l'utilisateur dans req.user pour une utilisation ultérieure
                next();
            }
        });
    } else {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
}
