// ==UserScript==
// @name    Add Chapters to Scene
// @version 11
// @match   https://*/*.mp4*
// @match   https://*.fpo.xxx/remote_control.php?file=*
// @grant   GM_download
// @grant   GM_xmlhttpRequest
// ==/UserScript==

window.history.replaceState("", "", "/" + location.hash);

document.addEventListener("keydown", (e) => {
  let times = decodeURIComponent(location.hash.substring(1))
    .split(";")[0]
    .split(",")
    .filter((time) => !!time)
    .map((time) => parseInt(time));

  const video = document.querySelector("video");
  const currTime = video.currentTime;

  switch (e.key) {
    case "ArrowLeft":
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

    case "ArrowRight":
      if (currTime < times[times.length - 1])
        video.currentTime = times[times.findIndex((time) => time > currTime)];
      break;

    case ",":
      video.currentTime = Number.isInteger(currTime)
        ? currTime - 1
        : video.paused
        ? Math.floor(currTime)
        : Math.floor(currTime - 1);
      break;

    case ".":
      video.currentTime = Number.isInteger(currTime)
        ? currTime + 1
        : Math.ceil(currTime);
      break;

    case "/":
      if (times.includes(currTime)) times = times.filter((t) => t !== currTime);
      else times = [...times, currTime].sort((a, b) => a - b);

      location.hash = `${times.join(",")};${location.hash.split(";")[1]}`;
      break;

    case "d":
      GM_xmlhttpRequest({
        url: video.src || document.querySelector("source").src,
        responseType: "blob",
        onprogress: (progress) => {
          document.title = `${Math.round(
            (progress.loaded / progress.total) * 100
          )}%`;
        },
        onload: (res) => {
          video.src = URL.createObjectURL(res.response);
        },
      });
      break;

    case "s":
      const url = new URL(location.hash.split(";")[1] || location.href);
      url.hash = location.hash.split(";")[0];

      const file = `[InternetShortcut]
URL=${url.href}`;

      GM_download(
        URL.createObjectURL(new Blob([file])),
        `${url.hostname.replace("www.", "").split(".")[0]}.url`
      );
      break;
  }
});
