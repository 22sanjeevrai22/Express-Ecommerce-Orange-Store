import jwt from "jsonwebtoken";

const createJWT = (data) => {
  return jwt.sign(data, process.env.JWT_KEY);
};

const verifyJWT = (authToken) => {
  console.log("jwtt verify");
  const verifyJwtPromise = new Promise((resolve, reject) => {
    jwt.verify(authToken, process.env.JWT_KEY, (error, decodedToken) => {
      if (error) return reject(error);
      resolve(decodedToken);
    });
  });

  return verifyJwtPromise;
};

export { createJWT, verifyJWT };
