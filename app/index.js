'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname+ '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkers', function(req, res){
  res.render('checkers');
});

app.get('/add/:x/:y/:i/:j', function(req,res){
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.i *= 1;
  req.params.j *= 1;

  console.log(req.params, req.query);
  req.params.fontsize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.borderwidth = req.query.borderwidth;

  res.render('sum', req.params);
});

app.get('/sumlist/:nums', function(req, res){
  var nums = req.params.nums.split(',');

  nums = nums.map(function(n){
    return n * 1;
  });

  var sum = 0;
  for(var i = 0; i < nums.length; i++){
    sum += nums[i];
  }

  res.render('sumlist', {nums:nums, sum:sum, evenColor:req.query.even, oddColor:req.query.odd});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT',port);
});
