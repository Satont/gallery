import { Injectable } from '@nestjs/common'
import yandexApi from 'src/modules/yandexApi'

@Injectable()
export class PicsService {
  private readonly perPage = 50
  private readonly api = yandexApi

  async getPics(page: number): Promise<string[]> {
    const { data: { _embedded: result } } = await this.api.get('/', {
      params: {
        sort: 'created',
        fields: [
          '_embedded.items',
          '_embedded.limit',
          '_embedded.offset',
          '_embedded.total',
        ].join(','),
        limit: this.perPage,
        offset: this.perPage * (page - 1),
        preview_size: 'XXXL',
      },
    })
    const { items } = result as IYandexReponse

    const pics = items.map(i => i.preview)
    return pics
  }
}


interface IYandexReponse {
  items: Array<{
    antivirus_status: string,
    size: number,
    comment_ids: {
      private_resource: string,
      public_resource: string
    },
    name: string,
    exif: Record<any, any>,
    created: string,
    resource_id: string,
    modified: string,
    mime_type: string,
    file: string,
    media_type: string,
    preview: string,
    path: string,
    sha256: string,
    type: string,
    md5: string,
    revision: number
  }>,
  total: number,
  limit: number,
  offset: number,
}
