exports.isAuth = (req, res, next) => {
  if (req.session.isAuth === true) next();
  else res.status(401).end();
};

exports.isStaff = (req, res, next) => {
  if (req.session.user) {
    if (
      req.session.user.userRole === 'staff' ||
      req.session.user.userRole === 'admin'
    )
      next();
    else res.status(401).end();
  } else res.status(401).end();
};

exports.isAdmin = (req, res, next) => {
  console.log(req.session);
  if (req.session.user) {
    if (req.session.user.userRole === 'admin') next();
    else res.status(405).end();
  } else res.status(401).end();
};
