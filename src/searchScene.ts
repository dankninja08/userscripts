// ==UserScript==
// @name    Search Scene
// @match   https://bangbros.com/*
// @match   https://www.blowpass.com/*
// @match   https://dickdrainers.com/*
// @match   https://manuelferrara.com/*
// @match   https://www.naughtyamerica.com/*
// @match   https://www.spankmonster.com/*
//
// @match   https://www.babes.com/*
// @match   https://www.brazzers.com/*
// @match   https://www.fakehub.com/*
// @match   https://www.mofos.com/*
// @match   https://www.realitykings.com/*
//
// @match   https://brattysis.com/*
// @match   https://deeplush.com/*
// @match   https://momlover.com/*
// @match   https://nfbusty.com/*
// @match   https://nubilefilms.com/*
// @match   https://nubiles-porn.com/*
//
// @match   https://www.mylf.com/*
// @match   https://www.teamskeet.com/*
//
// @match   https://www.blacked.com/*
// @match   https://www.blackedraw.com/*
// @match   https://www.deeper.com/*
// @match   https://www.tushy.com/*
// @match   https://www.tushyraw.com/*
// @match   https://www.vixen.com/*
//
// @match   https://tour.allanal.com/*
// @match   https://tour.analonly.com/*
// @match   https://tour.nympho.com/*
// @match   https://tour.swallowed.com/*
// @match   https://tour.trueanal.com/*
//
// @match   https://www.analmom.com/*
// @match   https://www.badmilfs.com/*
// @match   https://www.bbcparadise.com/*
// @match   https://www.bffs.com/*
// @match   https://www.dadcrush.com/*
// @match   https://www.daughterswap.com/*
// @match   https://www.familystrokes.com/*
// @match   https://www.fostertapes.com/*
// @match   https://www.freeusefantasy.com/*
// @match   https://www.freeusemilf.com/*
// @match   https://www.hijabhookup.com/*
// @match   https://www.littleasians.com/*
// @match   https://www.momswap.com/*
// @match   https://www.mylfdom.com/*
// @match   https://www.notmygrandpa.com/*
// @match   https://www.pervdoctor.com/*
// @match   https://www.pervmom.com/*
// @match   https://www.pervnana.com/*
// @match   https://www.pervtherapy.com/*
// @match   https://www.shoplyfter.com/*
// @match   https://www.shoplyftermylf.com/*
// @match   https://www.sislovesme.com/*
// @match   https://www.sisswap.com/*
// @match   https://www.teensloveblackcocks.com/*
// @match   https://www.thickumz.com/*
// @match   https://www.tinysis.com/*
//
// @match   https://bbcpie.com/*
// @match   https://cum4k.com/*
// @match   https://facials4k.com/*
// @match   https://girlcum.com/*
// @match   https://holed.com/*
// @match   https://mom4k.com/*
// @match   https://nannyspy.com/*
// @match   https://passion-hd.com/*
// @match   https://pornpros.com/*
// @match   https://povd.com/*
// @match   https://puremature.com/*
// @match   https://spyfam.com/*
// @match   https://tiny4k.com/*
// ==/UserScript==

type SiteMap = {
  [name: string]: {
    name?: string;
    scraper?: string;
  };
};

