let express = require('express');
let app = express();
let my = require('./config/database');
let user = require('./routes/user');
let session = require('express-session')
const cors = require('cors');
const verif = require('./routes/email')
//ajout moteur de template
app.use(cors());
app.use(express.urlencoded())
app.use(express.json())
app.use(session({
    secret: 'evzcbeucjbu',
    resave: false,
    saveUninitialized:true,
    cookie: {secure:false,
        expires: new Date('2023-12-31')
    },
}))
app.get('/',(req,res)=>{
    res.render('index')
}
)
app.use('/verif',verif)
app.use('/user',user)
app.listen(3003)