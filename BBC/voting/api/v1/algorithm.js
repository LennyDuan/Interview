// Calculate CountMeUp Algorithoms
var countMeUp = function (req, res, next) {
    res.status(200);
    res.send(req.params);
};
exports.countMeUp = countMeUp;
