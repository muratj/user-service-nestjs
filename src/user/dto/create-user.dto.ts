import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SuperSecret123' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g, {
    message:
      'Password should contain at least 6 characters, contain 1 Uppercase, 1 Lowercase, 1 Number',
  })
  password: string;

  @ApiProperty({ example: 'John' })
  @Matches(/[a-zA-Z]{2,}/g)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Matches(/[a-zA-Z]{2,}/g)
  lastName: string;
}
