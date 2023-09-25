const  config  = require("../config/database");
const bcrypt = require("bcrypt");
const moment = require("moment");
const axios = require("axios");
const Emailverif = require("./emailverif");
const yup = require('yup');
const jwt = require('jsonwebtoken');
require('dotenv').config();
moment.locale("fr");
const userSchema = yup.object().shape({
  firstname: yup.string().required('Le prénom est requis'),
  lastname: yup.string().required('Le nom de famille est requis'),
  email: yup.string().email('L\'adresse e-mail n\'est pas valide').required('L\'adresse e-mail est requise'),
  password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
});
class User {
  constructor(d) {
    if (d == null) {
      this._id = null;
      this._firstname = null;
      this._lastname = null;
      this._created = null;
      this._modified = null;
      this._password = null;
      this._email = null;
      this._verified = null;
    } else {
      this._id = d.id;
      this._firstname = d.firstname;
      this._lastname = d.lastname;
      this._created = d.created;
      this._modified = d.modified;
      this._password = d.password;
      this._email = d.email;
      this._verified = d.verified;
    }
  }
  // getters and setters remain the same
  // ...
  
  static all = async () => {
    let { data: users, error } = await config.connection.from('user').select('*').order('lastname', { ascending: false });
    if (error) console.log(error);
    return users.map(d => new User(d));
  }
  static makeid(length) {
    let verificationCode = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      verificationCode += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
      counter += 1;
    }
    return verificationCode;
  }
  static sendVerificationEmail = async (email, verificationCode) => {
    const apiKey =
          "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";
        const senderEmail = "jeanfreza428@gmail.com";
        const sendGridUrl = "https://api.sendgrid.com/v3/mail/send";
    
        const data = {
          personalizations: [
            {
              to: [{ email }],
              subject: "Account Verification",
            },
          ],
          from: {
            email: senderEmail,
          },
          content: [
            {
              type: "text/plain",
              value: `Le message envoyé ${verificationCode}`,
            },
          ],
        };
    
        try {
          await axios.post(sendGridUrl, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
    
          console.log("Verification email sent successfully");
          
          
        } catch (error) {
          console.error("Failed to send verification email", error);
        }
      };

  static create = async (firstname, lastname, email, password) => {
    let token = null;
    try {
      await userSchema.validate({ firstname, lastname, email, password });
  
      const hash = await bcrypt.hash(password, 10);
      const { data, error } = await config.connection.from('user').upsert([{ firstname, lastname, email, password: hash, verifemail: 0 }]).select();
      
      if(data){
        token = jwt.sign({ userId: data[0].id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
       console.log("token=======>",token);
      }
      if (error) throw error;
      return {data,token};
    } catch (validationError) {
      throw validationError; // Gérez cette erreur dans le contrôleur pour renvoyer un message d'erreur approprié
    }
  }
  

  static login = async (email,password) => {
    let { data: user, error } = await config.connection.from('user').select('*').eq('email', email);
    const hash =await bcrypt.compare(password, user[0].password);
    if(!hash){
      return "ok";
    }
    console.log("user",user);
    if (error) console.log(error);
    return user;
  }
  
  static update = async (id) => {
    let { data: user, error } = await config.connection.from('user').update({ verifemail: 1 }).eq('id', id);
    console.log("user",user);
    if (error) console.log(error);
    return user;
  }
}
module.exports = User;

