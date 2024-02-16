require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
require("./DB/conn");
const PORT = 6005;


const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const userdb = require("./model/userSchema");

const clientid = "934892637018-7fs0ggmv5spkd0j8a7jb5ldf68inendn.apps.googleusercontent.com";
const clientsecret = "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";


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

//setup session generates encrypted id

app.use(session({
    secret:"hypertension1234",
    resave:false,
    saveUninitialized:true
}))
// initializing passport

app.use(passport.initialize());
app.use(passport.session());

//using passport intializer for adding user info
passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google oauth login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})