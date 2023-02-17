const logRequest = (req, res, next) => {
    console.log('log req', req.path);
    next();
};

module.exports = logRequest;
