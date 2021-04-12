export interface UserBody {
  nickname: string;
  password: string;
}

export interface UserToDB extends UserBody {
  salt: string;
}
