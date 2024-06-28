import { IsNumberString } from 'class-validator';

export class UserRouteDto {
  @IsNumberString()
  id: number;
}
