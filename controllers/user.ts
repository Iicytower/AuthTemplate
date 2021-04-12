import { Request, Response } from 'express';
import { checkSchema } from 'obj-valid';
import bcrypt from 'bcrypt';

import { UserBody, UserToDB } from '../helpers/interfaces';
import { registerNewUser } from '../queries/registerNewUser';

function checkBody(body: UserBody): boolean {
  const bodySchema = {
    nickname: 'string',
    password: 'string',
  };

  if (!checkSchema(bodySchema, body).score) return false;

  return true;
}

export async function login(req: Request, res: Response) {
  if (!checkBody(req.body)) return res.status(400).json({ msg: 'Wrong object schema' });

  console.log('login!');
  return res.end('login!');
}

export async function register(req: Request, res: Response) {
  if (!checkBody(req.body)) return res.status(400).json({ msg: 'Wrong object schema' });

  const { nickname, password } = req.body;

  const salt: string = bcrypt.genSaltSync();

  const user: UserToDB = {
    nickname,
    password: bcrypt.hashSync(password, salt),
    salt,
  };

  const result: boolean = await registerNewUser(user);

  return res.status(200).json({ msg: 'register!', result });
}
