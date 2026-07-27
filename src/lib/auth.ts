import jwt from "jsonwebtoken";

const SECRET ='4c4f0d3b0e5a0d8b7e4f2c1a9d6e8f1c'!;
console.log("SECRET", SECRET);

export interface JwtPayload {
  username: string;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as JwtPayload;
}
