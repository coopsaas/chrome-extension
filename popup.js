let toggleSelectModeBtn = null
let recordLinksBtn = null

window.addEventListener('load', function () {
  recordLinksBtn = document.getElementById('recordLinksBtn')

  recordLinksBtn.addEventListener('click', async () => {
    const { isPolling, selectMode } = await chrome.runtime.sendMessage({ message: 'linkExtractor.toggleExtract' })

    updateUI({ isPolling, selectMode })
    chrome.storage.local.set({ isPolling, selectMode })
  })

  toggleSelectModeBtn = document.getElementById('selectModeBtn')

  toggleSelectModeBtn.addEventListener('click', async () => {
    const { selectMode } = await chrome.runtime.sendMessage({ message: 'linkExtractor.toggleSelect' })

    updateUI({ selectMode })
    chrome.storage.local.set({ selectMode })
  })
})

document.addEventListener('DOMContentLoaded', async () => {
  const { isPolling, selectMode } = await chrome.storage.local.get(['isPolling', 'selectMode'])
  updateUI({ isPolling, selectMode })
})

function updateUI({ isPolling, selectMode }) {
  const status = document.getElementById('status')
  if (isPolling) {
    recordLinksBtn.innerText = 'Stop recording'
    status.innerText = 'Extracting outbound links...'
  } else {
    recordLinksBtn.innerText = 'Record outbound links'
    status.innerText = ''
  }

  if (selectMode) {
    toggleSelectModeBtn.innerText = 'Disable select mode'
  } else {
    toggleSelectModeBtn.innerText = 'Enable select mode'
  }
}
