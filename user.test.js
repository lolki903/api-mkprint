// const User = require('./models/user');
// const bcrypt = require('bcrypt');
// const yup = require('yup');

// // Mockez la connexion à la base de données si nécessaire
// jest.mock('./config/database');

// // Mockez la fonction sendVerificationEmail si nécessaire
// jest.mock('./models/emailverif', () => {
//   return {
//     create: jest.fn(),
//     makeid: jest.fn(),
//   };
// });

// describe('Modèle User', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('devrait créer un utilisateur avec succès', async () => {
//     const user = {
//       id: 140,
//     created: "2023-09-13T22:48:44.068796+00:00",
//     modified: "2023-09-13T22:48:44.068796",
//     firstname: "hh",
//     lastname: "test03",
//     email: "ro@juju.com",
//     password: "$2b$10$ekjpI8fJNi9ftTDg9LdVtehzF8cvHBCrw0V9YUUAqyGn9ZJU3JP5O",
//     verifemail: false
//     };

//     // Mockez la réponse de la base de données
//     const mockData = [{ id: 1 }];
//     const mockError = null;
//     require('./config/database').setMockResponse(mockData, mockError);

//     const result = await User.create(user.firstname, user.lastname, user.email, user.password);

//     expect(result).toEqual(mockData);
//     expect(require('./models/emailverif').create).toHaveBeenCalled();
//   });

//   it('devrait échouer lors de la création d\'un utilisateur avec des données incorrectes', async () => {
//     const invalidUser = {
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'invalid-email',
//       password: 'short',
//     };

//     await expect(async () => {
//       await User.create(invalidUser.firstname, invalidUser.lastname, invalidUser.email, invalidUser.password);
//     }).rejects.toThrow();
//   });

//   // Ajoutez d'autres tests en fonction de vos besoins
// });


const userController = require('./controllers/user');
const User = require('./models/user');
const Emailverif = require('./models/emailverif');
const bcrypt = require('bcrypt');

jest.mock('./models/user');
jest.mock('./models/emailverif');
jest.mock('./config/database');

describe('Contrôleur User', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait créer un utilisateur avec succès', async () => {
    const req = { body: {  
          firstname: "hh",
          lastname: "test03",
          email: "ro@juju.com",
          password: "$2bxxxxxx",
          verifemail: false } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mockez la réponse du modèle User.create
    const mockData =   
    [{
      id: 1,
        }]
    
     User.create.mockResolvedValue(mockData);

    await userController.createuser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(Emailverif.create).toHaveBeenCalled();
  });

  it('devrait échouer lors de la création d\'un utilisateur avec des données incorrectes', async () => {
    const req = { body: { /* données incorrectes de l'utilisateur */ } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mockez la validation de schéma pour échouer
    const validationError = new Error('Validation failed');
    validationError.name = 'ValidationError';
    User.create.mockRejectedValue(validationError);

    await userController.createuser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Le mot de passe est requis' });
  });

  // Ajoutez d'autres tests en fonction de vos besoins
});
it('devrait réussir la connexion d\'un utilisateur existant', async () => {
  const req = { body: {  
    email: "ro@juju.com",
    password: "$2bxxxxxx",
  }};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mockez la réponse du modèle User.login
  const mockData = [{
    id: 1,
    firstname: "hh",
    lastname: "test03",
    email: "ro@juju.com",
    password: "$2bxxxxxx",
    verifemail: false
  }];
  User.login.mockResolvedValue(mockData);

  await userController.login(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(mockData);
});
