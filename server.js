const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const albumRoutes = require('./routes/albumRoutes.js');
const songRoutes = require('./routes/songRoutes.js');
const cors = require('cors'); // Import cors

require('dotenv').config();

const app = express();

// Enable CORS for all origins
app.use(cors());

connectDB();
app.use(express.static('./'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/songs', songRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello World from Nobility" });
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
