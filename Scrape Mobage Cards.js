// ==UserScript==
// @name    Scrape Mobage Cards
// @version 1
// @match   https://sp.mbga.tv/hsdd/list*
// @grant   GM_download
// ==/UserScript==

document.onkeydown = (e) => {
  if (e.key === "/") {
    [...document.querySelectorAll('a[href^="/hsdd/card/"]')].forEach((card) => {
      const title = card.innerText.split("(")[0];

      [...card.querySelectorAll("img")].forEach((img, i) => {
        GM_download({
          url: img.src.replace("/r/", "/l/"),
          name: `${title} - ${i + 1}.jpeg`,
          headers: {
            referer: "http://sp.mbga.tv/",
          },
        });
      });
    });
  }
};
