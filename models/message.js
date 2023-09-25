let database = require('../config/database')  // Import the database module
let axios = require('axios')  // Import the axios module

// Define the Message class
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
            this._id = d.id  // Set the id property to the provided id
            this._message = d.message  // Set the message property to the provided message
            this._created = d.created  // Set the created property to the provided created
            this._modified = d.modified  // Set the modified property to the provided modified
            this._lastname= d.lastname  // Set the lastname property to the provided lastname
            this._firstname= d.firstname  // Set the firstname property to the provided firstname
            this._email= d.email  // Set the email property to the provided email
        }
    }
    get id() {
        return this._id  // Return the id property
    }
    get message() {
        return this._message  // Return the message property
    }
    get created() {
        return this._created  // Return the created property
    }
    get modified() {
        return this._modified  // Return the modified property
    }
    get lastname() {
        return this._lastname  // Return the lastname property
    }
    get firstname() {
        return this._firstname  // Return the firstname property
    }
    get email() {
        return this._email  // Return the email property
    }
    set message(message) {
        this._message = message  // Set the message property to the provided message
    }
    set lastname(lastname) {
        this._lastname = lastname  // Set the lastname property to the provided lastname
    }
    set firstname(firstname) {
        this._firstname = firstname  // Set the firstname property to the provided firstname
    }
    set email(email) {
        this._email = email  // Set the email property to the provided email
    }
    set modified(modified) {
        this._modified = modified  // Set the modified property to the provided modified
    }
    set created(created) {
        this._created = created  // Set the created property to the provided created
    }
    set id(id) {
        this._id = id  // Set the id property to the provided id
    }
    static sendVerificationEmail = async (email, verificationCode) => {
        const apiKey =
          "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";  // Set the apiKey to the provided SendGrid API key
        const senderEmail = "jeanfreza428@gmail.com";  // Set the senderEmail to the provided sender email
        const sendGridUrl = "https://api.sendgrid.com/v3/mail/send";  // Set the sendGridUrl to the SendGrid API endpoint

        const data = {
          personalizations: [
            {
              to: [{ email }],  // Set the recipient email to the provided email
              subject: "Account Verification",  // Set the email subject
            },
          ],
          from: {
            email: senderEmail,  // Set the sender email
          },
          content: [
            {
              type: "text/plain",
              value: `Le message envoyé ${verificationCode}`,  // Set the email content
            },
          ],
        };

        try {
          await axios.post(sendGridUrl, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,  // Set the authorization header with the API key
            },
          });

          console.log("Verification email sent successfully");  // Log a success message
        } catch (error) {
          console.error("Failed to send verification email", error);  // Log an error message if sending the email fails
        }
    };

    static create(lastname, firstname, email, message, callback) {
        //insert in database request suppabase
        database.query("INSERT INTO message (lastname, firstname, email, message) VALUES (?, ?, ?, ?)", [lastname, firstname, email, message], (err, rows) => {
            if (err) throw err
            console.log(email);  // Log the email
            callback(rows)
        })
    }
    static findbyid(id, callback) {
        //select in database request suppabase
        database.query("SELECT * FROM message WHERE id = ?", [id], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static findbyiduser(iduser, callback) {
        //select in database request suppabase
        database.query("SELECT * FROM message WHERE iduser = ?", [iduser], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static findall(callback) {
        //select in database request suppabase
        database.query("SELECT * FROM message", (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static delete(id, callback) {
        //delete in database request suppabase
        database.query("DELETE FROM message WHERE id = ?", [id], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
    static update(id, message, callback) {
        //update in database request suppabase
        database.query("UPDATE message SET message = ? WHERE id = ?", [message, id], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
    }
}

module.exports = Message;