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
      const link = document.createElement('a')
      link.href = `/pics/${pic.id}`

      const img = document.createElement('img')
      img.src = pic.thumbnailUrl
      img.className = 'list-pic'
      link.append(img)

      const div = document.createElement('div');
      ['col-sm-3', 'pb-2'].forEach(c => div.classList.add(c))
      div.append(link)

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
