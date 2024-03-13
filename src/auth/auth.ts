import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const privateKey = process.env.PRIVATE_KEY || "";
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(' ')[1];
  jwt.verify(token, privateKey, (error, decoded) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
      return res.status(401).json({ message, data: error });
    }

    const decodedToken = decoded as JwtPayload;
    if (typeof decodedToken !== 'string' && decodedToken.userId) {
      if (req.body.userId && req.body.userId !== decodedToken.userId) {
        const message = `L'identifiant de l'utilisateur est invalide.`;
        return res.status(401).json({ message });
      } else {
        next();
      }
    } else {
      return res.status(401).json({ message: "Token invalide" });
    }
  });
};
