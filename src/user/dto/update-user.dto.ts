import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', required: false })
  @Matches(/[a-zA-Z]{2,}/g)
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @Matches(/[a-zA-Z]{2,}/g)
  lastName?: string;
}
