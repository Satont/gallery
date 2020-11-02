import { IsNumberString } from 'class-validator'

export class PicsValidator {
  @IsNumberString()
  page: number
}
