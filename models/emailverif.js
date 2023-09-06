let database = require('../config/database')

class Emailverif {
    constructor(d) {
        if (d == null) {
            this._id = null
            this._email = null
            this._code = null
            this._created = null
            this._modified = null
        } else {
            this._id = d.id
            this._email = d.email
            this._code = d.code
            this._created = d.created
            this._modified = d.modified
        }
    }
    get id() {
        return this._id
    }
    get email() {
        return this._email
    }
    get code() {
        return this._code
    }
    get created() {
        return this._created
    }
    get modified() {
        return this._modified
    }
    set email(email) {
        this._email = email
    }
    set code(code) {
        this._code = code
    }
    static create(iduser, code, callback) {
        database.query("INSERT INTO email_code (user_id,code) VALUES (?,?)", [iduser, code], (err, result) => {
            if (err) throw err
            callback(result)
        })
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
    static findbyemail(email, callback) {
        database.query("SELECT * FROM email_code JOIN user ON user.id = email_code.user_id WHERE email = ?", [email], (err, result) => {
            if (err) throw err
            callback(result)
        })
    }
    static delete(email, callback) {
        database.query("DELETE FROM emailverif WHERE email = ?", [email], (err, result) => {
            if (err) throw err
            callback(result)
        })
    }
}
module.exports = Emailverif