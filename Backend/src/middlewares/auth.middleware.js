import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  console.log("Headers recibidos:", req.headers);  // Debugging

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("❌ No se recibió token en la solicitud");
    return res.status(401).json({ message: "No authentication token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; 
  console.log("Token recibido en POST:", token);

  jwt.verify(token, TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log("❌ Token inválido:", error);
      return res.status(401).json({ message: "Token is not valid" });
    }

    console.log("✅ Token válido, usuario:", user);
    req.user = user; // Guardar usuario en la solicitud
    next();
  });
};
