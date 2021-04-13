import { Request, Response } from 'express';
import { checkSchema } from 'obj-valid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserBody, UserToDB } from '../helpers/interfaces';
import { registerNewUser } from '../queries/registerNewUser';
import { findUser } from '../queries/findUser';

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
  const { nickname, password } = req.body;

  try {
    /* here u need to get id user after checking does user exist and compare password */
    const userID: string = 'placeholder';

    const privateKey: string = process.env.JWT_KEY ?? 'key';
    const token = jwt.sign({ userID }, privateKey, {
      expiresIn: 1000 * 60 * 60 * 8 /*8hours*/,
    });

    return res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
        signed: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        msg: 'succesfully login',
      });
  } catch (err) {
    console.error(err); // it should log into a file
    return res.status(500).json({ msg: 'Something goes wrong!' });
  }
}

export async function register(req: Request, res: Response) {
  if (!checkBody(req.body)) return res.status(400).json({ msg: 'Wrong object schema' });
  const { nickname, password } = req.body;

  try {
    //is exist user
    const doesExist: boolean = !!findUser(nickname);

    if (!doesExist) {
      return res
        .status(403)
        .json({
          msg: `User with nickname ${nickname} exist. Choose different nickname.`,
        });
    }

    //register user
    const salt: string = bcrypt.genSaltSync();

    const user: UserToDB = {
      nickname,
      password: bcrypt.hashSync(password, salt),
      salt,
    };

    const result: boolean = registerNewUser(user);

    if (!result) {
      return res.status(500).json({ msg: 'Something goes wrong!' });
    }

    return res.status(200).json({ msg: 'register!', result });
  } catch (err) {
    console.error(err); // it should log into a file
    return res.status(500).json({ msg: 'Something goes wrong!' });
  }
}
