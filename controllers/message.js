const Message = require("../models/message");

exports.getmessage = async (req, res) => {
  try {
    User.findall(function (messages) {
      res.status(200).json(messages);
    });
  } catch {
    console.log("d");
  }
};

exports.createmessage = async (req, res) => {
  const messageuser = req.body;
  try {
    Message.create(
      
         messageuser.firstname,
         messageuser.lastname, messageuser.email,
         messageuser.message,
      
       (result) =>{
        Message.sendVerificationEmail(messageuser.email,messageuser.message,(result)=>{
            console.log('sent')
            res.status(206).json(result)
        })
        res.status(203).json()
      }
    );
    res.status(432).json(result)
  } catch(error) {
    res.status(409).json({ message: error.message });
  }
};
