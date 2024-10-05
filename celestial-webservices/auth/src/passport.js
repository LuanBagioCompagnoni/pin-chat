import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserService from './services/UserService.js';
import { TokenError } from 'ErrorHandler-Package';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await UserService.findByEmail(jwt_payload.user.email);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch {
        return done(new TokenError('Erro na autenticação do token'));
    }
}));

export default passport;
