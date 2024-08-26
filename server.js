const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoute.js');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("Server is running on port 3000");
    });
};

startServer();