import axios from 'axios'
import { MessageEmbedImage } from 'discord.js'

const folder = process.env.YANDEX_DISK_FOLDER ?? `/pics-sharer`

const instance = axios.create({
  baseURL: encodeURI(`https://cloud-api.yandex.net/v1/disk/resources`),
  headers: {
    Authorization: `OAuth ${process.env.YANDEX_DISK_TOKEN}`,
  },
  params: {
    path: `disk:/${folder}`,
  },
})

export default instance

export const uploadImage = async (image: MessageEmbedImage) => {
  const nameArray = image.proxyURL.split('/')
  const name = nameArray[nameArray.length - 1]
  await instance.post('/upload', null, {
    params: {
      url: image.proxyURL,
      path: `disk:/${folder}/${name}`,
    },
  })
}
