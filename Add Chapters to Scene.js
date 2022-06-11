// ==UserScript==
// @name    Add Chapters to Scene
// @version 5
// @match   https://www.fpo.xxx/embed/*
// @match   https://hclips.com/embed/*
// @match   https://hdzog.com/embed/*
// @match   https://www.peekvids.com/embed?v=*
// @match   https://www.playvids.com/embed/*
// @match   https://www.pornflip.com/embed/*
// @match   https://pornhits.com/embed.php?id=*
// @match   https://www.pornoeggs.com/embed?v=*
// @match   https://www.porntrex.com/embed/*
// @match   https://pornwild.com/embed/*
// @match   https://spankbang.com/embed/*
// @match   https://player.tnaflix.com/video/*
// @match   https://txxx.com/embed/*
// @match   https://upornia.com/embed/*
// @match   https://xhamster.com/embed/*
// @match   https://www.yourpornflare.com/embed/*
// ==/UserScript==

const data = {
  "Brazzers - Katie Morgan, Ryan Keely - Don't Wake Your Girlfriend": [
    { start: "00:06:43", end: "00:08:10" },
    { start: "00:16:40", end: "00:17:37" },
    { start: "00:22:40", end: "00:25:36" },
    { start: "00:38:52", end: "00:39:24" },
  ],
  "Brazzers - Megan Rain - A Teen Tied Me Up": [
    { start: "00:02:32", end: "00:03:19" },
    { start: "00:04:55", end: "00:10:14" },
    { start: "00:13:37", end: "00:14:39" },
    { start: "00:16:07", end: "00:17:35" },
    { start: "00:20:14", end: "00:20:31" },
    { start: "00:34:58", end: "00:36:04" },
  ],
  "Brazzers - Megan Rain - Don't Be Shy": [
    { start: "00:05:11", end: "00:11:01" },
    { start: "00:15:27", end: "00:17:39" },
    { start: "00:27:23", end: "00:30:15" },
    { start: "00:35:43", end: "00:36:17" },
    { start: "00:40:35", end: "00:41:14" },
  ],
  "Brazzers - Megan Rain - Prime Real Estate": [
    { start: "00:05:09", end: "00:05:39" },
    { start: "00:13:07", end: "00:18:23" },
    { start: "00:27:38", end: "00:28:11" },
  ],
  "Brazzers - Megan Rain - Spa Day At Home": [
    { start: "00:03:34", end: "00:07:53" },
    { start: "00:24:29", end: "00:26:06" },
  ],
  "Reality Kings - Karlee Grey - Super Hot Masseuse": [
    { start: "00:05:22", end: "00:15:39" },
  ],
  "Reality Kings - Nicolette Shea - Front Page Poon": [
    { start: "00:04:50", end: "00:06:06" },
    { start: "00:08:38", end: "00:12:45" },
    { start: "00:31:47", end: "00:36:53" },
  ],
};

const timeToSeconds = (time) => {
  const parts = time.split(":");
  return (
    parseInt(parts[0]) * 60 * 60 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  );
};

const times = data[decodeURIComponent(location.hash.substring(1))].map(
  ({ start, end }) => ({ start: timeToSeconds(start), end: timeToSeconds(end) })
);

const video = document.querySelector("video");

video.ontimeupdate = (e) => {
  const found = times.find(
    (time) =>
      e.target.currentTime >= time.start && e.target.currentTime <= time.end
  );

  if (!found) {
    const nearest = times.find((time) => time.start > e.target.currentTime);

    if (nearest) e.target.currentTime = nearest.start;
    else e.target.currentTime = times[0].start;
  }
};

document.onkeydown = (e) => {
  switch (e.key) {
    case ",":
      video.currentTime -= 3;
      break;

    case ".":
      video.currentTime += 3;
      break;

    case "p":
      if (video.paused) video.play();
      else video.pause();
      break;
  }
};
