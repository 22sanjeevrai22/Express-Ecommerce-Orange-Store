import { verifyJWT } from "../utils/jwt.js";
const auth = (req, res, next) => {
  const cookie = req.headers.cookie;
  console.log("This is auth middleware cookie", cookie);
  if (!cookie) res.status(401).json("User not authenticated.");

  const authToken = cookie.split("=")[1];

  verifyJWT(authToken)
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((error) => {
      res.status(400).send("Invalid Token");
      console.log("Invalid Token in Auth Middleware", error);
    });
};

export default auth;
