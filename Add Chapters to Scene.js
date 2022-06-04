// ==UserScript==
// @name    Add Chapters to Scene
// @version 2
// @match   https://embed.redtube.com/?id=*
// @match   https://hclips.com/embed/*
// @match   https://hdzog.com/embed/*
// @match   https://player.tnaflix.com/video/*
// @match   https://pornhits.com/embed.php?id=*
// @match   https://pornwild.com/embed/*
// @match   https://spankbang.com/embed/*
// @match   https://txxx.com/embed/*
// @match   https://upornia.com/embed/*
// @match   https://www.cumlouder.com/embed/*
// @match   https://www.fpo.xxx/embed/*
// @match   https://www.peekvids.com/embed?v=*
// @match   https://www.playvids.com/embed/*
// @match   https://www.pornflip.com/embed/*
// @match   https://www.pornoeggs.com/embed?v=*
// @match   https://www.porntrex.com/embed/*
// @match   https://www.youcrazyx.com/embed/*
// @match   https://www.yourpornflare.com/embed/*
// @match   https://xhamster.com/embed/*
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
