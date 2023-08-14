const authorize = (req, res, next) => {
    console.log('auth');
    const { user } = req.query;
    if (user === 'admin') {
        req.user = { name: 'admin', id: '1' };
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = authorize;
