// import jwt from "jsonwebtoken";

// export function createToken(id) {
//   return jwt.sign(
//     { id }, // ✅ consistent with decoded.id
//     process.env.JWT_SECRET,
//     { expiresIn: "5d" }
//   );
// }

// export function verifyToken(token) {
//   return jwt.verify(token, process.env.JWT_SECRET);
// }

import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name   // 🔥 ADD THIS
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
