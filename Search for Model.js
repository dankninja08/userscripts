// ==UserScript==
// @name    Search for Model
// @version 4
// @match   https://*/*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

const directUrls = [
  "https://www.adulttime.com/actor/",
  "https://www.analmom.com/models/",
  "https://www.badmilfs.com/models/",
  "https://www.bbcparadise.com/models/",
  "https://bbcpie.com/girls/",
  "https://www.bffs.com/models/",
  "https://www.blacked.com/models/",
  "https://www.blackedraw.com/models/",
  "https://cum4k.com/girls/",
  "https://www.dadcrush.com/models/",
  "https://www.daughterswap.com/models/",
  "https://www.deeper.com/models/",
  "https://facials4k.com/girls/",
  "https://www.familystrokes.com/models/",
  "https://www.fostertapes.com/models/",
  "https://www.blacked.com/models/",
  "https://www.freeusefantasy.com/models/",
  "https://www.freeusemilf.com/models/",
  "https://girlcum.com/girls/",
  "https://www.hijabhookup.com/models/",
  "https://holed.com/girls/",
  "https://www.littleasians.com/models/",
  "https://mom4k.com/girls/",
  "https://www.momswap.com/models/",
  "https://www.mylf.com/models/",
  "https://www.mylfdom.com/models/",
  "https://myveryfirsttime.com/girls/",
  "https://nannyspy.com/girls/",
  "https://passion-hd.com/girls/",
  "https://www.pervdoctor.com/models/",
  "https://www.pervmom.com/models/",
  "https://www.pervnana.com/models/",
  "https://www.pervtherapy.com/models/",
  "https://pornpros.com/girls/",
  "https://povd.com/girls/",
  "https://puremature.com/girls/",
  "https://www.shoplyfter.com/models/",
  "https://www.shoplyftermylf.com/models/",
  "https://www.sislovesme.com/models/",
  "https://www.sisswap.com/models/",
  "https://spyfam.com/girls/",
  "https://www.teamskeet.com/models/",
  "https://www.blacked.com/models/",
  "https://www.teensloveblackcocks.com/models/",
  "https://www.thickumz.com/models/",
  "https://tiny4k.com/girls/",
  "https://www.tinysis.com/models/",
  "https://www.tushy.com/models/",
  "https://www.tushyraw.com/models/",
  "https://www.vixen.com/models/",
];

const sites = {
  allanal: {
    name: "All Anal",
    scraper: "Swallowed",
  },
  analonly: {
    name: "Anal Only",
    scraper: "Swallowed",
  },
  bangbros: {
    scraper: "Bangbros",
  },
  blowpass: {
    scraper: "Blowpass",
  },
  brazzers: {
    name: "Brazzers",
    scraper: "Brazzers",
  },
  dickdrainers: {
    name: "Dick Drainers",
    scraper: "Dick Drainers",
  },
  fakehub: {
    scraper: "Brazzers",
  },
  littleasians: {
    name: "Little Asians",
    scraper: "Sis Loves Me",
  },
  manuelferrara: {
    name: "Manuel Ferrara",
    scraper: "Manuel Ferrara",
  },
  mofos: {
    scraper: "Brazzers",
  },
  naughtyamerica: {
    scraper: "Naughty America",
  },
  notmygrandpa: {
    name: "Not My Grandpa",
    scraper: "Sis Loves Me",
  },
  nubilefilms: {
    scraper: "Nubiles-Porn",
  },
  "nubiles-porn": {
    scraper: "Nubiles-Porn",
  },
  nympho: {
    name: "Nympho",
    scraper: "Swallowed",
  },
  realitykings: {
    name: "Reality Kings",
    scraper: "Brazzers",
  },
  spankmonster: {
    name: "Spank Monster",
    scraper: "Spank Monster",
  },
  swallowed: {
    name: "Swallowed",
    scraper: "Swallowed",
  },
  trueanal: {
    name: "True Anal",
    scraper: "Swallowed",
  },
};

// if (location.href.startsWith("https://www.brazzers.com/pornstars?q=")) {
//   setInterval(() => {
//     if (document.querySelector("section")) {
//       const anchor = [
//         ...document.querySelectorAll('span > a[href^="/pornstar/"]'),
//       ].find((el) => el.innerText === "Skylar Snow");

//       if (anchor)
//         location.href = anchor.href.replace("/pornstar", "/videos/models");
//       else window.close();
//     }
//   }, 1000);
// }

document.onkeydown = (e) => {
  if (e.ctrlKey && e.key === " ") {
    const model = window
      .prompt("What model would you like to lookup?")
      .toLowerCase()
      .replace(" ", "-");

    for (const url of directUrls) {
      GM_xmlhttpRequest({
        url: url + model,
        onload: (res) => {
          if (res.status === 200) window.open(url + model);
        },
      });
    }
  }
};

const searchBrazzers = (model) => {
  window.open(`https://www.brazzers.com/pornstars?q=${model}`);
};
