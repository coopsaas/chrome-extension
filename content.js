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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start') {
    extractOutboundLinks()
    intervalId = setInterval(extractOutboundLinks, 200)
    sendResponse({ message: 'started' })
  } else if (request.message === 'stop') {
    clearInterval(intervalId)
    sendResponse({ links: Array.from(outboundLinks) })
  }
})
