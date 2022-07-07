import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

const sql = connectOneTimeToDatabase();

export type User = {
  id: number;
  email: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function createUser(email: string, passwordHash: string) {
  const [user] = await sql<[User]>`
  INSERT INTO users
    (email, password_hash)
  VALUES
    (${email}, ${passwordHash})
  RETURNING
    id,
    email
  `;

  return camelcaseKeys(user);
}

export async function getUserByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      email
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByEmailWithPasswordHash(email: string) {
  if (!email) return undefined;

  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserById(userId: number) {
  if (!userId) return undefined;

  const [user] = await sql<[User | undefined]>`
  SELECT
    id,
    email
  FROM
    users
  WHERE
    id = ${userId}`;
  return user && camelcaseKeys(user);
}
