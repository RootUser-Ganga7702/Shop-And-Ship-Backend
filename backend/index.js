const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require("cors");
// const http = require('http');
// const { setupSocket } = require("./middleware/socketHandler");
// const server = http.createServer(app);
// setupSocket(server);

const mainRoute = require('./routes/route');
const allUserRoutes = require('./routes/allUsersRoutes');


// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: "*", // Change this if fronte
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use('/', mainRoute);
app.use('/allUsers', allUserRoutes);


// Start the server
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
