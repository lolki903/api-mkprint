const Emailverif = require('../models/emailverif');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.getuser = async (req, res) => {
    try {
        User.all(function(users) {
            res.status(200).json(users);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// function 
exports.createuser = async (req, res) => {
    const user = req.body;
    const code = Emailverif.makeid(8);
    console.log(code);
    try {
        User.create(user.firstname,user.lastname,user.email,user.password,(result)=>{
            Emailverif.create(result.insertId,code,()=>{
                User.sendVerificationEmail(user.email,code,(result)=>{
                    if(result){
                        console.log("email sent");
                    }
                })
            }
            )
            jwt.sign(user,"jeanlucien2314",{ expiresIn: "30days"}, (err, token) => {
                    if(err){
                        res.status(401)
                        console.log(err)
                        res.json({message: err})
                    }
                    else{
                        res.status(200)
                        res.json({message: "login success", token: token})
                    }
                })
        })
        
        // res.status(201).json();
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.login = async (req, res) => {
    const user = req.body;
    try {
        User.login(user.email,(result)=>{
            result.map((rest)=>{
            bcrypt.compare(user.password, rest.password, (err, resul) => {
                // console.log(result);
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });
                    }
                if (!resul) {
                    return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    if(resul==false)
                    {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    res.status(201).json(result);
            })
        })
    })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}