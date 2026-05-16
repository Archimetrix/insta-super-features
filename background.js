// Cross-browser compatibility shim
// Firefox exposes `browser` (promise-based); Chrome exposes `chrome` (callback-based).
// Using the `chrome` alias works in both, so we just unify the reference here.
const api = typeof browser !== "undefined" ? browser : chrome;

api.runtime.onInstalled.addListener(() => {
    api.storage.sync.get(["showDownload", "autoRedirect", "autoReelsStart", "applicationIsOn", "autoComments", "autoUnmute"], (result) => {
      if (result.showDownload === undefined) api.storage.sync.set({ showDownload: true });
      if (result.autoRedirect === undefined) api.storage.sync.set({ autoRedirect: false });
      if (result.autoReelsStart === undefined) api.storage.sync.set({ autoReelsStart: true });
      if (result.applicationIsOn === undefined) api.storage.sync.set({ applicationIsOn: true });
      if (result.autoComments === undefined) api.storage.sync.set({ autoComments: false });
      if (result.autoUnmute === undefined) api.storage.sync.set({ autoUnmute: true });
    });
});

api.runtime.onMessage.addListener((data, sender, sendResponse) => {
  switch(data.event) {
    case "showDownload":
      api.storage.sync.set( {"showDownload" : data.showDownloadValue} );
      break;
    case "autoRedirect":
      api.storage.sync.set( {"autoRedirect" : data.autoRedirectValue} );
      break;
    case "autoMute":
      api.storage.sync.set( {"autoUnmute" : data.autoUnmuteValue} );
      break;
    case "autoComments":
      api.storage.sync.set( {"autoComments" : data.autoCommentsValue} );
      break;
    case "autoReelsStart":
      api.storage.sync.set( {"autoReelsStart" : data.autoReelsValue} );
      break;
  }
});
