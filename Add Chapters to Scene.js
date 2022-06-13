// ==UserScript==
// @name    Add Chapters to Scene
// @version 7
// @match   https://www.fpo.xxx/embed/*
// @match   https://hclips.com/embed/*
// @match   https://hdzog.com/embed/*
// @match   https://www.peekvids.com/embed?v=*
// @match   https://www.playvids.com/embed/*
// @match   https://www.pornflip.com/embed/*
// @match   https://www.pornhits.com/embed.php?id=*
// @match   https://www.pornoeggs.com/embed?v=*
// @match   https://www.porntrex.com/embed/*
// @match   https://pornwild.com/embed/*
// @match   https://spankbang.com/embed/*
// @match   https://player.tnaflix.com/video/*
// @match   https://txxx.com/embed/*
// @match   https://upornia.com/embed/*
// @match   https://xhamster.com/embed/*
// @match   https://www.yourpornflare.com/embed/*
// @grant   GM_download
// ==/UserScript==

document.onkeydown = (e) => {
  let times = decodeURIComponent(location.hash.substring(1))
    .split(",")
    .filter((time) => !!time)
    .map((time) => parseInt(time));

  const video = document.querySelector("video");

  switch (e.key) {
    case "[":
      if (video.currentTime > times[0]) {
        const i = times.findIndex((time) => time > video.currentTime) - 1;

        if (i < 0) {
          if (video.currentTime - times[times.length - 1] < 0.5)
            video.currentTime = times[times.length - 2];
          else video.currentTime = times[times.length - 1];
        } else {
          if (video.currentTime - times[i] < 0.5)
            video.currentTime = i > 0 ? times[i - 1] : times[0];
          else video.currentTime = times[i];
        }
      }
      break;

    case "]":
      if (video.currentTime < times[times.length - 1])
        video.currentTime =
          times[times.findIndex((time) => time > video.currentTime)];
      break;

    case ",":
      video.currentTime = Math.round(video.currentTime - 1);
      break;

    case ".":
      video.currentTime = Math.round(video.currentTime + 1);
      break;

    case "p":
      if (video.paused) video.play();
      else video.pause();
      break;

    case "/":
      const time = Math.round(video.currentTime);

      if (times.includes(time)) times = times.filter((t) => t !== time);
      else times = [...times, time].sort((a, b) => a - b);

      location.hash = times.join(",");
      break;

    case "s":
      const file = `<?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
      <plist version="1.0">
      <dict>
        <key>URL</key>
        <string>${location.href}</string>
      </dict>
      </plist>`;

      GM_download(
        URL.createObjectURL(new Blob([file])),
        `${location.hostname.replace("www.", "").split(".")[0]}.webloc`
      );
      break;
  }
};
