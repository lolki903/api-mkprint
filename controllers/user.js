        // Import required modules
        const Emailverif = require('../models/emailverif');  // Import the Emailverif module
        const User = require('../models/user');  // Import the User module
        const bcrypt = require('bcrypt');  // Import the bcrypt module
        const jwt = require('jsonwebtoken');  // Import the jwt module
        const yup = require('yup')  // Import the yup module for schema validation

        // Define the user schema for validation
        const userSchema = yup.object().shape({
            firstname: yup.string().required('Le prénom est requis'),  // Validate the firstname field
            lastname: yup.string().required('Le nom de famille est requis'),  // Validate the lastname field
            email: yup.string().email('L\'adresse e-mail n\'est pas valide').required('L\'adresse e-mail est requise'),  // Validate the email field
            password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),  // Validate the password field
        });

        // Get all users
        exports.getuser = async (req, res) => {
            try {
                const result = await User.all();  // Get all users from the User model
                res.status(200).json(result);  // Send the result as a JSON response with status code 200
            } catch (error) {
                res.status(404).json({ message: error.message });  // Send an error message as a JSON response with status code 404
            }
        }

        // Create a user
        exports.createuser = async (req, res) => {
            const user = req.body;  // Get the user data from the request body
            const code = Emailverif.makeid(8);  // Generate a verification code

            try {
                await userSchema.validate(user);  // Validate the user data against the user schema
                const result = await User.create(user.firstname, user.lastname, user.email, user.password);  // Create a new user using the User model

                const resultid = result.data[0].id;  // Get the ID of the created user
                if (result) {
                    await User.sendVerificationEmail(result.data[0].email, code);  // Send a verification email to the user
                    await Emailverif.create(resultid, code);  // Create a new email verification record
                    setTimeout(async () => {
                        Emailverif.delete(resultid);  // Delete the email verification record after 60 seconds
                    }, 300000);
                }

                res.status(201).json(result);  // Send the result as a JSON response with status code 201
            } catch (error) {
                res.status(409).json({ message: error.message });  // Send an error message as a JSON response with status code 409
            }
        }

        // User login
        exports.login = async (req, res) => {
            const user = req.body;  // Get the user data from the request body
            try {
                const utilisateur = await User.login(user.email, user.password);  // Login the user using the User model
                console.log("utilisateur", utilisateur);  // Log the user data
                res.status(200).json(utilisateur);  // Send the user data as a JSON response with status code 200
            } catch (error) {
                res.status(409).json({ message: error.message });  // Send an error message as a JSON response with status code 409
            }
        }

        // Create an admin
        exports.createadmin = async (req, res) => {
            const user = req.body;  // Get the user data from the request body
            try {
                await userSchema.validate(user);  // Validate the user data against the user schema
                const result = await User.create(user.firstname, user.lastname, user.email, user.password);  // Create a new user using the User model

                res.setHeader('Authorization', `Bearer ${result.token}`);  // Set the Authorization header with the user's token
                res.status(201).json(result);  // Send the result as a JSON response with status code 201
            } catch (error) {
                res.status(409).json({ message: error.message });  // Send an error message as a JSON response with status code 409
            }
        }
