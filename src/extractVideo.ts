// ==UserScript==
// @name    Extract Video
// @match   https://www.cambro.tv/*
// @match   https://crazyshit.com/cnt/medias/*
// @match   https://fapster.xxx/videos/*
// @match   https://www.fpo.xxx/videos/*
// @match   https://fxporn.net/video/*
// @match   https://goodporn.to/videos/*
// @match   https://www.mypornhere.com/videos/*
// @match   https://www.peekvids.com/*
// @match   https://www.playvids.com/*
// @match   https://www.pornflip.com/*
// @match   https://www.pornharlot.com/video/*
// @match   https://www.pornhits.com/video/*
// @match   https://www.pornhits.com/embed.php?id=*
// @match   https://www.pornhub.com/view_video.php?viewkey=*
// @match   https://pornmedium.com/video/*
// @match   https://www.pornoeggs.com/*
// @match   https://www.porntrex.com/video/*
// @match   https://pornwild.com/videos/*
// @match   https://povcum.com/video/*
// @match   https://severeporn.com/videos/*
// @match   https://soundgasm.net/u/*/*
// @match   https://spankbang.com/*/video/*
// @match   https://thisvid.com/videos/*
// @match   https://tittykings.com/videos/*
// @match   https://www.tnaflix.com/*
// @match   https://www.trendyporn.com/video/*
// @match   https://www.trendyxxx.com/video/*
// @match   http://www.uflash.tv/video/*
// @match   https://www.whoreshub.com/videos/*
// @match   https://xhamster.com/videos/*
// @match   https://www.xozilla.com/*
// @match   https://www.youcrazyx.com/video/*
// @match   https://www.yourpornflare.com/video/*
// ==/UserScript==

document.addEventListener("keydown", async (e) => {
  if (e.key === "/") {
    let url;

    let quality: number;
    let res;
    let data;

    const video = document.querySelector("video");
    const src =
      video?.src || (video?.children[0] as HTMLSourceElement | undefined)?.src;

    switch (location.hostname) {
      case "www.pornhits.com":
        if (location.pathname.startsWith("/video/")) {
          location.href = `http://www.pornhits.com/embed.php?id=${
            location.pathname.split("/")[2]
          }`;
          return;
        }
        break;

      case "www.peekvids.com":
      case "www.playvids.com":
      case "www.pornflip.com":
      case "www.pornoeggs.com":
        quality = parseInt(
          document.querySelector<HTMLElement>(".mediaPlayerSelect .labelText")!
            .innerText
        );

        res = await fetch(
          `https://${location.hostname}/v-alt/${
            video!.attributes["data-id" as any].value
          }`
        );
        data = await res.json();

        url = data[`data-src${quality}`];
        break;

      case "www.pornhub.com":
        quality = parseInt(
          document.querySelector<HTMLElement>(".mgp_quality .mgp_value")!
            .innerText
        );

        res = await fetch(
          eval(
            document.body.innerHTML.match(/flashvars.*?(?= )/)![0]
          ).mediaDefinitions.find((def: any) => def.format === "mp4")!.videoUrl
        );
        data = await res.json();

        url = data.find(
          (def: any) => parseInt(def.quality) === quality
        ).videoUrl;
        location.href = url;
        break;

      case "soundgasm.net":
        url = document.body.innerHTML.match(
          /https:\/\/media.soundgasm.net\/sounds\/.*m4a/
        )![0];
        break;
    }

    if (!url && !src) return alert("Start playing the video!");
    else if (!url && src) url = src;

    const link = document.createElement("a");
    link.href = `${url}${location.hash || "#"};${location.href.split("#")[0]}`;
    link.target = "_blank";

    link.click();
  }
});
