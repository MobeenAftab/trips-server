import { Request, Response, NextFunction } from 'express';

export const verifyRoles = (...allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.body.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.body.roles
            .map((role) => rolesArray.includes(role))
            .find((val) => val === true);
        if (!result) return res.sendStatus(401);
        next();
    };
};

// export const verifyRefreshToken = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {};
