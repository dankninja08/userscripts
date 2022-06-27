// ==UserScript==
// @name    Add Chapters to Scene
// @version 12
// @match   https://*/*.mp4*
// @match   https://*.fpo.xxx/remote_control.php?file=*
// ==/UserScript==

window.history.replaceState('', '', '/' + location.hash);

const div = document.createElement('div');
div.style.display = 'flex';
div.style.overflowX = 'auto';

document.body.appendChild(div);

let done = false;
let index = 0;

document.addEventListener('keydown', (e) => {
  let times = decodeURIComponent(location.hash.substring(1))
    .split(';')[0]
    .split(',')
    .filter((time) => !!time)
    .map((time) => parseFloat(time));

  const video = document.querySelector('video');
  const currTime = video.currentTime;

  switch (e.key) {
    case '[':
      if (currTime > times[0]) {
        const i = times.findIndex((time) => time > currTime) - 1;

        if (i < 0) {
          if (currTime - times[times.length - 1] < 0.5)
            video.currentTime = times[times.length - 2];
          else video.currentTime = times[times.length - 1];
        } else {
          if (video.currentTime - times[i] < 0.5)
            video.currentTime = i > 0 ? times[i - 1] : times[0];
          else video.currentTime = times[i];
        }
      }
      break;

    case ']':
      if (currTime < times[times.length - 1])
        video.currentTime = times[times.findIndex((time) => time > currTime)];
      break;

    case ',':
      video.currentTime = Number.isInteger(currTime)
        ? currTime - 1
        : video.paused
        ? Math.floor(currTime)
        : Math.floor(currTime - 1);
      break;

    case '.':
      video.currentTime = Number.isInteger(currTime)
        ? currTime + 1
        : Math.ceil(currTime);
      break;

    case 'ArrowLeft':
      video.currentTime -= 5;
      break;

    case 'ArrowRight':
      video.currentTime += 5;
      break;

    case '/':
      if (times.includes(currTime)) times = times.filter((t) => t !== currTime);
      else times = [...times, currTime].sort((a, b) => a - b);

      location.hash = `${times.join(',')};${location.hash.split(';')[1]}`;
      break;

    case '=':
      video.addEventListener('seeked', () => {
        if (!done) {
          const canvas = document.createElement('canvas');
          canvas.height = 144;
          canvas.width = 256;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const img = new Image();
          img.src = canvas.toDataURL();

          const time = times[index - 1];

          const button = document.createElement('button');
          button.onclick = () => {
            video.currentTime = time;
          };
          button.appendChild(img);
          div.appendChild(button);

          if (video.currentTime === times[times.length - 1]) done = true;
          else video.currentTime = times[index++];
        }
      });

      video.currentTime = times[index++];
      break;

    case 's':
      const url = new URL(location.hash.split(';')[1] || location.href);
      url.hash = location.hash.split(';')[0];

      const file = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>URL</key>
    <string>${url}</string>
  </dict>
  </plist>`;

      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(new Blob([file]));
      anchor.download = `${
        url.hostname.replace('www.', '').split('.')[0]
      }.webloc`;

      anchor.click();
      break;
  }
});
