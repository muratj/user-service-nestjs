import { Matches } from 'class-validator';

export class UpdateUserDto {
  @Matches(/[a-zA-Z]{2,}/)
  firstName?: string;

  @Matches(/[a-zA-Z]{2,}/)
  lastName?: string;
}
