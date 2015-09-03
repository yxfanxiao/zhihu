// ErrorPage middleware
exports.errorPage = function (req, res, next) {

  res.render404 = function (error) {
    return res.status(404).render('404', { err: error });
  };

  next();
};
