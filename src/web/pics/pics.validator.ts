import { IsIn, IsNumberString, IsString } from 'class-validator'
import { Status, Categories } from '../../entities/File'

export class PicsValidator {
  @IsNumberString()
  page: number

  @IsString()
  @IsIn(Object.values(Status))
  status: string

  @IsString()
  @IsIn(Object.values(Categories))
  category: string
}
