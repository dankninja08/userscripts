// ==UserScript==
// @name    Search for Model
// @version 8
// @match   https://*/*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

const data = {
  Main: {
    Brazzers:
      "https://www.brazzers.com/pornstars/gender/female/sortby/views?q=",
    "Reality Kings":
      "https://www.realitykings.com/models?gender=female&sortby=views&q=",
    Mofos: "https://www.mofos.com/models?sortby=views&q=",
    "Team Skeet": "https://www.teamskeet.com/models/",
    MYLF: "https://www.mylf.com/models/",
    Bangbros: "https://bangbros.com/search/models/",
    "Naughty America": "https://www.naughtyamerica.com/pornstar/",
  },
  "Nubiles-Porn": {
    "Nubiles-Porn": "https://nubiles-porn.com/model/alpha/",
    "Nubile Films": "https://nubilefilms.com/model/alpha/",
    "NF Busty": "https://nfbusty.com/model/alpha/",
    "Bratty Sis": "https://brattysis.com/model/alpha/",
    "Bratty MILF": "https://brattymilf.com/model/alpha/",

    "Deep Lush": "https://deeplush.com/model/alpha/",
  },
  "Team Skeet": {
    "Sis Loves Me": "https://www.sislovesme.com/models/",
    "Dad Crush": "https://www.dadcrush.com/models/",
    "Perv Mom": "https://www.pervmom.com/models/",
    "Family Strokes": "https://www.familystrokes.com/models/",
    Shoplyfter: "https://www.shoplyfter.com/models/",

    "Anal Mom": "https://www.analmom.com/models/",
    "Bad MILFs": "https://www.badmilfs.com/models/",
    "BBC Paradise": "https://www.bbcparadise.com/models/",
    BFFs: "https://www.bffs.com/models/",
    "Daughter Swap": "https://www.daughterswap.com/models/",
    "Foster Tapes": "https://www.fostertapes.com/models/",
    "Freeuse Fantasy": "https://www.freeusefantasy.com/models/",
    "Freeuse MILF": "https://www.freeusemilf.com/models/",
    "Hijab Hookup": "https://www.hijabhookup.com/models/",
    "Little Asians": "https://www.littleasians.com/models/",
    "Mom Swap": "https://www.momswap.com/models/",
    Mylfdom: "https://www.mylfdom.com/models/",
    "Not My Grandpa": "https://www.notmygrandpa.com/models/",
    "Perv Doctor": "https://www.pervdoctor.com/models/",
    "Perv Nana": "https://www.pervnana.com/models/",
    "Perv Therapy": "https://www.pervtherapy.com/models/",
    "Sis Swap": "https://www.sisswap.com/models/",
    "Teens Love Black Cocks": "https://www.teensloveblackcocks.com/models/",
    Thickumz: "https://www.thickumz.com/models/",
    "Tiny Sis": "https://www.tinysis.com/models/",
  },
  Blacked: {
    Blacked: "https://www.blacked.com/models/",
    Vixen: "https://www.vixen.com/models/",
    Tushy: "https://www.tushy.com/models/",
    "Blacked Raw": "https://www.blackedraw.com/models/",
    "Tushy Raw": "https://www.tushyraw.com/models/",

    Deeper: "https://www.deeper.com/models/",
  },
  "Porn Pros": {
    "Porn Pros": "https://pornpros.com/girls/",
    "Passion-HD": "https://passion-hd.com/girls/",
    POVD: "https://povd.com/girls/",
    "Pure Mature": "https://puremature.com/girls/",
    "Tiny 4K": "https://tiny4k.com/girls/",

    "BBC Pie": "https://bbcpie.com/girls/",
    "Cum 4K": "https://cum4k.com/girls/",
    "Facials 4K": "https://facials4k.com/girls/",
    "Girl Cum": "https://girlcum.com/girls/",
    Holed: "https://holed.com/girls/",
    "Mom 4K": "https://mom4k.com/girls/",
    "My Very First Time": "https://myveryfirsttime.com/girls/",
    "Nanny Spy": "https://nannyspy.com/girls/",
    "Spy Fam": "https://spyfam.com/girls/",
  },
  Swallowed: {
    Swallowed: "https://tour.swallowed.com/models?order=name&sort=asc&letter=",
    Nympho: "https://tour.nympho.com/models/",
    "True Anal": "https://tour.trueanal.com/models",
    "All Anal": "https://tour.allanal.com/models",
    "Anal Only": "https://tour.analonly.com/models",
  },
  Other: {
    Blowpass: "https://www.blowpass.com/en/search/blowpass/actor/",
    "Spank Monster":
      "https://www.spankmonster.com/spank-monster--porn-stars.html?sort=ag_name",
    "Dick Drainers": "https://dickdrainers.com/tour/models/popular/",
    "Manuel Ferrara": "https://manuelferrara.com/trial/models/",
  },
};

if (
  ["www.brazzers.com", "www.mofos.com", "www.realitykings.com"].includes(
    location.hostname
  ) &&
  location.hash === "#search"
) {
  setInterval(() => {
    if (document.querySelector("section")) {
      const anchor = document.querySelector(
        `span > a[href$="${new URL(location.href).searchParams.get("q")}"]`
      );

      if (anchor)
        location.pathname = anchor.pathname
          .replace("/pornstar", "/videos/models")
          .replace(
            /\/model\/[0-9]+\/.*/,
            `/scenes?model=${anchor.pathname.match(/[0-9]+/)}`
          );
      else window.close();
    }
  }, 1000);
}

const get = async (url) => {
  return new Promise((resolve, _) => {
    GM_xmlhttpRequest({
      url,
      onload: (res) => resolve(res),
    });
  });
};

document.addEventListener("keydown", async (e) => {
  if (e.ctrlKey && e.key === " ") {
    const model = prompt("Which model would you like to look up?");

    if (model) {
      const query = model.toLowerCase().replace(" ", "-");

      for (const [network, sites] of Object.entries(data)) {
        if (network === "Main") {
          for (const [site, url] of Object.entries(sites)) {
            if (["Brazzers", "Mofos", "Reality Kings"].includes(site))
              window.open(url + query + `&letter=${query[0]}` + "#search");
            else if (["MYLF", "Naughty America", "Team Skeet"].includes(site)) {
              const res = await get(url + query);
              if (res.status === 200)
                if (
                  new URL(res.finalUrl).pathname.startsWith("/models/") ||
                  new URL(res.finalUrl).pathname.startsWith("/pornstar/")
                )
                  window.open(res.finalUrl);
            } else if (site === "Bangbros") {
              const res = await get(url + query);
              const doc = new DOMParser().parseFromString(
                res.response,
                "text/html"
              );

              const link = doc.querySelector(`a[href$="${query}"]`);
              if (link) window.open(link);
            }
          }
        } else if (network === "Nubiles-Porn") {
          for (const url of Object.values(sites)) {
            const res = await get(url + query[0]);
            const doc = new DOMParser().parseFromString(
              res.response,
              "text/html"
            );

            const link = doc.querySelector(`figcaption > a[href$="${query}"]`);
            if (link)
              window.open(
                `https://${new URL(url).hostname}${new URL(link.href).pathname}`
              );
          }
        } else if (["Blacked", "Porn Pros", "Team Skeet"].includes(network)) {
          for (const url of Object.values(sites)) {
            const res = await get(url + query);
            if (res.status === 200)
              if (
                new URL(res.finalUrl).pathname.startsWith("/models/") ||
                new URL(res.finalUrl).pathname.startsWith("/girls/")
              )
                window.open(res.finalUrl);
          }
        } else if (network === "Swallowed") {
          for (const [site, url] of Object.entries(sites)) {
            if (site === "Swallowed") {
              const res = await get(url + query[0]);
              const doc = new DOMParser().parseFromString(
                res.response,
                "text/html"
              );

              const link = doc.querySelector(`h3 > a[href$="${query}"]`);
              if (link)
                window.open(
                  `https://${new URL(url).hostname}${
                    new URL(link.href).pathname
                  }`
                );
            } else {
              const res = await get(url + query);
              if (res.status === 200) window.open(res.finalUrl);
            }
          }
        } else {
          for (const [site, url] of Object.entries(sites)) {
            if (site === "Blowpass") {
              const res = await get(url + query);
              const doc = new DOMParser().parseFromString(
                res.response,
                "text/html"
              );

              const link = doc.querySelector(
                `a[href^="/en/pornstar/blowpass/${query}"]`
              );
              if (link)
                window.open(
                  `https://${new URL(url).hostname}${
                    new URL(link.href).pathname
                  }`
                );
            } else if (site === "Spank Monster") {
              const res = await get(url.replace("--", `-${query[0]}-`));
              const doc = new DOMParser().parseFromString(
                res.response,
                "text/html"
              );

              const link = doc.querySelector(
                `a[href$="${query}-streaming-pornstar-videos.html"]`
              );
              if (link)
                window.open(
                  `https://${new URL(url).hostname}${
                    new URL(link.href).pathname
                  }`
                );
            } else if (site === "Dick Drainers") {
              const res = await get(url);
              const doc = new DOMParser().parseFromString(
                res.response,
                "text/html"
              );

              const option =
                doc.querySelector(
                  `option[value$="${query.replace("-", "")}.html"]`
                ) || document.querySelector(`option[value$="${query}.html"]`);
              if (link) window.open(option.value);
            } else if (site === "Manuel Ferrara") {
              let res = await get(url + query.replace("-", "") + ".html");
              if (res.status === 200) window.open(res.finalUrl);
              else {
                res = await get(url + query + ".html");
                if (res.status === 200) window.open(res.finalUrl);
              }
            }
          }
        }
      }
    }
  }
});
