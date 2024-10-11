import passport from 'passport';

export const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Erro na autenticação do token' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
