const errors = require("restify-errors");

const jwt = require('jsonwebtoken');
const db = require("../modules/db");
const config = require("../config");
const mailer = require("../mailer");

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;


module.exports = (app, session) => {

  /// Passport Settings

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(db.User.createStrategy());

  passport.serializeUser(db.User.serializeUser());
  passport.deserializeUser(db.User.deserializeUser());

  // passport.deserializeUser((id, done) => {
  //   db.User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });


  // passport.serializeUser((user, done) => {
  //   console.log('serializing user: ');
  //   console.log(user);
  //   done(null, user._id);
  // });
  
  // passport.deserializeUser((user, cb) => {
  //   db.User.findOne({_id: user}, '-password -salt', function(err, user) {

  //     console.log("deser: ");
  //     console.log(err);

  //     cb(err, user);
  //   });
  // });


  /// -------------------------  GOOGLE   ------------------------

  passport.use( new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CID,
      clientSecret: process.env.GOOGLE_CSECRET,
      callbackURL: "/auth/google/callback"
    },

    (accessToken, refreshToken, profile, cb) => {
      console.log("returned profile:");
      console.log(profile);

      db.User.findOrCreate({provider:'google', providerId: profile.id},
        { source: config.APP_Name,
          username: profile.emails[0].value,
          fName: profile.name.givenName,
          lName: profile.name.familyName,
          picture:profile.photos[0].value
        },
        (err, user) => { return cb(err, user) }
      )
      
      // user = { ...profile };



      // const {token, iat, exp} = getJWToken(user);

      // const userSession = new db.UserSession({
      //   userId: user._id,
      //   token, iat, exp
      // });

      // try {
      //   const newUS = await userSession.save();
      //   let {fName, lName, username} = req.user;
      //   res.status(200).send({fName, lName, email: username, token, iat, exp});
      // } catch (err) {
      //   return next(new errors.InternalError(err.message));
      // }




      // console.log(chalk.red(user.email));
      // return cb(null, profile);
    }
  ));

  app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  app.get("/auth/google/callback", passport.authenticate("google", {failureRedirect:"/login"}),
    (req, res) => {
      //successful authentication
      res.status(200).send({
        success:true,
        message: "User successfuly logged in",
        user:req.user
      });
    }
  );



  /// -------------------------  FACEBOOK   ------------------------

  passport.use( new FacebookStrategy(
      {
        clientID: config.FACEBOOK.clientID,
        clientSecret: config.FACEBOOK.clientSecret,
        callbackURL: "/auth/facebook/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
      }
    )
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get("/auth/facebook/callback", passport.authenticate("facebook"),
    (req, res) => res.redirect("/profile")
  );
  
  
  /// -----------------------------------------------------------

  function isAuthenticated(req, res, next) {
    console.log(req.session);

    if(req.user)
      return next();
    else
      return res.status(401).json({
        error: 'User not authenticated'
      })

  }

  function getJWToken(user) {
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: config.JWT_TOKEN_EXP + "h"
    });

    const {iat, exp} = jwt.decode(token); 

    return {token, iat, exp};
  }


  /// ------------------------   ROUTES   -------------------------


  app.post("/auth/register", async(req, res, next) => {
    db.User.register(
      {username: req.body.email},
      req.body.password, 
      function(err, user) {
        if (err) {
          console.log(err); res.send(err);;
        } else {
          console.log("Auth");
          passport.authenticate("local")(req, res, () => { 
            // res.locals.currentUser = req.user;
            res.sendStatus(201);
            next();
          });
        }
    });
  
  });
 
  
  app.post("/register", (req, res, next) => {
    const {fName, lName, username, password} = req.body;

    db.User.findOne({username}, async (err, foundUser) => {
      if (err) {
        console.log("Auth-Register: " + err);
      } else {

        db.User.register({username, fName, lName, source: config.APP_Name}, password, async (err, user) => {
          if (err) {
            res.send({customError: err.message});
          } else {
            user.fName = fName;
            user.lName = lName;
            const newUser = await user.save();


            jwt.sign({user: newUser._id}, process.env.EMAIL_SECRET, {expiresIn: '1d'},
              (err, emailToken) => {

                const url = `http://${req.hostname}:${config.PORT}/confirmation/${emailToken}`;
                
                let email = {
                  from: '"Info" <info@centrum.cz>',
                  to: "libor@seznam.cz",
                  subject: 'Confirm Email',
                  html: `Please click this <a href="${url}">LINK</a> to confirm your new account on <b>Lost and Found</b> Portal...`
                };

                mailer.sendMail(email)
                .then((info) => {
                  res.status(200).send({message: "Please confirm your account by clicking the link in your email."});
                })
                .catch(err => {
                  console.log("Error - Sending email: " + err);
                  res.status(200).send({error: err});                  
                });
              },
            );

            // passport.authenticate("local")(req, res, () => { 
            //   res.locals.currentUser = req.user;
            //   res.sendStatus(201);
            // });
          }
        });
      

      }
    });
  });  


  app.get("/user/test", (req, res) => {
    console.log("req.session:");
    console.log(req.session);
    res.send({message: "All went ok!"});
  })
  
  
  app.post("/login", (req, res) => {

    const user = new db.User({
      username: req.body.username,
      password: req.body.password
    });

    req.login(user, err => {
      if (!err) { 
        passport.authenticate("local") (req, res, async () => {

          if(req.user.isActive) {

            const {token, iat, exp} = getJWToken(req.user);
  
            const userSession = new db.UserSession({
              user_id: req.user._id,
              token, iat, exp
            });
  
            try {
              const newUS = await userSession.save();

              req.session.user_id = req.user._id;
              req.session.user_email = req.user.username;

              let {fName, lName, username} = req.user;
              res.status(200).send({fName, lName, email: username, token, iat, exp});

            } catch (err) {
              return next(new errors.InternalError(err.message));
            }

          }
          else
            res.status(401).send({message:"Your account is NOT active - You need to first confirm your account by the Confirmation Email or contact Application admin."});
        });
      }
    });

  });



  app.get('/confirmation/:token', async (req, res) => {

    jwt.verify(req.params.token, process.env.EMAIL_SECRET, async (err, decoded) => {
      if(err) throw err;

      let _id = decoded.user;

      db.User.findOneAndUpdate({ _id }, { $set: {isActive: true} }, {new: true}, (err, doc) => {
        if(err) console.log(err);

        if(doc) {
          res.send("User " + doc.username + " has been activated!");
        // return res.redirect('http://localhost:3001/login');
        }
    });


    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.user_id = null;
    req.session.user_email = null;
    res.send({ message: "Logged out" });
  })

}