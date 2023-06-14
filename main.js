// Get the A-Frame camera element
const cameraEl = document.querySelector('a-camera');

// Check camera permission status
const checkCameraPermission = async () => {
  try {
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });
    
    if (permissionStatus.state === 'granted') {
      // Permission already granted, start the camera
      startCamera();
    } else if (permissionStatus.state === 'prompt') {
      // Permission not yet granted, display a custom prompt
      const permissionPrompt = document.createElement('div');
      permissionPrompt.innerText = 'This app requires access to your camera. Please allow camera access to continue.';
      permissionPrompt.style.backgroundColor = 'white';
      permissionPrompt.style.padding = '10px';
      permissionPrompt.style.position = 'absolute';
      permissionPrompt.style.top = '50%';
      permissionPrompt.style.left = '50%';
      permissionPrompt.style.transform = 'translate(-50%, -50%)';
      permissionPrompt.style.zIndex = '999';
      document.body.appendChild(permissionPrompt);
      
      // Listen for click event on the prompt to request permission
      permissionPrompt.addEventListener('click', async () => {
        try {
          const newPermissionStatus = await navigator.permissions.request({ name: 'camera' });
          
          if (newPermissionStatus.state === 'granted') {
            // Permission granted, start the camera
            startCamera();
          } else {
            // Permission denied
            console.error('Camera permission denied by the user');
            // Handle permission denial here
          }
          
          // Remove the custom prompt
          permissionPrompt.remove();
        } catch (error) {
          console.error('Failed to request camera permission:', error);
          // Handle error here
          // Remove the custom prompt
          permissionPrompt.remove();
        }
      });
    } else {
      // Permission denied
      console.error('Camera permission denied by the user');
      // Handle permission denial here
    }
  } catch (error) {
    console.error('Failed to check camera permission:', error);
    // Handle error here
  }
};

// Start the camera
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Attach the camera stream to the video element
    const videoEl = cameraEl.components['device-orientation-camera'].data.videoEl;
    videoEl.srcObject = stream;
    videoEl.play();
  } catch (error) {
    console.error('Failed to access camera:', error);
    // Handle error here
  }
};

// Call the function to check camera permission
checkCameraPermission();
