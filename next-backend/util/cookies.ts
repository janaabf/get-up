import cookie from 'cookie';
import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  // Narrowing
  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours in seconds

  // newer browsers use 'maxAge', old ones only support 'expires'
  return cookie.serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000), // Date.now is in milliseconds
    httpOnly: true,
    secure: isProduction, // in production secure cookies
    path: '/', // so it's available in whole app
    // Be explicit about new default behavior in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
