import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // 1. check for valid session token
    const token = req.cookies.sessionToken;
    console.log('cookie', req.cookies);
    console.log('cookie token', token);

    if (!token) {
      res
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    // 2. Get the user from the token
    const user = await getUserByValidSessionToken(token);
    console.log('userprofile', user);
    if (!user) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    // 3. Return the user
    res.status(200).json({ user: user });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
