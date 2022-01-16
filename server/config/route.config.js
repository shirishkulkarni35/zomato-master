import JwtPassport from 'passport-jwt';

// Database model
import {UserModel} from '../database/allModels';

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoAPP",
};

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async(jwt__payload, done) => {
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null,false);
                return done(null, doesUserExist);
            }catch(error){
                throw new Error(error);
            }
        })
    )
}
