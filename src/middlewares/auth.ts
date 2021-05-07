import { NextFunction, Request, Response } from 'express'

import passport from 'passport'
import { UserAttributes } from '../types/rest-api'
import { FailResponse } from '../utils/jsend'

const verifyCallback = (
  req: Request,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void
) => async (err: Error, user: Partial<UserAttributes>) => {
  if (err || !user) {
    return reject(new FailResponse(401, 'Please authenticate'))
  }
  req.user = user

  resolve(user)
}

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next)
  })
    .then(() => next())
    .catch((err) => next(err))
}

export { auth }
