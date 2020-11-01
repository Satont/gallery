import { Injectable } from '@nestjs/common'

@Injectable()
export class PicsService {
  getPics(page: number): string[] {
    const number = page + 50
    console.log(number)
    const pics = Array(number).fill('https://via.placeholder.com/200.png')
    return pics
  }
}
