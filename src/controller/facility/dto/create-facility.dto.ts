import { IsString } from 'class-validator';

export class CreateFacilityDto {
  @IsString()
  readonly name: string;
  readonly src: string;
}
