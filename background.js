let isPolling = false

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'linkExtractor.toggle') {
    isPolling = !isPolling
    const message = isPolling ? 'start' : 'stop'
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: message }, (response) => {
        if (response && response.links) {
          chrome.storage.local.set({ links: response.links }, function () {
            chrome.tabs.create({ url: chrome.runtime.getURL('links.html') })
          })
        }
      })
    })
    sendResponse({ isPolling: isPolling })
  }

  // Return true to indicate that we will respond asynchronously
  return true
})
