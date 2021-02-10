var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pug = require('pug');
var pgp = require('pg-promise')();

var util = require('./util.js')

//pgp.pg.defaults.ssl = true;
var db = pgp(process.env.DATABASE_URL);

module.exports = {
  database: db
};

async function createQuizTable() {
  await db.none(`CREATE TABLE IF NOT EXISTS quizes(
    quizname TEXT,
    quizid UUID,
    number_of_questions INTEGER,
    quizdata TEXT,
    locked_users TEXT
    );`
  );
}

async function createQuestionsTable() {
  await db.none(`CREATE TABLE IF NOT EXISTS questions(
    questionid UUID,
    prompt TEXT,
    type TEXT,
    options TEXT,
    answer TEXT
  );`)
}

async function createUsersTable() {
  await db.none(`CREATE TABLE IF NOT EXISTS users(
    email TEXT,
    username TEXT,
    fname TEXT,
    lname TEXT,
    encpassword TEXT,
    is_admin BOOLEAN,
    uuid UUID,
    total_score INTEGER,
    quizes_played INTEGER,
    average_score REAL
    );`
  );
}

async function generalMiddlewareAsync(req, res, next) {
  var name = await util['validateUser'](req, res, db);

  req.name = name[0];
  console.log(name);
  req.uuid = name[1];

  next();
}

function generalMiddleware(req, res, next) {
  generalMiddlewareAsync(req, res, next);
}

createQuizTable();
createQuestionsTable();
createUsersTable();

var indexRouter = require('./routes/index.js');
var signinRouter = require('./routes/signin.js');
var signupRouter = require('./routes/signup.js');
var leaderboardsRouter = require('./routes/leaderboards.js');
var usersRouter = require('./routes/users.js');
var takeaquizRouter = require('./routes/takeaquiz.js');
var quizesRouter = require('./routes/quizes.js');
var sitemapRouter = require('./routes/sitemap.js');
var randomQuizRouter = require('./routes/randomquiz.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(generalMiddleware);

app.use('/', indexRouter);
app.use('/', signinRouter);
app.use('/', signupRouter);
app.use('/', leaderboardsRouter);
app.use('/', usersRouter);
app.use('/', takeaquizRouter);
app.use('/', quizesRouter);
app.use('/', sitemapRouter);
app.use('/', randomQuizRouter);

module.exports = {
  database: db,
  app: app
};

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.get('/', function(req, res, next) {
//   res.render('template', { name: 'Express' });
// });

