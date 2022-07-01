// ==UserScript==
// @name    Manage TikTok
// @match   https://www.tiktok.com/*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

import { get } from "./util";

document.addEventListener("keydown", async (e) => {
  if (e.key === "/") {
    if (location.pathname.includes("/video/")) {
      const slut = location.pathname.split("/")[1];
      const id = location.pathname.split("/")[3];
      const trend = document
        .querySelector<HTMLElement>(
          'a[href^="/music/"]:not([data-e2e="nav-discover-href"])'
        )!
        .innerText.replace(/ \(.*\)/, "")
        .replace(/ \[.*\]/, "");
      const url = (
        document.querySelector('div[data-e2e="browse-video"]')!
          .children[0] as HTMLVideoElement
      ).src;

      const data = await get({
        url,
        responseType: "blob",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(data.response as Blob);
      link.download = `${slut} | ${id} (${trend}).mp4`;

      link.click();
    } else {
      let count = 0;
      let stalled = 0;

      const int = setInterval(() => {
        const newCount = document.querySelector(
          'div[data-e2e="user-post-item-list"]'
        )!.children.length;

        if (newCount > count) {
          count = newCount;
          window.scrollTo(0, document.body.scrollHeight);
        } else {
          if (stalled >= 10) {
            clearInterval(int);
            sortVideos();
          } else stalled++;
        }
      }, 250);
    }
  }
});

const sortVideos = () => {
  const sorted = [
    ...document.querySelector('div[data-e2e="user-post-item-list"]')!.children,
  ].sort((a, b) => {
    const countStrA = a.querySelector("strong")!.innerText;
    const countStrB = b.querySelector("strong")!.innerText;

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
    .querySelector('div[data-e2e="user-post-item-list"]')!
    .replaceChildren(...sorted);
};

window.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

window.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const ids = [...e.dataTransfer!.files].map(
    (file) => file.name.match(/[0-9]{10,}/)![0]
  );

  const anchors = [
    ...document.querySelectorAll<HTMLAnchorElement>('a[href*="/video/"]'),
  ];

  ids.forEach((id) => {
    const el = anchors.find((anchor) => anchor.href.includes(id));

    if (el) el.querySelector("img")!.style.opacity = "0.3";
  });
});
