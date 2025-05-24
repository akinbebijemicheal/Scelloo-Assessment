// roleMiddleware.ts
import { Response, NextFunction } from "express"
import { customRequest } from "../types/customDefinition";

import { ApiError } from "../util/ApiError"

 const requireRole = (...allowedRoles: string[]) => {
  return (req: customRequest, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return next(new ApiError(401, "Unauthorized: No user logged in"))
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new ApiError(403, "Forbidden: You don't have permission"))
    }

    next()
  }
}

export default requireRole
