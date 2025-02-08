import type { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error("Not found");
  err.status = 404;
  next(err);
};

export default notFound;
