let database = require('../config/database')
let axios = require('axios')

class Message {
    constructor(d) {
        if (d == null) {
            this._id = null
            this._message = null
            this._created = null
            this._modified = null
            this._lastname= null
            this._firstname= null
            this._email= null
        } else {
            this._id = d.id
            this._message = d.message
            this._created = d.created
            this._modified = d.modified
            this._lastname= d.lastname
            this._firstname= d.firstname
            this._email= d.email
        }
    }
    get id() {
        return this._id
    }
    get message() {
        return this._message
    }
    get created() {
        return this._created
    }
    get modified() {
        return this._modified
    }
    get lastname() {
        return this._lastname
    }
    get firstname() {
        return this._firstname
    }
    get email() {
        return this._email
    }
    set message(message) {
        this._message = message
    }
    set lastname(lastname) {
        this._lastname = lastname
    }
    set firstname(firstname) {
        this._firstname = firstname
    }
    set email(email) {
        this._email = email
    }
    set modified(modified) {
        this._modified = modified
    }
    set created(created) {
        this._created = created
    }
    set id(id) {
        this._id = id
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

    static create(lastname, firstname, email, message, callback) {
        database.query("INSERT INTO message (lastname, firstname, email, message) VALUES (?, ?, ?, ?)", [lastname, firstname, email, message], (err, rows) => {
            if (err) throw err
            console.log(email);
            callback(rows)
        })
    }
    static findbyid(id, callback) {
        database.query("SELECT * FROM message WHERE id = ?", [id], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static findbyiduser(iduser, callback) {
        database.query("SELECT * FROM message WHERE iduser = ?", [iduser], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static findall(callback) {
        database.query("SELECT * FROM message", (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static delete(id, callback) {
        database.query("DELETE FROM message WHERE id = ?", [id], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static update(id, message, callback) {
        database.query("UPDATE message SET message = ? WHERE id = ?", [message, id], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
}

module.exports = Message;