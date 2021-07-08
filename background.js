// firefox uses browser
const browser = chrome ?? browser;
const INITIATORS = new Set(['http://localhost:3000', 'https://coopsaas.com'])

browser.webRequest.onHeadersReceived.addListener(
  (info) => {
    if (!INITIATORS.has(info.initiator)) return
    const headers = info.responseHeaders.filter((header) => {
      // content-security-policy can also block iframes
      return (
        header.name.toLowerCase() !== "x-frame-options" &&
        header.name.toLowerCase() !== "content-security-policy"
      );
    });
    return { responseHeaders: headers };
  },
  {
    urls: ["<all_urls>"],
    types: ["sub_frame"],
  },
  [
    "blocking",
    "responseHeaders",
    chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS,
  ]
);
