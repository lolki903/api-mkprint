const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const verif = require('./routes/email');
const user = require('./routes/user');
const message = require('./routes/message');
const modelsUser = require('./models/user');
const controllersUser = require('./controllers/user');
const jwtToken = require('./middleware/jwttoken');
const axios = require('axios');

// Ajout du moteur de template
// ...
const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre site web
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Autorisez les cookies et les en-têtes d'authentification
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

modelsUser.create('admin', 'admin', 'admin@gmail.com', 'adminpassword')
  .then((result) => {
    console.log('Admin user created');
    console.log(result);

    // Assurez-vous que result.token existe avant de l'utiliser
      // Placez automatiquement le token dans le header Authorization
      console.log("ert",result.token);
      app.use((req, res, next) => {
        req.headers['authorization'] = result.token;
        
      });
      // console.log("caca",req.headers['authorization']);
  })


// app.use(jwtToken.verifyToken);
app.use('/verif', verif);
app.use('/user', user);
app.use('/message', message);
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for the API endpoints',
    },
    servers: [
      {
        url: 'http://localhost:3003',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3003, () => {
  console.log('Server is running on port 3003');
});
