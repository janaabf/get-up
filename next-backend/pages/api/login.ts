import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  getUserByUsernameWithPasswordHash,
} from '../../util/database';

type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  console.log('req.body api', req.body);
  // check method
  if (req.method === 'POST') {
    // check if username & pw are strings
    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ errors: [{ message: 'username or password not provided' }] });
      return;
    }

    // encrypted user information DO NOT EXPOSE!!!
    const privateUserInfo = await getUserByUsernameWithPasswordHash(
      req.body.username,
    );

    // 1. check if user is registered
    if (!privateUserInfo) {
      res
        .status(401)
        .json({ errors: [{ message: 'password or username incorrect' }] });
      return;
    }

    // 2. check password
    const passwordMatches = await bcrypt.compare(
      req.body.password, // what user types into the input field
      privateUserInfo.passwordHash, // what is saved in database
    );

    if (!passwordMatches) {
      res
        .status(401)
        .json({ errors: [{ message: 'password or username incorrect' }] });
      return;
    }

    const userId = privateUserInfo.id;

    // 3. create a session (random session token, using the 64 base characters)
    const token = crypto.randomBytes(80).toString('base64');
    console.log('token', token);

    const session = await createSession(token, userId);
    console.log(session);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // return status
    res
      .status(200)
      .setHeader('set-Cookie', serializedCookie) // set the cookie???????????
      .json({ user: { id: userId } });
  } else {
    res.status(400).json({ errors: [{ message: 'method not allowed' }] });
  }
}
