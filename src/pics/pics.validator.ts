import { IsNumberString, IsString } from 'class-validator'

export class PicsValidator {
  @IsNumberString()
  page: number

  @IsString()
  category: string
}
