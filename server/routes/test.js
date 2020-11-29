const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  console.log("socket.address : ");
  console.log(req.socket.address());
  console.log("baseUrl : " + req.baseUrl);
  console.log("hostname : " + req.hostname);
  console.log("originalUrl : " + req.originalUrl);
  console.log("path : " + req.path);
  console.log("route : ");
  console.log(req.route);
  console.log("socket.localPort: " + req.socket.localPort);
  console.log("socket.localPort: " + req.socket.remotePort);
  res.send("OK");
});

function isAuthenticated (req, res, next) {

  if(req.user)
     return next();
  else
     return res.status(401).json({
       error: 'User not authenticated'
    })

}

router.get('/simple', function(req, res){
  if(req.isAuthenticated()) {
    console.log("User is auth - simple!");
    res.send("OK");
  }
  else {
    console.log("User is NOT auth - simple!");
    res.send("NOT OK");
  }
});


router.get('/checkauth', isAuthenticated, function(req, res){

   res.status(200).json({
       status: 'Login successful!'
   });
});

module.exports = router;
