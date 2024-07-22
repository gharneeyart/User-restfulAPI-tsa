import passport from '../helpers/google.config.js';

export const getHome = (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
};

export const getGoogleAuth = passport.authenticate('google', { scope: ['email', 'profile'] });

export const getGoogleCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/profile');
        });
    })(req, res, next);
};

export const getProfile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`<h1>Hello ${req.user.displayName}</h1><a href="/logout">Logout</a>`);
};

export const getLogout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
};
