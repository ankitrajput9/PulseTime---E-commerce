import dotenv from 'dotenv';
import passport from 'passport';
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "../models/user.model.js"


// import GoogleStrategy from "passport-google-oauth20"
// GoogleStrategy.Strategy ;

export const GoogleStrategies = () => {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/callback/google"
    },
        async (accessToken, refereshToken, profile, cb) => {
            try {
                let email = profile.emails[0].value;
                let name = profile.givenName
                const existinguser = await userModel.findOne({ email })
                if (existinguser) return cb(null, existinguser)


                const newUser = await userModel.create({
                    email,
                    userName: name,
                    password: "123456456",
                    google_id: profile._id
                })

                cb(null, newUser)

            } catch (error) {
                console.log("error in google stratiges", error)
            }

        }
    ))

}