const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const verif = require('./routes/email');
const user = require('./routes/user');
const message = require('./routes/message');
const jwtToken = require('./middleware/jwttoken');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const modelsUser = require('./models/user');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
require('dotenv').config();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

const createAdminUser = async () => {
  try {
    const result = await modelsUser.create('admin', 'admin', 'admin@gmail.com', 'adminpassword');
    console.log('Admin user created');
    return result.token;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

const setupMiddleware = (app, authToken) => {
  app.use((req, res, next) => {
    console.log("ok");
    req.headers['authorization'] = authToken;
    next();
  });

  app.use(session({
    httpOnly: true,
    secure: true,
    secret: authToken,
  }));
};

(async () => {
  try {
    const authToken = await createAdminUser();
    setupMiddleware(app, authToken);
  } catch (error) {
    console.error('Error setting up middleware:', error);
    process.exit(1);
  }

  app.use(jwtToken.verifyToken);

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
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          },
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions); // Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger UI

  const port = process.env.PORT || 3003;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
