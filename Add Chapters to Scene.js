// ==UserScript==
// @name    Add Chapters to Scene
// @version 10
// @match   https://fapster.xxx/embed/*
// @match   https://www.fpo.xxx/embed/*
// @match   https://www.mypornhere.com/embed/*
// @match   https://www.peekvids.com/embed?v=*
// @match   https://www.playvids.com/embed/*
// @match   https://www.pornflip.com/embed/*
// @match   https://www.pornhits.com/embed.php?id=*
// @match   https://www.pornoeggs.com/embed?v=*
// @match   https://www.porntrex.com/embed/*
// @match   https://pornwild.com/embed/*
// @match   https://spankbang.com/embed/*
// @match   https://player.tnaflix.com/video/*
// @match   https://xhamster.com/embed/*
// @match   https://www.youcrazyx.com/embed/*
// @match   https://www.yourpornflare.com/embed/*

// @match   https://*/*.mp4*
// @grant   GM_download
// ==/UserScript==

if (!location.hash.includes(";")) {
  const int = setInterval(async () => {
    const video = document.querySelector("video");

    if (video) {
      if (
        [
          "fapster.xxx",
          "www.fpo.xxx",
          "www.mypornhere.com",
          "www.pornhits.com",
          "www.porntrex.com",
          "www.pornwild.com",
          "player.tnaflix.com",
          "www.youcrazyx.com",
          "www.yourpornflare.com",
        ].includes(location.hostname)
      ) {
        const url = new URL(video.src);
        url.hash = `${location.hash};${location.href.split("#")[0]}`;

        location.href = url.href;
      } else if (
        [
          "www.peekvids.com",
          "www.playvids.com",
          "www.pornflip.com",
          "www.pornoeggs.com",
        ].includes(location.hostname)
      ) {
        const res = await fetch(
          `https://${location.hostname}/v-alt/${video.attributes["data-id"].value}`
        );
        const data = await res.json();

        const url = new URL(
          data["data-src720"] || data["data-src480"] || data["data-src360"]
        );
        url.hash = `${location.hash};${location.href.split("#")[0]}`;

        location.href = url.href;
      }

      clearInterval(int);
    }
  }, 100);
} else {
  window.history.pushState("", "", "/" + location.hash);

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
        if (times.includes(currTime))
          times = times.filter((t) => t !== currTime);
        else times = [...times, currTime].sort((a, b) => a - b);

        location.hash = `${times.join(",")};${location.hash.split(";")[1]}`;
        break;

      case "s":
        const url = new URL(location.hash.split(";")[1] || location.href);
        url.hash = location.hash.split(";")[0];

        const file = `<?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
      <plist version="1.0">
      <dict>
        <key>URL</key>
        <string>${url.href}</string>
      </dict>
      </plist>`;

        GM_download(
          URL.createObjectURL(new Blob([file])),
          `${url.hostname.replace("www.", "").split(".")[0]}.webloc`
        );
        break;
    }
  });
}
