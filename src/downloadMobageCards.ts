// ==UserScript==
// @name    Download Mobage Cards
// @match   https://sp.mbga.tv/hsdd/list*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

import { get, pause } from "./util";

document.addEventListener("keydown", async (e) => {
  if (e.key === "/") {
    const links: HTMLAnchorElement[] = [];

    for (const card of [
      ...document.querySelectorAll('a[href^="/hsdd/card/"]'),
    ]) {
      const title = (card as any).innerText.split("(")[0];

      if (!title.includes("EX")) {
        for (const [i, img] of [...card.querySelectorAll("img")].entries()) {
          const data = await get({
            url: img.src.replace("/r/", "/l/"),
            responseType: "blob",
            headers: {
              referer: "https://sp.mbga.tv/",
            },
          });

          const link = document.createElement("a");
          link.href = URL.createObjectURL(data.response as Blob);
          link.download = `${title} - ${i + 1}.jpeg`;

          links.push(link);
        }
      }
    }

    while (links.length > 0) {
      for (const link of links.splice(0, 10)) {
        link.click();
      }

      await pause();
    }
  }
});
