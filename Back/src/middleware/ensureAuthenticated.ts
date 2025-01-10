import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
            };
        }
    }
}
interface IPayload {
    sub: string;
    email: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Receber token
    const authToken = request.headers.authorization;

    // Validar se o token está preenchido
    if (!authToken) {
        return response.status(401).json({ message: "Token não fornecido." });
    }

    // Extrair o token do cabeçalho
    const parts = authToken.split(" ");
    
    // Verificar se o cabeçalho está no formato correto
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return response.status(401).json({ message: "Token mal formado." });
    }

    const token = parts[1];

    // Log do token recebido
    console.log("Token recebido:", token);

    try {
        // Validar se o token é válido
        const { sub, email } = verify(token, "segredo") as IPayload;

        // Log dos dados decodificados
        console.log("Token válido. Dados decodificados:", { sub, email });

        // Armazenar os dados do usuário na requisição
        request.user = {
            id: sub,
            email,
        };

        return next(); // Chama o próximo middleware ou rota
    } catch (err) {
        console.error("Erro ao verificar o token:", err.message);
        return response.status(401).json({ message: "Token inválido." });
    }
}