const sites: SiteMap = {
  "1000facials": { name: "1000 Facials" },
  allanal: { name: "All Anal", scraper: "Swallowed" },
  analmom: { name: "Anal Mom", scraper: "Sis Loves Me" },
  analonly: { name: "Anal Only", scraper: "Swallowed" },
  babes: { name: "Babes", scraper: "Brazzers" },
  badmilfs: { name: "Bad MILFs", scraper: "Sis Loves Me" },
  bangbros: { scraper: "Bangbros" },
  bbcparadise: { name: "BBC Paradise", scraper: "Sis Loves Me" },
  bbcpie: { name: "BBC Pie", scraper: "Porn Pros" },
  bffs: { name: "BFFs", scraper: "Sis Loves Me" },
  blacked: { name: "Blacked", scraper: "Blacked" },
  blackedraw: { name: "Blacked Raw", scraper: "Blacked" },
  blowpass: { scraper: "Blowpass" },
  brattysis: { name: "Bratty Sis", scraper: "Nubiles-Porn" },
  brazzers: { name: "Brazzers", scraper: "Brazzers" },
  cum4k: { name: "Cum 4K", scraper: "Porn Pros" },
  dadcrush: { name: "Dad Crush", scraper: "Sis Loves Me" },
  daughterswap: { name: "Daughter Swap", scraper: "Sis Loves Me" },
  deeper: { name: "Deeper", scraper: "Blacked" },
  deeplush: { name: "Deep Lush", scraper: "Nubiles-Porn" },
  dickdrainers: { name: "Dick Drainers", scraper: "Dick Drainers" },
  facials4k: { name: "Facials 4K", scraper: "Porn Pros" },
  fakehub: { name: "Fake Hub", scraper: "Brazzers" },
  familystrokes: { name: "Family Strokes", scraper: "Sis Loves Me" },
  fostertapes: { name: "Foster Tapes", scraper: "Sis Loves Me" },
  freeusefantasy: { name: "Freeuse Fantasy", scraper: "Sis Loves Me" },
  freeusemilf: { name: "Freeuse MILF", scraper: "Sis Loves Me" },
  girlcum: { name: "Girl Cum", scraper: "Porn Pros" },
  hijabhookup: { name: "Hijab Hookup", scraper: "Sis Loves Me" },
  holed: { name: "Holed", scraper: "Porn Pros" },
  littleasians: { name: "Little Asians", scraper: "Sis Loves Me" },
  manuelferrara: { name: "Manuel Ferrara", scraper: "Manuel Ferrara" },
  mofos: { name: "Mofos", scraper: "Brazzers" },
  mom4k: { name: "Mom 4K", scraper: "Porn Pros" },
  momlover: { scraper: "Nubiles-Porn" },
  mommyblowsbest: { name: "Mommy Blows Best" },
  momswap: { name: "Mom Swap", scraper: "Sis Loves Me" },
  mylf: { scraper: "Team Skeet" },
  mylfdom: { name: "Mylf Dom", scraper: "Sis Loves Me" },
  myveryfirsttime: { name: "My Very First Time", scraper: "Porn Pros" },
  nannyspy: { name: "Nanny Spy", scraper: "Porn Pros" },
  naughtyamerica: { scraper: "Naughty America" },
  nfbusty: { name: "NF Busty", scraper: "Nubiles-Porn" },
  notmygrandpa: { name: "Not My Grandpa", scraper: "Sis Loves Me" },
  nubilefilms: { scraper: "Nubiles-Porn" },
  "nubiles-porn": { scraper: "Nubiles-Porn" },
  nympho: { name: "Nympho", scraper: "Swallowed" },
  onlyteenblowjobs: { name: "Only Teen Blowjobs" },
  "passion-hd": { name: "Passion HD", scraper: "Porn Pros" },
  pervdoctor: { name: "Perv Doctor", scraper: "Sis Loves Me" },
  pervmom: { name: "Perv Mom", scraper: "Sis Loves Me" },
  pervnana: { name: "Perv Nana", scraper: "Sis Loves Me" },
  pervtherapy: { name: "Perv Therapy", scraper: "Sis Loves Me" },
  pornpros: { name: "Porn Pros", scraper: "Porn Pros" },
  povd: { name: "POVD", scraper: "Porn Pros" },
  puremature: { name: "Pure Mature", scraper: "Porn Pros" },
  realitykings: { name: "Reality Kings", scraper: "Brazzers" },
  shoplyfter: { name: "Shoplyfter", scraper: "Sis Loves Me" },
  shoplyftermylf: { name: "Shoplyfter Mylf", scraper: "Sis Loves Me" },
  sislovesme: { name: "Sis Loves Me", scraper: "Sis Loves Me" },
  sisswap: { name: "Sis Swap", scraper: "Sis Loves Me" },
  spankmonster: { name: "Spank Monster", scraper: "Spank Monster" },
  spyfam: { name: "Spy Fam", scraper: "Porn Pros" },
  swallowed: { name: "Swallowed", scraper: "Swallowed" },
  teamskeet: { scraper: "Team Skeet" },
  teensloveblackcocks: {
    name: "Teens Love Black Cocks",
    scraper: "Sis Loves Me",
  },
  thickumz: { name: "Thickumz", scraper: "Sis Loves Me" },
  throated: { name: "Throated" },
  tiny4k: { name: "Tiny 4K", scraper: "Porn Pros" },
  tinysis: { name: "Tiny Sis", scraper: "Sis Loves Me" },
  trueanal: { name: "True Anal", scraper: "Swallowed" },
  tushy: { name: "Tushy", scraper: "Blacked" },
  tushyraw: { name: "Tushy Raw", scraper: "Blacked" },
  vixen: { name: "Vixen", scraper: "Blacked" },
};

type ScraperMap = {
  [key: string]: {
    link: string;
    site?: string;
    title: string;
    girls: string;
  };
};

