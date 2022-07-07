import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmailWithPasswordHash } from '../../util/database';

type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  console.log(req.body);
  // check method
  if (req.method === 'POST') {
    // check if email & pw are strings
    if (
      typeof req.body.email !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.email ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ errors: [{ message: 'email or password not provided' }] });
      return;
    }

    // encrypted user information DO NOT EXPOSE!!!
    const privateUserInfo = await getUserByEmailWithPasswordHash(
      req.body.email,
    );

    // 1. check if user is registered
    if (!privateUserInfo) {
      res
        .status(401)
        .json({ errors: [{ message: 'password or email incorrect' }] });
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
        .json({ errors: [{ message: 'password or email incorrect' }] });
      return;
    }

    const userId = privateUserInfo.id;

    res.status(200).json({ user: { id: userId } });
  } else {
    res.status(400).json({ errors: [{ message: 'method not allowed' }] });
  }
}
