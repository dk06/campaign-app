var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'campaign-app')));

app.use(function (req, res, next) {

    let reqUrl = req.originalUrl;
    reqUrl = reqUrl.split("?")[0];

    if (reqUrl == '/api/login') {
          return next();
      }

    var token = req.query.token || req.body.params.acess.token;
    
    if (token) {
      if (req.query.token) {
        delete req.query.token;
      }
      else if(req.body.params.acess.token){
        delete req.body.params.acess;
      }
        next();
    } else {
        return res.json({
          data : [],
          status: false,
          errorCode: 401,
          message: "token not available"
        });
    }
})

//app.use('/', require('./routes/index'));
app.use('/api', require('./routes/apiLogin'));
app.use('/api', require('./routes/apiCampaign'));
app.use('/api', require('./routes/apiAudienceSegement'));
app.use('/api', require('./routes/apiChannel'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 8081;
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

module.exports = app;
