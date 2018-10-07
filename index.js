(function() {
  const canvas = document.querySelector('#canvas');
  const video = document.querySelector('#video');
  const open = document.querySelector('#open');
  const close = document.querySelector('#close');
  const capture = document.querySelector('#capture');
  let stream = null
  if ('navigator' in window) {
    if ('mediaDevices' in navigator) {
      if ('getUserMedia' in navigator.mediaDevices) {
        const getUserMediaFn = async () => {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          try {
            video.srcObject = stream;
          } catch (e) {
            video.src = window.URL.createObjectURL(stream);
          }
          video.play();
        }

        const closeClick = () => {
          video.pause();
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => {
              track.stop();
            });
          }
        };

        const captureClick = () => {
          canvas.style.width = video.videoWidth + 'px';
          canvas.style.height = video.videoHeight + 'px';
          const context = canvas.getContext('2d');

          context.drawImage(video, 0, 0, video.videoWidth / 2, video.videoHeight / 4);
        };

        open.addEventListener('click', getUserMediaFn);
        close.addEventListener('click', closeClick);
        capture.addEventListener('click', captureClick);

      }
    }
  }
})();
