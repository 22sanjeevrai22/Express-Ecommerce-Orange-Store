const auth = (req, res, next) => {
  console.log("This is auth middleware");
  next();
};

export default auth;
