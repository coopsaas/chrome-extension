chrome.storage.local.get('links', function (data) {
  const links = data.links || []
  const ulLinks = document.getElementById('links')
  const ulDomains = document.getElementById('domains')
  const header = document.getElementById('header')
  header.innerText = `Found ${links.length} outbound links`

  links.forEach(function (link) {
    appendLine(ulLinks, link)
    appendLine(ulDomains, getDomain(link))
  })
})

function appendLine(container, line) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.href = line
  a.innerText = line
  a.target = '_blank'
  li.appendChild(a)
  container.appendChild(li)
}

function getDomain(url) {
  const urlObj = new URL(url)
  let domain = urlObj.hostname

  if (domain.startsWith('www.')) {
    domain = domain.replace('www.', '')
  }

  return domain
}
