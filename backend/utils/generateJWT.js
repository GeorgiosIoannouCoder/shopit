import jwt from "jsonwebtoken";

const generateJWT = (res, userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour.
  });
};

export default generateJWT;
