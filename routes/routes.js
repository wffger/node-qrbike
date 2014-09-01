var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var upload = require('config/upload');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
module.exports = function(app) {

/*  app.get('/', function(req, res) {
    res.end("This is the QRBike Server for GDUFS.\n Created by wffger.");
  });*/
  app.all('/', function(req, res) {
      res.render('index.html');
  });

  app.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    login.login(email,password,function (found) {
      console.log(found);
      res.json(found);
  });
  });
  app.post('/register',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    register.register(email,password,function (found) {
      console.log(found);
      res.json(found);
  });
  });
  app.post('/api/chgpass', function(req, res) {
    var id = req.body.id;
    var opass = req.body.oldpass;
    var npass = req.body.newpass;
    chgpass.cpass(id,opass,npass,function (found){
      console.log(found);
      res.json(found);
  });
  });
  app.post('/api/resetpass', function (req, res) {
    var email = req.body.email;
    chgpass.respass_init(email,function (found){
      console.log(found);
      res.json(found);
  });
  });
  app.post('/api/resetpass/chg', function (req, res) {
    var email = req.body.email;
    var code = req.body.code;
    var npass = req.body.newpass;
    chgpass.respass_chg(email,code,npass,function (found){
      console.log(found);
      res.json(found);
  });
  });

  // Web端上传单车信息
    app.post('/api/upload', multipartMiddleware, function (req, res){
      var bikeInfo = req.body;
      var image = req.files.file;
      if(image.size/1024/1024>2) {
        res.send("上传的图片不能大于2M");
      }else {
        upload.upload(bikeInfo, image, function (found){
        console.log(found);
        res.json(found);
      });
      }

      // console.log(req.body);
      // res.send(req.body);
  });

/*  app.post('/upload', function(req, res) {
    var fs = require('fs');
    var bike = mongoose.model('bike',schema);
    bike.image.data=fs.fs.readFileSync(req.files.file.path, 'utf8');
    res.end(req.param(name));
    console.log(req.body.name);
    fs.readFile(req.files.file.path, 'utf8', function(err, data) {
      if (err) return res.json(err);
      // split file into array of non-empty Strings
      var posts = data.split(/\r\n?|\n/).filter(isNotEmpty);

      // insert posts into mysql db
      addPosts(posts, function(err, result) {
        if (err) return res.json(err);
        var msg = 'Added ' + result.affectedRows + ' rows.';

        // display all posts
        getPosts(function(err, posts) {
          if (err) return res.json(err);
          res.render('index.html', {
            posts: posts,
            msg: msg
          });
        });
      });
    });

  });*/
};