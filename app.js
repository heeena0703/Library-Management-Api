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

// Apply authentication middleware globally, but skip Swagger endpoints
// so the Swagger UI assets and JSON are served without auth redirects
app.use((req, res, next) => {
	if (req.path === '/docs' || req.path.startsWith('/docs') || req.path === '/docs.json') {
		return next();
	}
	return authMiddleware(req, res, next);
});

// Protected routes
app.use('/users', usersRouter);
app.use('/books' , bookRouter);
app.use('/authors' , authorRouter);
app.use('/borrowers' , borrowerRouter);

// error handler

app.use(errorMiddleware)

// Do NOT call app.listen() when deploying to Vercel serverless functions.
// Vercel will invoke the exported app. Calling listen() can cause binding issues
// and incorrect responses (MIME/content problems) for static asset requests.
module.exports = app;

// If this file is run directly (node app.js), start the server for local dev.
// When deployed on Vercel, the platform will `require` this module and handle
// the HTTP invocation, so `listen` should not be called there.
if (require.main === module) {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
}

