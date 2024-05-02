const butInstall = document.getElementById('buttonInstall');

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('Before install prompt event triggered.');
  // Prevent the default install prompt
  event.preventDefault();
  // Store the event for later use
  window.deferredPrompt = event;
});

butInstall.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the default behavior of the anchor tag
  console.log('Install button clicked.');
  const deferredPrompt = window.deferredPrompt;
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    // Log the outcome of the install prompt
    console.log('User choice:', outcome);
    // Clear the deferred prompt
    window.deferredPrompt = null;
  }
});


// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log when the app is installed
  console.log('App installed:', event);
});
