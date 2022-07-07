import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByEmail } from '../../util/database';

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

    // check if user already exists
    if (await getUserByEmail(req.body.email)) {
      res
        .status(401)
        .json({ errors: [{ message: 'email already registered' }] });
      return;
    }
    // 1. get userinfo
    const user = req.body;

    // 2. hash password
    const passwordHash = await bcrypt.hash(req.body.password, 12);

    // 3. create user
    const newUser = await createUser(req.body.email, passwordHash);

    console.log(newUser);

    res.status(200).json({ user: { id: newUser.id } });
  } else {
    res.status(400).json({ errors: [{ message: 'method not allowed' }] });
  }
}
