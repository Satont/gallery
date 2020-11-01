import { Injectable } from '@nestjs/common'

@Injectable()
export class PicsService {
  getPics(page: number): string[] {
    const pics = Array(page + 50).fill('https://via.placeholder.com/200.png')
    return pics
  }
}
