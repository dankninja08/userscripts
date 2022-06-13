// ==UserScript==
// @name    Download Web Video
// @version 7
// @match   https://crazyshit.com/cnt/medias/*
// @match   https://www.pornhub.com/view_video.php?viewkey=*
// @match   https://crazyshit.com/cnt/medias/*
// @match   https://soundgasm.net/u/*/*
// @match   https://thisvid.com/videos/*
// @match   http://www.uflash.tv/video/*
// @match   https://www.xvideos.com/video*
// @grant   GM_download
// @grant   GM_xmlhttpRequest
// ==/UserScript==

let name;
let url;
let completed = 0;

document.onkeydown = async (e) => {
  if (e.key === "/") {
    switch (location.hostname) {
      case "crazyshit.com":
        name = `${document.querySelector(".content_title").innerText}.mp4`;
        url = document.querySelector("source").src;
        break;

      case "www.pornhub.com":
        name = `${document.querySelector("h1").innerText}.ts`;
        url = eval(document.body.innerHTML.match(/flashvars.*?(?= )/)[0])
          .mediaDefinitions.find(
            (def) =>
              def.quality ===
              document
                .querySelector(".mgp_quality li")
                .innerText.replace("p HD", "")
          )
          .videoUrl.replace("master.m3u8", "index-f1-v1-a1.m3u8");
        break;

      case "soundgasm.net":
        name = `${document.querySelector(".jp-title").innerText}.m4a`;
        url = document.body.innerHTML.match(
          /https:\/\/media.soundgasm.net\/sounds\/.*m4a/
        )[0];
        break;

      case "thisvid.com":
        name = `${document.querySelector("h1").innerText}.mp4`;
        url = document.querySelector("video").src;
        break;

      case "www.uflash.tv":
        name = `${document.querySelector("h1").innerText}.mp4`;
        url = document.querySelector("source").src;
        break;

      case "www.xvideos.com":
        name = `${
          document
            .querySelector(".page-title")
            .innerHTML.match(/.*(?= <span)/)[0]
        }.ts`;
        url = document.body.innerHTML
          .match(/(?<=html5player.setVideoHLS\(').*(?=')/)[0]
          .replace(
            ".m3u8",
            `-${
              document.querySelector("#levelauto").nextElementSibling.innerText
            }.m3u8`
          );
        break;
    }

    const title = document.title;

    if (url.includes(".m3u8")) {
      const res = await get(url);

      const files = res.match(/.*\.ts.*/g);
      const promises = files.map((filename) =>
        get(
          url.replace(url.split("/").pop(), filename),
          "blob",
          files.length,
          title
        )
      );

      const blob = new Blob(await Promise.all(promises), {
        type: "video/mp2t",
      });

      GM_download(URL.createObjectURL(blob), name);
    } else {
      await GM_download({
        url,
        name,
        onprogress: (progress) => {
          document.title = `${Math.round(
            (progress.loaded / progress.total) * 100
          )}% | ${title}`;
        },
      });
    }
  }
};

const get = async (url, responseType = "text", total, title) => {
  return new Promise((resolve, _) => {
    GM_xmlhttpRequest({
      url,
      responseType,
      onload: (res) => {
        if (responseType === "blob")
          document.title = `${Math.round(
            (++completed / total) * 100
          )}% | ${title}`;

        resolve(res.response);
      },
    });
  });
};
