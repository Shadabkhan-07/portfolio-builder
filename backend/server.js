const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));

const MONGO_URI = "mongodb://pathanshadab829943_db_user:shady0512@ac-ttgnewp-shard-00-00.gejwhk4.mongodb.net:27017,ac-ttgnewp-shard-00-01.gejwhk4.mongodb.net:27017,ac-ttgnewp-shard-00-02.gejwhk4.mongodb.net:27017/portfolio-builder?ssl=true&replicaSet=atlas-bkvv78-shard-0&authSource=admin";

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully!");
    app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => console.log(err));