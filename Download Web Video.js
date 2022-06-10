// ==UserScript==
// @name    Download Web Video
// @version 3
// @match   https://soundgasm.net/*
// @match   https://thisvid.com/*
// @grant   GM_download
// ==/UserScript==

let filename;
let url;

document.onkeydown = (e) => {
  if (e.key === "/") {
    if (location.hostname === "soundgasm.net") {
      filename = `${document.querySelector(".jp-title").innerText}.m4a`;
      url = document
        .querySelector("body")
        .innerHTML.match(/https:\/\/media.soundgasm.net\/sounds\/.*m4a/)[0];
    } else if (location.hostname === "thisvid.com") {
      filename = `${document.querySelector("h1").innerText}.mp4`;
      url = document.querySelector("video").src;
    }
  }

  GM_download(url, filename);
};
