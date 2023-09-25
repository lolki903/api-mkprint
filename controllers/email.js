const User = require('../models/user');  // Importing the User model
const jwt = require('jsonwebtoken');  // Importing the jsonwebtoken library
const bcrypt = require("bcrypt")  // Importing the bcrypt library for password hashing
const Emailverif = require('../models/emailverif');  // Importing the Emailverif model

exports.login = async (req, res) => {
    const  password  = req.body.password;  // Extracting the password from the request body
    const user = await User.findOne({email:req.body.email});  // Finding the user by email

    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });  // Returning a 404 response if the user is not found
    }

    bcrypt.compare(password, user.password, (err, result) => {  // Comparing the provided password with the hashed password stored in the database
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });  // Returning a 500 response if there is an error in password comparison
        }

        if (!result) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });  // Returning a 401 response if the password is incorrect
        }

        const token = jwt.sign({ userId: user.id }, 'secret21345');  // Generating a JWT token with the user ID
        res.json({ user,token });  // Returning the user and token in the response
    });
}

exports.validate = async (req, res) => {
    const id = req.body.email;  // Extracting the email from the request body

    try {
        const valid = await Emailverif.findbyemail(id);  // Finding the email verification record by email
        console.log("valid",valid.id);

        if(valid) {
            const er = await Emailverif.getid(valid.id);  // Getting the email verification record by ID
            if(er.code == req.body.code) {  // Checking if the verification code matches
                await User.update(valid.id);  // Updating the user's verification status
                console.log("exxx",er);
            }
            console.log("er",er);
            res.status(200).json({message:"email verified"});  // Returning a success message if the email is verified
        }
    } catch (error) {
        res.status(409).json({ message: error.message });  // Returning a 409 response if there is an error in email verification
    }
}

exports.deleteUser = async (req, res) => {
    const { id, password } = req.body;  // Extracting the user ID and password from the request body

    try {
        const user = await User.findById(id);  // Finding the user by ID

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });  // Returning a 404 response if the user is not found
        }

        bcrypt.compare(password, user.password, (err, result) => {  // Comparing the provided password with the hashed password stored in the database
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });  // Returning a 500 response if there is an error in password comparison
            }

            if (!result) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });  // Returning a 401 response if the password is incorrect
            }
        });

        await User.deleteOne(user);  // Deleting the user from the database

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });  // Returning a success message if the user is deleted
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });  // Returning a 500 response if there is an error in user deletion
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);  // Finding the user by ID
        res.status(200).json(user);  // Returning the user in the response
    } catch (error) {
        res.status(404).json({ message: error.message });  // Returning a 404 response if the user is not found
    }
}

exports.verifyemail = async (req, res) => {
    const useremail = req.body.email;  // Extracting the email from the request body
    const code = req.body.code;  // Extracting the verification code from the request body

    try {
        const verify = await Verif.findOne({ email: useremail, code: code });  // Finding the verification record by email and code

        if (!verify) {
            return res.status(404).json({ message: "Invalid verification code" });  // Returning a 404 response if the verification code is invalid
        }

        await User.updateOne({ email: useremail }, { status: "valide" });  // Updating the user's status to "valide"

        return res.status(200).json({ message: "Email verification successful" });  // Returning a success message if the email is verified
    } catch (error) {
        res.status(500).json({ message: error.message });  // Returning a 500 response if there is an error in email verification
    }
}
