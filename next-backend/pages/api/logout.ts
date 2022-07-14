import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSession } from '../../util/database';

type LogoutResponseBody =
  | { errors: { message: string }[] }
  | { session: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | LogoutResponseBody>,
) {
  // check method
  if (req.method === 'DELETE') {
    // delete session
    const token = req.cookies.sessionToken;
    console.log('token cookies', req.cookies);

    await deleteSession(token);

    // return status
    res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('sessionToken', '', { maxAge: -1, path: '/' }),
      )
      .send();
  } else {
    res.status(400).json({ errors: [{ message: 'method not allowed' }] });
  }
}
