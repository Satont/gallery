/* eslint-disable no-undef */

$('.moderation-form').each(function (index, value) {
  $(value).bind('submit', async function (e) {
    const data = $(value).serialize()
    const params = new URLSearchParams(data)

    e.preventDefault()
    try {
      const request = await fetch('/api/moderation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(this.dataset.id),
          status: params.get('status'),
          category: params.get('category'),
        }),
      })

      const result = await request.json()
      if (!result.error) {
        $(`*[data-card-for="${this.dataset.id}"]`).remove()
      } else console.log(result)
    } catch (e) {
      console.error(e)
    }
  })
})
