import { Injectable } from '@nestjs/common'

@Injectable()
export class PicsService {
  getPics(): string[] {
    const pics = Array(50).fill('https://via.placeholder.com/200.png')
    return pics
  }
}
