// ==UserScript==
// @name    Download Web Video
// @version 1
// @match   https://soundgasm.net/*
// @grant   GM_download
// ==/UserScript==

if (location.hostname === "soundgasm.net") {
  const filename = `${document.querySelector(".jp-title").innerText}.m4a`;
  const url = document
    .querySelector("body")
    .innerHTML.match(/https:\/\/media.soundgasm.net\/sounds\/.*m4a/)[0];

  GM_download(url, filename);
}
