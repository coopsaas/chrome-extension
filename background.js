// firefox uses browser
const browser = chrome ?? browser

browser.webRequest.onHeadersReceived.addListener(
  (info) => {
    const headers = info.responseHeaders.filter(header =>
      // content-security-policy can also block iframes 
      header.name.toLowerCase() !== 'x-frame-options' && header.name.toLowerCase() !== 'content-security-policy'
    )
    return { responseHeaders: headers }
  }, {
  urls: ['<all_urls>'],
  types: ['sub_frame']
}, [
  'blocking',
  'responseHeaders',
  chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS
]
)