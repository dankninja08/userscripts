// ==UserScript==
// @name    Download Web Video
// @version 9
// @match   https://crazyshit.com/cnt/medias/*
// @match   https://fapster.xxx/videos/*
// @match   https://www.fpo.xxx/videos/*
// @match   https://www.mypornhere.com/videos/*
// @match   https://www.peekvids.com/*
// @match   https://www.playvids.com/*
// @match   https://www.pornflip.com/*
// @match   https://www.pornhits.com/video/*
// @match   https://www.pornhits.com/embed.php?id=*
// @match   https://www.pornhub.com/view_video.php?viewkey=*
// @match   https://www.pornoeggs.com/*
// @match   https://www.porntrex.com/video/*
// @match   https://pornwild.com/videos/*
// @match   https://soundgasm.net/u/*/*
// @match   https://spankbang.com/*/video/*
// @match   https://thisvid.com/videos/*
// @match   https://www.tnaflix.com/*
// @match   http://www.uflash.tv/video/*
// @match   https://xhamster.com/videos/*
// @match   https://www.xozilla.com/*
// @match   https://www.xvideos.com/video*
// @match   https://www.youcrazyx.com/video/*
// @match   https://www.yourpornflare.com/video/*
// ==/UserScript==

const openUrl = (url) => {
  const u = new URL(url);
  u.hash = `${location.hash};${location.href.split("#")[0]}`;

  location.href = u.href;
};

document.addEventListener("keydown", async (e) => {
  if (e.key === "/") {
    let name;
    let url;

    let quality;
    let res;
    let data;

    const video = document.querySelector("video");
    const src = video?.src || video?.children[0]?.src;

    switch (location.hostname) {
      case "www.pornhits.com":
        if (location.pathname.startsWith("/video/")) {
          openUrl(
            `http://www.pornhits.com/embed.php?id=${
              location.pathname.split("/")[2]
            }`
          );
          return;
        }
        break;

      case "www.peekvids.com":
      case "www.playvids.com":
      case "www.pornflip.com":
      case "www.pornoeggs.com":
        quality = document.querySelector(
          ".mediaPlayerSelect .labelText"
        ).innerText;

        res = await fetch(
          `https://${location.hostname}/v-alt/${video.attributes["data-id"].value}`
        );
        data = await res.json();

        url = data[`data-src${quality}`];
        break;

      case "www.pornhub.com":
        quality = parseInt(
          document.querySelector(".mgp_quality .mgp_value").innerText
        );

        name = `${document.querySelector("h1").innerText}.mp4`;
        res = await fetch(
          eval(
            document.body.innerHTML.match(/flashvars.*?(?= )/)[0]
          ).mediaDefinitions.find((def) => def.format === "mp4").videoUrl
        );
        data = await res.json();

        url = data.find((def) => parseInt(def.quality) === quality).videoUrl;
        location.href = url;
        break;

      case "crazyshit.com":
      case "thisvid.com":
      case "www.uflash.tv":
        name = `${document.querySelector("h1").innerText}.mp4`;
        break;

      case "soundgasm.net":
        name = `${document.querySelector(".jp-title").innerText}.m4a`;
        url = document.body.innerHTML.match(
          /https:\/\/media.soundgasm.net\/sounds\/.*m4a/
        )[0];
        break;

      case "www.xvideos.com":
        quality = document.querySelector("#quality").innerText.split(" ")[1];

        res = await fetch(
          document.body.innerHTML.match(
            /(?<=html5player.setVideoHLS\(').*(?=')/
          )[0]
        );
        data = await res.text();

        await navigator.clipboard.writeText(
          `ffmpeg -i "${url.replace(
            /hls.m3u8.*/,
            data.match(new RegExp(`hls-${quality}.*`))[0]
          )}" "./Downloads/${`${
            document
              .querySelector(".page-title")
              .innerText.split(/ [0-9]+ [sec|min]/)[0]
          }.mp4`}"`
        );
        return;
    }

    if (name) await navigator.clipboard.writeText(name);

    if (url) openUrl(url);
    else if (src) openUrl(src);
    else alert("Start playing the video!");
  }
});
