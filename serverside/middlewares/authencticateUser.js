import jwt from "jsonwebtoken";
export const authenticateUser = async (req, res, next) => {

  //console.log("headers", req.headers)
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: " Unauthorized process" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized , no decoded" });
    }
      res.json({ user:decoded });
    } catch (error) {
     res.status(500).json({message:"cannot check user status"})
    }
  };