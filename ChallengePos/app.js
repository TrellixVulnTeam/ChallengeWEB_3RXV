var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pos',
  password: '1234',
  port: '5432'
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var barangRouter = require('./routes/barang');
var satuanRouter = require('./routes/satuan');
var supplierRouter = require('./routes/supplier');
var varianRouter = require('./routes/varian');
var gudangRouter = require('./routes/gudang_barang');
var pembelianRouter = require('./routes/pembelian_barang');
var pembeliandetailRouter = require('./routes/pembelian_detail');
var penjualanRouter = require('./routes/penjualan_barang');
var penjualandetailRouter = require('./routes/penjualan_detail');

var app = express();

//Public engine setup
app.use('/public', express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/barang', barangRouter);
app.use('/satuan', satuanRouter);
app.use('/supplier', supplierRouter);
app.use('/varian', varianRouter);
app.use('/gudang', gudangRouter);
app.use('/pembelian', pembelianRouter);
app.use('/pembelian_router', pembeliandetailRouter);
app.use('/penjualan', penjualanRouter);
app.use('/penjualan_router', penjualandetailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
