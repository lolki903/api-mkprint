const config  = require('../config/database')  // Import the config module

// Define the Emailverif class
class Emailverif {
    constructor(d) {
        if (d == null) {
            this._id = null  // Initialize the id property to null
            this._email = null  // Initialize the email property to null
            this._code = null  // Initialize the code property to null
            this._created = null  // Initialize the created property to null
            this._modified = null  // Initialize the modified property to null
        } else {
            this._id = d.id  // Set the id property to the value from the data object
            this._email = d.email  // Set the email property to the value from the data object
            this._code = d.code  // Set the code property to the value from the data object
            this._created = d.created  // Set the created property to the value from the data object
            this._modified = d.modified  // Set the modified property to the value from the data object
        }
    }
    get id() {
        return this._id  // Return the id property
    }
    get email() {
        return this._email  // Return the email property
    }
    get code() {
        return this._code  // Return the code property
    }
    get created() {
        return this._created  // Return the created property
    }
    get modified() {
        return this._modified  // Return the modified property
    }
    set email(email) {
        this._email = email  // Set the email property
    }
    set code(code) {
        this._code = code  // Set the code property
    }
    static async create(iduser, code) {
        const { data, error } = await config.connection.from('email_code').insert([{ user_id: iduser, code: code }])  // Insert a new record into the email_code table with the provided user_id and code
        if (error) throw error  // Throw an error if there is an error
        return data  // Return the inserted data
    }
    static makeid(length) { 
        let verificationCode = "";  // Initialize the verificationCode variable
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";  // Define the characters that can be used in the verification code
        const charactersLength = characters.length;  // Get the length of the characters
        let counter = 0;  // Initialize the counter variable
        while (counter < length) {
            verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));  // Add a random character from the characters string to the verificationCode
            counter += 1;  // Increment the counter
        }
        return verificationCode;  // Return the generated verification code
    }
    static async findbyemail(email) {
        const { data, error } = await config.connection
            .from('user')
            .select('*')
            .eq('email', email)  // Select all columns from the user table where the email is equal to the provided email
        console.log(data);  // Log the retrieved data
        
        if (error) throw error  // Throw an error if there is an error
        return data[0]  // Return the first row of the retrieved data
    }
    static async delete(id) {
        const { data, error } = await config.connection
            .from('email_code')
            .delete()
            .eq('user_id', id)  // Delete records from the email_code table where the user_id is equal to the provided id
        if (error) throw error  // Throw an error if there is an error
        return data  // Return the deleted data
    }
    static async getid(id) {
        const { data, error } = await config.connection
            .from('email_code')
            .select('*')
            .eq('user_id', id)  // Select all columns from the email_code table where the user_id is equal to the provided id
        if (error) throw error  // Throw an error if there is an error
        return data[0]  // Return the first row of the retrieved data
    }
}

module.exports = Emailverif  // Export the Emailverif class
