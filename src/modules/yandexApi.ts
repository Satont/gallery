import axios from 'axios'

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

export const uploadImage = async (url: string) => {
  await instance.post('/upload', null, {
    params: {
      url,
    },
  }).then(r => console.log(r.data))
}
