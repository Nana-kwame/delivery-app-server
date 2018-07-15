var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose'); //mongoose for mognodb
var bodyParser = require('body-parser');
var router = express.Router();
var mongoOp = require("./models/mongo");
var restuarant = require("./models/restuarants")





app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": false
}));
app.use(function (req, res, next) {

  res.header("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


router.get("/", function (req, res) {
  res.json({
    "error": false,
    "message": "Hello World!"
  });
});


router.route("/orders")
  .get(function (req, res) {
    var response = {};
    mongoOp.find({}, function (err, data) {

      if (err) {
        response = {
          "error": true,
          "message": "Error fethcing data"
        };
      } else {
        response = {
          "error": true,
          "message": data
        };
      }
      res.json(response);
    })
  })


  .post(function (req, res) {
    var db = new mongoOp();
    var response = {};

    db.userName = req.body.userName;
    db.phoneNumber = req.body.phoneNumber;
    db.restuarant = req.body.restuarant;
    db.order = req.body.order;
    db.latitude = req.body.latitude;
    db.longitude = req.body.longitude;
    db.status = req.body.status
    db.save(function (err) {

      if (err) {
        response = {
          "error": true,
          "message": "Error adding data"
        };
      } else {
        response = {
          "error": false,
          "message": "Data added"
        };
      }
      res.json(response);
    })
  })

// router.route("/restuarants")
//     .get(function (req, res) {
//         var response = {};

//         restuarant.find({}, function (err, data) {
//             if (err) {
//                 response = { "error": true, "message": err };

//             } else {
//                 response = { "error": false, "message": data };
//             }
//             res.json(response);
//         })
//     })

app.use("/", router);

app.get('/restuarants', (req, res, next) => {
  var response = {};

  restuarant.find({}, function (err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fethcing data"
      };
      console.log(err);
    } else {
      response = {
        "error": false,
        "message": data
      };
    }
    res.json(response);
    console.log(response)
  })
})

app.post('/restuarants', (req, res, next) => {
  var db = new restuarant();
  var response = {};

  db.name = req.body.name;
  db.location = req.body.location;
  db.menu = req.body.menu;
  db.save(function (err) {

    if (err) {
      response = {
        "error": true,
        "message": "Error adding data"
      };
    } else {
      response = {
        "error": false,
        "message": "Data added"
      };
    }
    res.json(response);
  })
})


app.get('/restuarant/:name', (req, res, next) => {
  restuarant.find({
      name: req.params.name
    }).select("menu")
    .exec((err, menu) => {
      if (err) {
        return next(err)
      }
      if (!menu) {
        res.json({success: false, message:"no menu for the restuarant"})
      }else{
          res.json({success: true, message: menu});
      }
    })

})

app.get("/orders/:phoneNumber",(req,res,next) => {
  var response = {};

  mongoOp.find({phoneNumber:req.params.phoneNumber}).select("userName phoneNUmber order restuarant status")
  .exec((err, orders) => {
    if(err){
      return next(err)
    }if(!order){
      res.json({success:false, message:"No orders ahve been made by this user recently"})
    }else {
      res.json({success:true, message: orders})
    }
  })
})

app.listen(process.env.PORT|| 4040)
console.log("App is listening on port 4040");
