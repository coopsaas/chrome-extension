# Browser Extension

Disables HTTPS headers to allow iframes for the CoopSaas screening tool.

## Installation

For Brave, open `brave://extensions`, enable developer mode and click "Load unpacked" where you select the folder with the `background.js` and `manifest.json` files.

## Remarks

* We can neither scope the extension to coopsaas through the `permission` field in the `manifest.json` nor the `filter` argument in `webRequest.addListener`.