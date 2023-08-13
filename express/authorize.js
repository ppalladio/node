const authorize = (req, res, next) => {
    console.log('auth');
    next();
};

module.exports = authorize;
