/* eslint-disable no-undef */

const pics = new class Pics {
  list = null
  category = 'general'
  page = 1
  loading = false

  constructor() {
    this.list = document.getElementById('list')

    this.init()
  }

  async init() {
    document.addEventListener('DOMContentLoaded', async () => {
      const list = await this.getList()
      this.render(list)
    })

    window.addEventListener('scroll', async () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      if (clientHeight + scrollTop >= scrollHeight - 5 && !this.loading) {
        this.loading = true
        this.page++
        const list = await this.getList()
        this.render(list)
        this.loading = false
      }
    })
  }

  async getList() {
    const request = await fetch(`/api/pics?page=${this.page}&category=${this.category}`)
    const { pics } = await request.json()

    return pics
  }

  render(pics) {
    for (const pic of pics) {
      const img = document.createElement('img')
      img.src = pic.fileUrl
      img.className = 'list-pic'
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
    }
  }
}


new class Tabs {
  constructor() {
    this.init()
  }

  getAllTabs() {
    return document.querySelectorAll('ul.category-selector > li.nav-item > a.nav-link')
  }

  init() {
    const allTabs = this.getAllTabs()

    for (const link of allTabs) {
      link.addEventListener('click', async () => {
        const text = link.textContent.toLowerCase()
        if (pics.category === text) return
        pics.page = 1
        pics.category = text
        list.innerHTML = ''
        link.classList.toggle('active')
        const picList = await pics.getList()
        pics.render(picList)
        this.getAllTabs().forEach(l => {
          if (l === link) return
          l.classList.toggle('active')
        })
      })
    }
  }
}


$('#imgModal').on('show.bs.modal', (event) => {
  const img = $.clone($(event.relatedTarget)[0])
  img.removeAttribute('class')

  const list = document.createElement('ul')

  const id = document.createElement('li')
  id.appendChild(document.createTextNode(`Id: ${img.dataset.id}`))

  const author = document.createElement('li')
  author.appendChild(document.createTextNode(`Author: ${img.dataset.author}`))

  const createdAt = document.createElement('li')
  createdAt.appendChild(document.createTextNode(`Posted: ${new Date(img.dataset.createdat).toLocaleString()}`))

  list.append(id, author, createdAt)

  $('.modal-body')
    .empty()
    .append(list)

  $('.modal-title')
    .empty()
    .text(img.dataset.name)
})
