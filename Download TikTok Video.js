// ==UserScript==
// @name  Download TikTok Video
// @match https://www.tiktok.com/*
// @grant GM_download
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
    }
  }
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
