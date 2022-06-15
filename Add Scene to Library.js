// ==UserScript==
// @name    Add Scene to Library
// @version 10
// @match   https://fapster.xxx/videos/*
// @match   https://www.fpo.xxx/videos/*
// @match   https://www.mypornhere.com/videos/*
// @match   https://www.peekvids.com/*
// @match   https://www.playvids.com/*
// @match   https://www.pornflip.com/*
// @match   https://www.pornhits.com/video/*
// @match   https://www.pornoeggs.com/*
// @match   https://www.porntrex.com/video/*
// @match   https://pornwild.com/videos/*
// @match   https://spankbang.com/*/video/*
// @match   https://www.tnaflix.com/*
// @match   https://xhamster.com/videos/*
// @match   https://www.youcrazyx.com/video/*
// @match   https://www.yourpornflare.com/video/*

// @exclude https://www.peekvids.com/embed?v=*
// @exclude https://www.playvids.com/embed/*
// @exclude https://www.pornflip.com/embed/*
// @exclude https://www.pornoeggs.com/embed?v=*
// ==/UserScript==

const sites = {
  "fapster.xxx": () => `/embed/${location.pathname.split("/")[2]}`,
  "www.fpo.xxx": () => `/embed/${location.pathname.split("/")[2]}`,
  "www.mypornhere.com": () => `/embed/${location.pathname.split("/")[2]}`,
  "www.peekvids.com": () =>
    `/embed?v=${
      location.search.split("=")[1] || location.pathname.split("/")[3]
    }`,
  "www.playvids.com": () =>
    `/embed/${
      location.pathname.startsWith("/v/")
        ? location.pathname.split("/")[2]
        : location.pathname.split("/")[1]
    }`,
  "www.pornflip.com": () =>
    `/embed/${
      location.pathname.startsWith("/v/")
        ? location.pathname.split("/")[2]
        : location.pathname.split("/")[1]
    }`,
  "www.pornhits.com": () => `/embed.php?id=${location.pathname.split("/")[2]}`,
  "www.pornoeggs.com": () =>
    `/embed?v=${
      location.search.split("=")[1] || location.pathname.split("/")[1]
    }`,
  "www.porntrex.com": () => `/embed/${location.pathname.split("/")[2]}`,
  "pornwild.com": () => `/embed/${location.pathname.split("/")[2]}`,
  "spankbang.com": () => `/embed/${location.pathname.split("/")[1]}`,
  "www.tnaflix.com": () =>
    `${location.pathname.split("/").pop().replace("video", "/video/")}`,
  "xhamster.com": () => `/embed/${location.pathname.split("-").pop()}`,
  "www.youcrazyx.com": () =>
    `/embed/${location.pathname.split("-").pop().split(".")[0]}`,
  "www.yourpornflare": () =>
    `/embed/${location.pathname.split("-").pop().split(".")[0]}`,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    const url = new URL(location.href);

    url.pathname = sites[location.hostname]();
    url.hostname = location.hostname.replace(
      "www.tnaflix.com",
      "player.tnaflix.com"
    );

    location.href = url.href;
  }
});
