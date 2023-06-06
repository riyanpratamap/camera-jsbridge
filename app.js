// Add an event listener to the capture button
document.getElementById('captureButton').addEventListener('click', function() {
    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        var video = document.createElement('video');
        
        // Set the video element source to the camera stream
        video.srcObject = stream;
        
        // Play the video to show the camera preview
        video.play();
        
        // Create a canvas element to capture the image
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Wait for the video to load metadata
        video.addEventListener('loadedmetadata', function() {
          // Draw the current video frame onto the canvas
          canvas.getContext('2d').drawImage(video, 0, 0);
          
          // Stop the camera stream
          stream.getTracks()[0].stop();
          
          // Convert the canvas image to base64 data URL
          var image = canvas.toDataURL('image/jpeg');
          
          // Display the captured image
          document.getElementById('previewImage').src = image;
          
          // Pass the image data to the iOS app using JSBridge (replace 'yourImageKey' with your key)
          JSBridge.call('yourImageKey', image);
        });
      })
      .catch(function(error) {
        console.log('Error accessing camera:', error);
      });
  });
  