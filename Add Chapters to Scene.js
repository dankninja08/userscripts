// ==UserScript==
// @name  Add Chapters to Scene
// @match https://embed.redtube.com/?id=*
// @match https://fap18.net/embed/*
// @match https://fapster.xxx/embed/*
// @match https://filtercams.com/embed/*
// @match https://fuxporn.com/embed.php?id=*
// @match https://goodporn.to/embed/*
// @match https://hclips.com/embed/*
// @match https://hdsex.org/embed/*
// @match https://hdzog.com/embed/*
// @match https://mega.nz/embed/*
// @match https://player.tnaflix.com/video/*
// @match https://porn-freewatch.com/embed/*
// @match https://pornhits.com/embed.php?id=*
// @match https://pornone.com/embed/*
// @match https://pornwild.com/embed/*
// @match https://spankbang.com/embed/*
// @match https://tittykings.com/embed/*
// @match https://txxx.com/embed/*
// @match https://upornia.com/embed/*
// @match https://www.cumlouder.com/embed/*
// @match https://www.eachporn.com/embed/*
// @match https://www.eporner.com/embed/*
// @match https://www.fapzonexxx.com/embed/*
// @match https://www.fpo.xxx/embed/*
// @match https://www.inxxx.com/embed/*
// @match https://www.peekvids.com/embed?v=*
// @match https://www.playvids.com/embed/*
// @match https://www.pornflip.com/embed/*
// @match https://www.porngo.com/embed/*
// @match https://www.pornoeggs.com/embed?v=*
// @match https://www.porntrex.com/embed/*
// @match https://www.pornziz.com/embed/*
// @match https://www.sextvx.com/embed/*
// @match https://www.trendyporn.com/embed/*
// @match https://www.tube8.com.co/embed/*
// @match https://www.xozilla.com/embed/*
// @match https://www.youcrazyx.com/embed/*
// @match https://www.youjizz.com/videos/embed/*
// @match https://www.yourpornflare.com/embed/*
// @match https://xhamster.com/embed/*
// @match https://xxxbunker.com/embed/*
// ==/UserScript==

window.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

window.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const reader = new FileReader();
  reader.onload = (e) => {
    addChapters(e.target.result);
  };

  reader.readAsText(e.dataTransfer.files[0]);
});

const addChapters = (str) => {
  const times = str
    .split("\n")
    .filter((chapter) => !!chapter)
    .map((chapter) => {
      const endpoints = chapter.split(",").map((endpoint) => {
        const parts = endpoint.split(":");
        return (
          parseInt(parts[0]) * 60 * 60 +
          parseInt(parts[1]) * 60 +
          parseInt(parts[2])
        );
      });

      return {
        start: endpoints[0],
        end: endpoints[1],
      };
    });

  document.querySelector("video").ontimeupdate = (e) => {
    const currTime = e.target.currentTime;

    const found = times.find(
      (time) => currTime >= time.start && currTime <= time.end
    );

    if (!found) {
      const nearest = times.find((time) => time.start > currTime);

      if (nearest) e.target.currentTime = nearest.start;
      else e.target.currentTime = times[0].start;
    }
  };
};

document.onkeydown = (e) => {
  const video = document.querySelector("video");

  if (e.key === ",") {
    video.currentTime -= 3;
  } else if (e.key === ".") {
    video.currentTime += 3;
  } else if (e.key === "p") {
    if (video.paused) video.play();
    else video.pause();
  }
};
