require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');

// const authRoutes = require('./routes/auth');
// const patientRoutes = require('./routes/patients');
// const doctorRoutes = require('./routes/doctors');
// const appointmentRoutes = require('./routes/appointments');
// const labRoutes = require('./routes/labs');
// const prescriptionRoutes = require('./routes/prescriptions');
// const { authenticateJWT } = require('./middlewares/auth');
// const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares

const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes that don't need authentication
//app.use('/api/auth', authRoutes);

// JWT Authentication middleware for protected routes
//app.use(authenticateJWT);

// Protected API routes
// app.use('/api/patients', patientRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/labs', labRoutes);
// app.use('/api/prescriptions', prescriptionRoutes);

app.use('/', (_, res) => {
    res.send('Hello!');
})

// 404 handler
app.use((_, res, next) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
//app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare';

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');

        // Create HTTP server for Socket.io
        const server = http.createServer(app);

        // Initialize Socket.io instance
        const io = new Server(server, {
            cors: {
                origin: function (origin, callback) {
                    if (!origin) return callback(null, true);
                    if (allowedOrigins.indexOf(origin) === -1) {
                        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                        return callback(new Error(msg), false);
                    }
                    return callback(null, true);
                },
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });

        // Basic Socket.io event example
        io.on('connection', (socket) => {
            console.log('New WebSocket connection:', socket.id);

            socket.on('joinRoom', (room) => {
                socket.join(room);
                console.log(`${socket.id} joined room ${room}`);
            });

            socket.on('sendMessage', (message) => {
                io.to(message.room).emit('receiveMessage', message);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected:', socket.id);
            });
        });

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });
