// ==UserScript==
// @name    Search Model
// @match   https://www.google.com/search?q=*%21m&*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

import { get } from "./util";

const data = {
  Brazzers: [
    "https://www.brazzers.com/pornstars/gender/female/sortby/views?q=#",
    "https://www.fakehub.com/scenes?q=#",
    "https://www.mofos.com/models?sortby=views&q=#",
    "https://www.realitykings.com/models?gender=female&sortby=views&q=#",
  ],
  "Team Skeet": [
    "https://www.mylf.com/models/#",
    "https://www.teamskeet.com/models/#",
  ],
  "Nubiles-Porn": [
    "https://brattymilf.com/model/alpha/#",
    "https://brattysis.com/model/alpha/#",
    "https://deeplush.com/model/alpha/#",
    "https://nfbusty.com/model/alpha/#",
    "https://nubiles-porn.com/model/alpha/#",
    "https://nubilefilms.com/model/alpha/#",
  ],
  "Sis Loves Me": [
    "https://www.analmom.com/models/#",
    "https://www.badmilfs.com/models/#",
    "https://www.bbcparadise.com/models/#",
    "https://www.bffs.com/models/#",
    "https://www.dadcrush.com/models/#",
    "https://www.daughterswap.com/models/#",
    "https://www.familystrokes.com/models/#",
    "https://www.fostertapes.com/models/#",
    "https://www.freeusefantasy.com/models/#",
    "https://www.freeusemilf.com/models/#",
    "https://www.hijabhookup.com/models/#",
    "https://www.littleasians.com/models/#",
    "https://www.momswap.com/models/#",
    "https://www.mylfdom.com/models/#",
    "https://www.notmygrandpa.com/models/#",
    "https://www.pervdoctor.com/models/#",
    "https://www.pervmom.com/models/#",
    "https://www.pervnana.com/models/#",
    "https://www.pervtherapy.com/models/#",
    "https://www.shoplyfter.com/models/#",
    "https://www.shoplyftermylf.com/models/#",
    "https://www.sislovesme.com/models/#",
    "https://www.sisswap.com/models/#",
    "https://www.teensloveblackcocks.com/models/#",
    "https://www.thickumz.com/models/#",
    "https://www.tinysis.com/models/#",
  ],
  "Porn Pros": [
    "https://bbcpie.com/girls/#",
    "https://cum4k.com/girls/#",
    "https://facials4k.com/girls/#",
    "https://girlcum.com/girls/#",
    "https://holed.com/girls/#",
    "https://mom4k.com/girls/#",
    "https://nannyspy.com/girls/#",
    "https://passion-hd.com/girls/#",
    "https://pornpros.com/girls/#",
    "https://povd.com/girls/#",
    "https://puremature.com/girls/#",
    "https://spyfam.com/girls/#",
    "https://tiny4k.com/girls/#",
  ],
  Blacked: [
    "https://www.blacked.com/models/#",
    "https://www.blackedraw.com/models/#",
    "https://www.deeper.com/models/#",
    "https://www.tushy.com/models/#",
    "https://www.tushyraw.com/models/#",
    "https://www.vixen.com/models/#",
  ],
  Swallowed: [
    "https://tour.swallowed.com/search/#",
    "https://tour.nympho.com/models/#",
    "https://tour.trueanal.com/models/#",
    "https://tour.allanal.com/models/#",
    "https://tour.analonly.com/models/#",
  ],
  Other: [
    "https://bangbros.com/search/models/#",
    "https://www.blowpass.com/en/search/blowpass/actor/#",
    "https://dickdrainers.com/tour/models/#.html",
    "https://manuelferrara.com/trial/models/#.html",
    "https://www.naughtyamerica.com/pornstar/#",
    "https://www.spankmonster.com/spank-monster-#-porn-stars.html?sort=ag_name",
  ],
};

(async () => {
  const urls = [];
  let count = 0;

  let title = document.title;

  const total = Object.values(data).reduce(
    (prev, curr) => prev + curr.length,
    0
  );

  const query = new URL(location.href).searchParams
    .get("q")!
    .replace(" !m", "")
    .toLowerCase()
    .replace(" ", "-");

  for (const [group, sites] of Object.entries(data)) {
    for (const url of sites) {
      if (group === "Brazzers") {
        urls.push(url.replace("#", query));
      } else if (group === "Nubiles-Porn") {
        const data = await get({
          url: `${url.replace("#", query[0])}`,
        });
        const doc = new DOMParser().parseFromString(
          data.response as string,
          "text/html"
        );

        const links = [
          ...doc.querySelectorAll<HTMLAnchorElement>(
            `figcaption > a[href$="${query}"]`
          ),
        ];

        if (links.length === 1)
          urls.push(
            `https://${new URL(url).hostname}${new URL(links[0].href).pathname}`
          );
      } else if (["Sis Loves Me", "Blacked"].includes(group)) {
        try {
          await get({
            url: `${url.replace("#", query)}`,
          });
          urls.push(url.replace("#", query));
        } catch (err) {}
      } else if (group === "Porn Pros") {
        const data = await get({
          url: `${url.replace("#", query)}`,
        });
        if (data.finalUrl.includes("/girls/"))
          urls.push(url.replace("#", query));
      } else if (group === "Swallowed") {
        if (url.includes("tour.swallowed.com"))
          urls.push(url.replace("#", query.replace("-", " ")));
        else {
          try {
            await get({
              url: `${url.replace("#", query)}`,
            });
            urls.push(url.replace("#", query));
          } catch (err) {}
        }
      } else {
        if (url.includes("bangbros.com")) {
          const data = await get({
            url: `${url.replace("#", query)}`,
          });
          const doc = new DOMParser().parseFromString(
            data.response as string,
            "text/html"
          );

          const links = [
            ...doc.querySelectorAll<HTMLAnchorElement>(
              `.echThumb > a[href$="${query}"]`
            ),
          ];

          if (links.length === 1)
            urls.push(
              `https://${new URL(url).hostname}${
                new URL(links[0].href).pathname
              }`
            );
        } else if (url.includes("www.blowpass")) {
          const data = await get({
            url: `${url.replace("#", query)}`,
          });
          const doc = new DOMParser().parseFromString(
            data.response as string,
            "text/html"
          );

          const links = [
            ...doc.querySelectorAll<HTMLAnchorElement>(
              `a[href^="/en/pornstar/blowpass/${query
                .split("-")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join("-")}/"]`
            ),
          ];

          if (links.length === 1)
            urls.push(
              `https://${new URL(url).hostname}${
                new URL(links[0].href).pathname
              }`
            );
        } else if (
          url.includes("dickdrainers.com") ||
          url.includes("manuelferrara.com")
        ) {
          for (const variation of [query, query.replace("-", "")]) {
            try {
              const data = await get({
                url: `${url.replace("#", variation)}`,
              });
              const doc = new DOMParser().parseFromString(
                data.response as string,
                "text/html"
              );

              if (
                !doc.body.innerText.includes("Model not found or unavailable.")
              ) {
                urls.push(url.replace("#", variation));
                break;
              }
            } catch (err) {}
          }
        } else if (url.includes("www.naughtyamerica.com")) {
          const data = await get({
            url: `${url.replace("#", query)}`,
          });
          if (data.finalUrl.includes("/pornstar/"))
            urls.push(url.replace("#", query));
        } else if (url.includes("www.spankmonster.com")) {
          const data = await get({
            url: `${url.replace("#", query[0])}`,
          });
          const doc = new DOMParser().parseFromString(
            data.response as string,
            "text/html"
          );

          const links = [
            ...doc.querySelectorAll<HTMLAnchorElement>(
              `a[href$="/${query}-streaming-pornstar-videos.html"]`
            ),
          ];

          if (links.length === 1)
            urls.push(
              `https://${new URL(url).hostname}${
                new URL(links[0].href).pathname
              }`
            );
        }
      }

      document.title = `${Math.round((++count / total) * 100)}% ${title}`;
    }
  }

  document.title = title;

  for (const sites of Object.values(data)) {
    for (const site of sites) {
      const host = new URL(site).hostname;
      const url = urls.find((url) => new URL(url).hostname === host);
      if (url) window.open(url);
    }
  }
})();
