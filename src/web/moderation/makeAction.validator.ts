import { IsIn, IsNumber, IsString, ValidateIf } from 'class-validator'
import { Categories, Status } from '../../entities/File'

export class MakeActionValidator {
  @IsNumber()
  id: number

  @IsString()
  @IsIn(Object.values(Status))
  status: Status

  @IsString()
  @IsIn(Object.values(Categories))
  @ValidateIf((o: MakeActionValidator) => o.status !== Status.DECLINED)
  category: string = Categories.GENERAL
}
