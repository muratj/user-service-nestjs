import { IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g, {
    message:
      'Password should contain at least 6 characters, contain 1 Uppercase, 1 Lowercase, 1 Number',
  })
  password: string;

  @Matches(/[a-zA-Z]{2,}/g)
  firstName: string;

  @Matches(/[a-zA-Z]{2,}/g)
  lastName: string;
}
