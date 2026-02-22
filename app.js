var express = require('express');
var logger = require('morgan');
var dotenv = require('dotenv');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authRoute');
var connectDB = require('./config/dbConfig');
var authMiddleware = require('./middleware/auth-middleware')
var bookRouter = require('./routes/bookRoute')
var authorRouter = require('./routes/authorRoute')
var borrowerRouter = require('./routes/borrowerRoute')
var helmet = require('helmet')
var errorMiddleware = require('./middleware/error-middleware')
var cors = require('cors')
var swaggerDocs = require('./swagger')

// Load environment variables from .env file
dotenv.config();

//DB Connection
connectDB();

var app = express();

// Midleware setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())

app.use('/auth', authRouter);

// Swagger documentation setup
swaggerDocs(app, process.env.PORT || 3000);

// Apply authentication middleware globally, excluding '/docs'
app.use(authMiddleware);

// Protected routes
app.use('/users', usersRouter);
app.use('/books' , bookRouter);
app.use('/authors' , authorRouter);
app.use('/borrowers' , borrowerRouter);

// error handler
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {console.log(`Server is running on port ${process.env.PORT}`); });

module.exports = app;

