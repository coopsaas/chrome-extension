let intervalId = null
const outboundLinks = new Set()

const extractOutboundLinks = () => {
  const links = document.getElementsByTagName('a')
  for (const link of links) {
    const href = link.href
    if (href.startsWith('http') && !href.includes(location.hostname)) {
      outboundLinks.add(href)
    }
  }
}

function hoverEffect(e) {
  e.target.style.border = '1px solid red'
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startExtracting') {
    extractOutboundLinks()
    intervalId = setInterval(extractOutboundLinks, 200)
    sendResponse({ message: 'started' })
  } else if (request.message === 'stopExtracting') {
    clearInterval(intervalId)
    sendResponse({ links: Array.from(outboundLinks) })
  } else if (request.message === 'enableSelect') {
    document.addEventListener('mouseover', hoverEffect)
  } else if (request.message === 'disableSelect') {
    document.removeEventListener('mouseover', hoverEffect)
  }
})
