chrome.storage.local.get('links', function (data) {
  const links = data.links || []
  const ul = document.getElementById('links')
  const header = document.getElementById('header')
  header.innerText = `Found ${links.length} outbound links`

  links.forEach(function (link) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = link
    a.innerText = link
    a.target = '_blank'
    li.appendChild(a)
    ul.appendChild(li)
  })
})
