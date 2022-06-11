// ==UserScript==
// @name    Download Web Video
// @version 6
// @match   https://crazyshit.com/cnt/medias/*
// @match   https://soundgasm.net/u/*/*
// @match   https://thisvid.com/videos/*
// @match   http://www.uflash.tv/video/*
// @grant   GM_download
// ==/UserScript==

let name;
let url;

document.onkeydown = async (e) => {
  if (e.key === "/") {
    switch (location.hostname) {
      case "crazyshit.com":
        name = `${document.querySelector(".content_title").innerText}.mp4`;
        url = document.querySelector("source").src;
        break;

      case "soundgasm.net":
        name = `${document.querySelector(".jp-title").innerText}.m4a`;
        url = document
          .querySelector("body")
          .innerHTML.match(/https:\/\/media.soundgasm.net\/sounds\/.*m4a/)[0];
        break;

      case "thisvid.com":
        name = `${document.querySelector("h1").innerText}.mp4`;
        url = document.querySelector("video").src;
        break;

      case "www.uflash.tv":
        name = `${document.querySelector("h1").innerText}.mp4`;
        url = document.querySelector("source").src;
        break;
    }

    const title = document.title;

    await GM_download({
      url,
      name,
      onprogress: (progress) => {
        document.title = `${Math.round(
          (progress.loaded / progress.total) * 100
        )}% | ${title}`;
      },
    });

    document.title = title;
  }
};
