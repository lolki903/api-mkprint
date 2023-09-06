let my = require("../config/database");
let bcrypt = require("bcrypt");
let moment = require("moment");
let axios = require("axios");
moment.locale("fr");
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
  get id() {
    return this._id;
  }
  get firstname() {
    return this._firstname;
  }
  get lastname() {
    return this._lastname;
  }
  get created() {
    return moment(this._created).format("DD/MM/YYYY");
  }
  get modified() {
    return moment(this._modified).format("DD/MM/YYYY");
  }
  get password() {
    return this._password;
  }
  get email() {
    return this._email;
  }
  get verified() {
    return this._verified;
  }
  
  set firstname(firstname) {
    this._firstname = firstname;
  }
  set lastname(lastname) {
    this._lastname = lastname;
  }
  set password(password) {
    this._password = password;
  }
  set email(email) {
    this._email = email;
  }
  set verified(verified) {
    this._verified = verified;
  }
  static all(callback) {
    my.query("SELECT * FROM user ORDER BY lastname DESC", (err, result) => {
      console.log(result);
      result = result.map((d) => {
        return new User(d);
      });
      callback(result);
    });
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
          value: `Your verification code is: ${verificationCode}`,
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


  static create(firstname, lastname, email, password, callback) {
       bcrypt.hash(password, 10, (err, hash) => {
        my.query(
            "INSERT INTO user (firstname,lastname,email,password) VALUES(?,?,?,?)",
            [firstname, lastname, email, hash],
            (err, res) => {
            callback(res);
            })
       });
  }

  static login(email, callback) {
    my.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (err, res) => {
        callback(res);
      }
    );
  }
  static update(email,callback) {
    my.query(
      "UPDATE user SET verifemail = ? WHERE email = ?",
      [1,email],
      (err, res) => {
        callback(res);
      }
    );
  }
}
module.exports = User;
