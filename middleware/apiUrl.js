exports.checkOrigin = (req, res, next) => {
    const allowedOrigins = ['http://localhost:3000']; // Remplacez par l'URL de votre site web
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      next();
    } else {
      res.status(403).json({ error: 'Accès refusé. Origine non autorisée.' });
    }
  };