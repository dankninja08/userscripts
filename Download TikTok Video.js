// ==UserScript==
// @name    Download TikTok Video
// @version 3
// @match   https://www.tiktok.com/*
// @grant   GM_download
// ==/UserScript==

document.onkeydown = (e) => {
  if (e.key === "/") {
    if (location.pathname.includes("/video/")) {
      const slut = location.pathname.split("/")[1];
      const id = location.pathname.split("/")[3];
      const trend = document
        .querySelector('a[href^="/music/"]:not([data-e2e="nav-discover-href"])')
        .innerText.replace(/ \(.*\)/, "")
        .replace(/ \[.*\]/, "");
      const videoUrl = document.querySelector('div[data-e2e="browse-video"]')
        .children[0].src;

      GM_download(videoUrl, `${slut} | ${id} (${trend}).mp4`);
    } else {
      const intervalId = setInterval(() => {
        if (
          Math.round(window.innerHeight + window.scrollY) >=
          document.body.offsetHeight
        ) {
          clearInterval(intervalId);
          sortVideos();
        } else window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
    }
  }
};

const sortVideos = () => {
  const sorted = [
    ...document.querySelector('div[data-e2e="user-post-item-list"]').children,
  ].sort((a, b) => {
    const countStrA = a.querySelector("strong").innerText;
    const countStrB = b.querySelector("strong").innerText;

    const countA = countStrA.endsWith("K")
      ? parseFloat(countStrA) * 1000
      : countStrA.endsWith("M")
      ? parseFloat(countStrA) * 1000000
      : parseInt(countStrA);
    const countB = countStrB.endsWith("K")
      ? parseFloat(countStrB) * 1000
      : countStrB.endsWith("M")
      ? parseFloat(countStrB) * 1000000
      : parseInt(countStrB);

    if (countA < countB) return 1;
    else if (countA > countB) return -1;
    else return 0;
  });

  document
    .querySelector('div[data-e2e="user-post-item-list"]')
    .replaceChildren(...sorted);
};

window.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

window.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const ids = [...e.dataTransfer.files].map(
    (file) => file.name.match(/[0-9]{10,}/)[0]
  );

  const anchors = [...document.querySelectorAll('a[href*="/video/"]')];

  ids.forEach((id) => {
    const el = anchors.find((anchor) => anchor.href.includes(id));

    if (el) el.querySelector("img").style.opacity = 0.3;
  });
});
