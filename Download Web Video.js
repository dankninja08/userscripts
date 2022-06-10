// ==UserScript==
// @name    Download Web Video
// @version 5
// @match   https://crazyshit.com/*
// @match   https://soundgasm.net/*
// @match   https://thisvid.com/*
// @grant   GM_download
// ==/UserScript==

let filename;
let url;

document.onkeydown = (e) => {
  if (e.key === "/") {
    switch (location.hostname) {
      case "soundgasm.net":
        filename = `${document.querySelector(".jp-title").innerText}.m4a`;
        url = document
          .querySelector("body")
          .innerHTML.match(/https:\/\/media.soundgasm.net\/sounds\/.*m4a/)[0];
        break;

      case "thisvid.com":
        filename = `${document.querySelector("h1").innerText}.mp4`;
        url = document.querySelector("video").src;
        break;

      case "crazyshit.com":
        filename = `${document.querySelector(".content_title").innerText}.mp4`;
        url = document.querySelector("source").src;
        break;
    }

    GM_download(url, filename);
  }
};
