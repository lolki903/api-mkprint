const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const Emailverif = require('../models/emailverif');

exports.login = async (req, res) => {
    const  password  = req.body.password;
      const user = await User.findOne({email:req.body.email});

  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });
    }

    if (!result) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign({ userId: user.id }, 'secret21345'); 
    res.json({ user,token });
  });
}
exports.validate = async (req, res) => {
    const id = req.body.email;
    try {
       const valid = await Emailverif.findbyemail(id)
       console.log("valid",valid.id);
       if(valid)
       {
          const er = await Emailverif.getid(valid.id)
          if(er.code ==req.body.code)
          {
            
            await User.update(valid.id);
           console.log("exxx",er);
          }
          console.log("er",er);
          res.status(200).json({message:"email verified"})
        }
            
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.deleteUser = async (req, res) => {
  const { id, password } = req.body;

  try {
    // Vérifier l'existence de l'utilisateur
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer le mot de passe fourni avec celui stocké dans la base de données
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });
      }
  
      if (!result) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
    });
    // Supprimer l'utilisateur de la base de données
    await User.deleteOne(user)

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};




// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.verifyemail = async (req, res) => {
  const useremail = req.body.email;
  const code = req.body.code;

  try {
    const verify = await Verif.findOne({ email: useremail, code: code });
    if (!verify) {
      return res.status(404).json({ message: "Invalid verification code" });
    }
    // Ici, vous pouvez ajouter la logique supplémentaire pour valider l'e-mail de l'utilisateur, par exemple, mettre à jour le statut de vérification dans la base de données, activer le compte, etc.
    await User.updateOne({ email: useremail }, { status: "valide" });

    return res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.getUserForemail = async (req, res) => {
//     try {
//         const user = await User.findOne({email:req.body.email});
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }