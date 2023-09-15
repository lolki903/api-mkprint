const config  = require('../config/database')

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
    static async create(iduser, code) {
        const { data, error } = await config.connection.from('email_code').insert([{ user_id: iduser, code: code }])
        if (error) throw error
        return data
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
    static async findbyemail(email) {
        const { data, error } = await config.connection
            .from('user')
            .select('*')
            .eq('email', email)
            console.log(data);
        
        if (error) throw error
        return data[0]
        // console.log(data);
        // if (error) throw error;
        // return data;
    }
    static async delete(id) {
        const { data, error } = await config.connection
            .from('email_code')
            .delete()
            .eq('user_id', id)
        if (error) throw error
        return data
    }
    static async getid(id) {
        const { data, error } = await config.connection
            .from('email_code')
            .select('*')
            .eq('user_id', id)
        if (error) throw error
        return data[0]
    }
}
module.exports = Emailverif