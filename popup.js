window.addEventListener('load', function () {
  const recordLinksBtn = document.getElementById('recordLinksBtn')

  recordLinksBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'linkExtractor.toggle' }, (response) => {
      recordLinksBtn.innerText = response.isPolling ? 'Stop recording' : 'Record outbound links'
      document.getElementById('status').innerText = response.isPolling ? 'Extracting outbound links...' : ''

      chrome.storage.sync.set({ isPolling: response.isPolling })
    })
  })
})

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['isPolling'], (result) => {
    if (result.isPolling) {
      recordLinksBtn.innerText = 'Stop recording'
      document.getElementById('status').innerText = 'Extracting outbound links...'
    } else {
      recordLinksBtn.innerText = 'Record outbound links'
      document.getElementById('status').innerText = ''
    }
  })
})
