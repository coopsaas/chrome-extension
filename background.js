const browser = chrome ?? browser

const HOSTNAME_WHITELAST = ['localhost', 'coopsaas']
const HEADER_BLACKLIST = ['x-frame-options', 'content-security-policy']

browser.webRequest.onHeadersReceived.addListener(
  ({ initiator, responseHeaders }) => {
    if (!HOSTNAME_WHITELAST.some((hostname) => initiator.includes(hostname))) return

    const headers = responseHeaders.filter(({ name }) => !HEADER_BLACKLIST.includes(name.toLowerCase()))

    return { responseHeaders: headers }
  },
  {
    urls: ['<all_urls>'],
    types: ['sub_frame'],
  },
  ['blocking', 'responseHeaders', chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS],
)

browser.runtime.onMessageExternal.addListener(({ message }, sender, respond) => {
  if (message === 'version') {
    const { version } = browser.runtime.getManifest()
    respond({ version })
  }
  return true
})
