/* eslint-disable no-undef */
let page = 1
const list = document.getElementById('list')

const renderPics = (pics) => pics.forEach(pic => {
  const img = document.createElement('img')
  img.src = pic.fileUrl
  img.className = 'pic'
  img.setAttribute('data-toggle', 'modal')
  img.setAttribute('data-target', '#imgModal')

  const entries = Object.entries(pic)
    .filter(([key]) => !['fileUrl'].includes(key))

  for (const [key, value] of entries) {
    img.setAttribute(`data-${key}`, value)
  }

  const div = document.createElement('div');
  ['col-sm-3', 'pb-2'].forEach(c => div.classList.add(c))
  div.append(img)

  list.append(div)
})

const getPics = async () => {
  const request = await fetch(`/api/pics?page=${page}`)
  const { pics } = await request.json()

  renderPics(pics)
}

document.addEventListener('DOMContentLoaded', getPics())

let loading = false
window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (clientHeight + scrollTop >= scrollHeight - 5 && !loading) {
    page++
    loading = true
    await getPics()
    loading = false
  }
})

$('#imgModal').on('show.bs.modal', (event) => {
  const img = $.clone($(event.relatedTarget)[0])
  img.removeAttribute('class')

  const list = document.createElement('ul')

  const author = document.createElement('li')
  author.appendChild(document.createTextNode(`Author: ${img.dataset.author}`))

  const createdAt = document.createElement('li')
  createdAt.appendChild(document.createTextNode(`Posted: ${new Date(img.dataset.createdat).toLocaleString()}`))


  list.append(author, createdAt)

  $('.modal-body')
    .empty()
    .append(list)
    .append(img)

  $('.modal-title')
    .empty()
    .text(img.dataset.name)
})
