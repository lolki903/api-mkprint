const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const moogose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const realisation = require('./routes/newsletter');
const uri = "mongodb+srv://juzerloky:lolki9030@cluster0.t1gr7go.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 3003;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
moogose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = moogose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});
app.use('/realisation', realisation);
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})