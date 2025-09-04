const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require("cors");
// const http = require('http');
// const { setupSocket } = require("./middleware/socketHandler");
// const server = http.createServer(app);
// setupSocket(server);

const mainRoute = require('./routes/route');

const allUsersRoutes = require('./routes/allUsersRoutes');
const ordersReciveRoutes = require('./routes/orderReciveRoutes');


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


// All user routes
app.use('/api/users', allUsersRoutes);
app.use('/api/orders', ordersReciveRoutes);

// Start the server
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