const scrapers: ScraperMap = {
  Bangbros: {
    link: 'a[href^="/video"]:not([href^="/videos"])',
    site: '.vdoCast > a[href^="/websites/"]',
    title: "h1",
    girls: '.vdoCast > a[href^="/model"]',
  },
  Blacked: {
    link: 'a[href^="/videos/"]',
    title: "h1[data-test-component]",
    girls: 'div[data-test-component="VideoModels"] a',
  },
  Blowpass: {
    link: 'a[href^="/en/video/"]',
    title: ".sceneTitle",
    girls: ".actorCarousel a",
  },
  Brazzers: {
    link: 'a[href^="/video/"], a[href^="/scene/"]',
    site: 'section a[href^="/scenes?site="] :last-child',
    title: "h1, h2",
    girls: "h1 + div a, h2 + div a, h2 + h2 a",
  },
  "Dick Drainers": {
    link: 'a[href^="https://dickdrainers.com/tour/trailers/"]',
    title: "h3",
    girls: ".update_models a",
  },
  "Manuel Ferrara": {
    link: 'a[href^="https://manuelferrara.com/trial/scenes/"]',
    title: ".title_bar_hilite",
    girls: ".backgroundcolor_info > .update_models > a",
  },
  "Naughty America": {
    link: 'a[href^="https://www.naughtyamerica.com/scene/"]',
    site: ".site-title",
    title: "h1.scene-title",
    girls: ".performer-list > a",
  },
  "Nubiles-Porn": {
    link: 'a[href^="/video/watch/"]',
    title: "h2",
    girls: ".content-pane-performer",
  },
  "Porn Pros": {
    link: 'a[href^="/video/"]',
    title: "h1.t2019-stitle",
    girls: "#t2019-models > a",
  },
  "Sis Loves Me": {
    link: 'a[href^="/movies/"]',
    title: ".video-title",
    girls: ".video-content .model-name-link",
  },
  "Spank Monster": {
    link: 'a[href$="-streaming-scene-video.html"]',
    title: "h1.description",
    girls: ".video-performer-name > span",
  },
  Swallowed: {
    link: 'a[href^="https://tour.swallowed.com/view/"], a[href^="/scenes/"]',
    title: ".title",
    girls: ".content-meta-wrap a",
  },
  "Team Skeet": {
    link: 'a[href^="/movies/"]',
    site: ".siteName > a",
    title: ".sceneTitle",
    girls: ".model-name-link",
  },
};

const components = location.hostname.split(".");
const siteName = components[components.length - 2];

const scraper = sites[siteName].scraper;
const selectors = scrapers[scraper!];

const handler = (list: HTMLAnchorElement[]) => {
  for (const scene of list) {
    scene.addEventListener("click", async (e) => {
      e.preventDefault();

      const res = await fetch(scene.href);
      const data = await res.text();
      const doc = new DOMParser().parseFromString(data, "text/html");

      const site =
        siteName === "realitykings"
          ? doc.querySelector('a[href^="/scenes?site="]')!.textContent!.trim()
          : siteName === "babes"
          ? doc
              .querySelector('a[href^="/scenes?site="]')!
              .textContent!.trim()
              .trim()
              .toLowerCase()
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")
          : scraper === "Nubiles-Porn"
          ? doc
              .querySelector<HTMLElement>(".site-link")
              ?.innerText.trim()
              .split(/(?=[A-Z])/)
              .join(" ")
              .replace(".com", "") || sites[siteName].name
          : scraper === "Blowpass"
          ? sites[
              doc
                .querySelector<HTMLElement>(".siteNameSpan")!
                .innerText.toLowerCase()
                .replace(".com", "")
            ].name
          : doc.querySelector<HTMLElement>(selectors.site!)?.innerText.trim() ||
            sites[siteName].name;

      const title = doc
        .querySelector<HTMLElement>(selectors.title)!
        .innerText.trim();

      const girls = [...doc.querySelectorAll<HTMLElement>(selectors.girls)]
        .map((el) =>
          scraper === "Blacked"
            ? el.innerText
                .trim()
                .toLowerCase()
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")
            : el.innerText.trim()
        )
        .join(", ")
        .replace(",,", ",");

      window.open(
        `https://www.google.com/search?q=${site} - ${girls} - ${title}`
      );
    });
  }
};

if (scraper === "Brazzers") {
  let previousUrl = "";

  const observer = new MutationObserver((_mutations, _observer) => {
    if (window.location.href !== previousUrl) {
      previousUrl = window.location.href;

      const int = setInterval(() => {
        const list = [
          ...document.querySelectorAll<HTMLAnchorElement>(selectors.link),
        ];
        if (list.length > 0) {
          handler(list);
          clearInterval(int);
        }
      }, 100);
    }
  });

  observer.observe(document.querySelector("#root")!, {
    childList: true,
    subtree: true,
  });
} else
  handler([...document.querySelectorAll<HTMLAnchorElement>(selectors.link)]);
