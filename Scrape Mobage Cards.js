// ==UserScript==
// @name    Scrape Mobage Cards
// @version 3
// @match   https://sp.mbga.tv/hsdd/list*
// @grant   GM_download
// ==/UserScript==

document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    [...document.querySelectorAll('a[href^="/hsdd/card/"]')].forEach((card) => {
      const title = card.innerText.split("(")[0];

      if (!title.includes("EX")) {
        [...card.querySelectorAll("img")].forEach((img, i) => {
          GM_download({
            url: img.src.replace("/r/", "/l/"),
            name: `${title} - ${i + 1}.jpeg`,
            headers: {
              referer: "https://sp.mbga.tv/",
            },
          });
        });
      }
    });
  }
});
