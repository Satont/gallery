import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getCommands(): string[] {
    return ['test']
  }
}
