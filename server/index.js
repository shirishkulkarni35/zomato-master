import {UserModel, ImageModel, ReviewModel, } from "./database/allModels";
// MAIN BACKEND FILE

// const db = require("./databases");
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

require('dotenv').config();
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import express from "express";


//Database Connection
import ConnectDB from "./database/connection";
// google authentication config
import googleAuthConfig from './config/google.config';

// private route authentication config
import privateRouteConfig from "./config/route.config";


// API
import Auth from './API/Auth';
import Restaurant from './API/Restaurant';
import Food from './API/Food';
import Menu from './API/Menu';
import Image from './API/Image';
import Order from './API/Orders';
import Review from './API/Reviews';
import User from './API/User';

// passport configuration
googleAuthConfig(passport);
privateRouteConfig(passport);

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());
// zomato.use(passport.session());


// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use('/image',Image)
zomato.use('/order',Order)
zomato.use('/review',Review)
zomato.use('/user',User)

zomato.listen(4000, () => {
    ConnectDB().then(() => {
        console.log("Server is running!!");
    }).catch((error) => {
        console.log("Server is running, but database connection failed...");
        console.log(error)
    })
})

