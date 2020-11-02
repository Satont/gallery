/* eslint-disable no-undef */
let page = 1
const list = document.getElementById('list')

const renderPics = (pics) => pics.forEach(src => {
  const img = document.createElement('img')
  img.src = src
  img.className = 'pic'
  img.setAttribute('data-toggle', 'modal')
  img.setAttribute('data-target', '#imgModal')

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

  $('.modal-body')
    .empty()
    .append(img)
})
