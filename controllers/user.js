const Emailverif = require('../models/emailverif');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const yup = require('yup')

const userSchema = yup.object().shape({
    firstname: yup.string().required('Le prénom est requis'),
    lastname: yup.string().required('Le nom de famille est requis'),
    email: yup.string().email('L\'adresse e-mail n\'est pas valide').required('L\'adresse e-mail est requise'),
    password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
  });
exports.getuser = async (req, res) => {
    try {
        const result = await User.all();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// function 
exports.createuser = async (req, res) => {
    const user = req.body;
    const code = Emailverif.makeid(8);
    // let token = null;
    // console.log("d===>",code);
    try {
        await userSchema.validate(user);
       const result = await User.create(user.firstname,user.lastname,user.email,user.password);
    //    if(result){
    //      token = jwt.sign({ userId: result[0].id }, 'ymkprint54', { expiresIn: '1h' });
    //     console.log("token",token);
    //    }
    //    console.log("caca",result[0].id);
        const resultid = result.data[0].id
       if (result) {
           await Emailverif.create(resultid, code);
           setTimeout(async () => {
            // console.log("temps",result[0].id);
                Emailverif.delete(resultid);
           }, 60000);
          
       }
       res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.login = async (req, res) => {
    const user = req.body;
    try {
      const utilisateur =  await User.login(user.email,user.password);
      console.log("utilisateur",utilisateur);
      res.status(200).json(utilisateur);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.createadmin = async (req, res) => {
    const user = req.body;
    try {
        await userSchema.validate(user);
        const result = await User.create(user.firstname,user.lastname,user.email,user.password);
        
        console.log("result",res);
        res.setHeader('Authorization', `Bearer ${result.token}`);
        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}