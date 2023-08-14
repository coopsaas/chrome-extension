let intervalIds = []
const outboundLinks = new Set()
let scrollElement = null

function extractOutboundLinks() {
  const links = document.getElementsByTagName('a')
  for (const link of links) {
    const href = link.href
    if (href.startsWith('http') && !href.includes(location.hostname)) {
      outboundLinks.add(href)
    }
  }
}

function mousOverEffect(e) {
  e.target.style.border = '2px solid red'
  e.target.style.cursor = 'pointer'
}

function mouseOutEffect(e) {
  e.target.style.border = ''
  e.target.style.cursor = ''
}

function setScrollElement(e) {
  scrollElement = e.target
  scrollElement.style.border = '2px solid red'
  removeListeners()
}

function scroll() {
  scrollElement.scrollBy({
    top: 300,
    behavior: 'smooth',
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startExtracting') {
    intervalIds.push(setInterval(extractOutboundLinks, 200))

    if (scrollElement) {
      intervalIds.push(setInterval(scroll, 1000))
    }

    sendResponse({ message: 'started' })
  } else if (request.message === 'stopExtracting') {
    intervalIds.forEach((intervalId) => clearInterval(intervalId))
    sendResponse({ links: Array.from(outboundLinks) })
  } else if (request.message === 'enableSelect') {
    document.addEventListener('mouseover', mousOverEffect)
    document.addEventListener('mouseout', mouseOutEffect)
    document.addEventListener('click', setScrollElement)
  } else if (request.message === 'disableSelect') {
    removeListeners()
    if (scrollElement) {
      scrollElement.style.border = ''
      scrollElement = null
    }
  }
})

function removeListeners() {
  document.removeEventListener('mouseover', mousOverEffect)
  document.removeEventListener('mouseout', mouseOutEffect)
  document.removeEventListener('click', setScrollElement)
}
