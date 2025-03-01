document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('timeSpent', (data) => {
      const timeList = document.getElementById('timeList');
      const timeSpent = data.timeSpent || {};
  
      let productiveTime = 0;
      let unproductiveTime = 0;
  
      // List of productive websites
      const productiveWebsites = [
        'example.com', // Add your productive websites here
        'github.com',
        'stackoverflow.com'
      ];
  
      // Clear the list before populating
      timeList.innerHTML = '';
  
      for (const [domain, duration] of Object.entries(timeSpent)) {
        const li = document.createElement('li');
        li.textContent = `${domain}: ${Math.floor(duration / 1000)} seconds`;
        timeList.appendChild(li);
  
        // Categorize time
        if (productiveWebsites.includes(domain)) {
          productiveTime += duration;
        } else {
          unproductiveTime += duration;
        }
      }
  
      // Display productivity summary
      const summary = document.createElement('p');
      summary.textContent = `Productive Time: ${Math.floor(productiveTime / 1000)} seconds, Unproductive Time: ${Math.floor(unproductiveTime / 1000)} seconds`;
      timeList.appendChild(summary);
    });
  });