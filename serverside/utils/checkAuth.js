import pool from "../config/db.js";
import jwt from "jsonwebtoken";

// this function will recieve the request coming from useAuth it will verify if the request header has a token or not.
// if not it will return an unauthorized response because the user is not authorized.
// if yes it will try to decrypt the token on line 13, if the token was not decrypted correctly that means its a invalid token
// and will return unauthorized
// if decrypted correctly we will get the userid from the token and with the id we will send a request to the database
// to get all of that users data, on line 17 and 18
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized process" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const q =
      "SELECT email, first_name, last_name, phone, id, status, role FROM users where id = ?";
    const fin = await pool.query(q, [decoded.id]);
    if (!fin) {
      return res
        .status(401)
        .json({ message: "Unauthorized , no user in db like this" });
    }

    const user = fin[0][0];
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized step" });
  }
};
