let isPolling = false
let selectMode = false

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'linkExtractor.toggleExtract') {
    ;(async () => {
      isPolling = !isPolling
      const message = isPolling ? 'startExtracting' : 'stopExtracting'
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
      const response = await chrome.tabs.sendMessage(tabs[0].id, { message: message })
      if (response && response.links) {
        chrome.storage.local.set({ links: response.links }, function () {
          chrome.tabs.create({ url: chrome.runtime.getURL('links.html') })
        })
      }
      sendResponse({ isPolling, selectMode })
    })()
  } else if (request.message === 'linkExtractor.toggleSelect') {
    ;(async () => {
      selectMode = !selectMode
      const message = selectMode ? 'enableSelect' : 'disableSelect'
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
      await chrome.tabs.sendMessage(tabs[0].id, { message: message })
      sendResponse({ selectMode })
    })()
  }

  // Return true to indicate that we will respond asynchronously
  return true
})
