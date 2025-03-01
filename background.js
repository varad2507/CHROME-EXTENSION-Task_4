let activeTab = null;
let startTime = null;
let timeSpent = {};

// List of productive websites
const productiveWebsites = [
  'example.com', // Add your productive websites here
  'github.com',
  'stackoverflow.com'
];

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (activeTab !== null) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Check if activeTab.url is valid
    if (activeTab.url) {
      try {
        const url = new URL(activeTab.url);
        const domain = url.hostname;

        if (timeSpent[domain]) {
          timeSpent[domain] += duration;
        } else {
          timeSpent[domain] = duration;
        }

        chrome.storage.local.set({ timeSpent });
      } catch (error) {
        console.error('Invalid URL:', activeTab.url, error);
      }
    }
  }

  chrome.tabs.get(activeInfo.tabId, (tab) => {
    activeTab = tab;
    startTime = Date.now();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    if (activeTab !== null) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Check if activeTab.url is valid
      if (activeTab.url) {
        try {
          const url = new URL(activeTab.url);
          const domain = url.hostname;

          if (timeSpent[domain]) {
            timeSpent[domain] += duration;
          } else {
            timeSpent[domain] = duration;
          }

          chrome.storage.local.set({ timeSpent });
        } catch (error) {
          console.error('Invalid URL:', activeTab.url, error);
        }
      }
    }

    activeTab = tab;
    startTime = Date.now();
  }
});