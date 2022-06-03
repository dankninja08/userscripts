// ==UserScript==
// @name  Generate Google Search
// @match https://bangbros.com/*
// @match https://dickdrainers.com/*
// @match https://manuelferrara.com/*
// @match https://nubilefilms.com/*
// @match https://nubiles-porn.com/*
// @match https://tour.allanal.com/*
// @match https://tour.analonly.com/*
// @match https://tour.nympho.com/*
// @match https://tour.swallowed.com/*
// @match https://tour.trueanal.com/*
// @match https://www.analmom.com/*
// @match https://www.badmilfs.com/*
// @match https://www.bbcparadise.com/*
// @match https://www.bffs.com/*
// @match https://www.blacked.com/*
// @match https://www.blackedraw.com/*
// @match https://www.blowpass.com/*
// @match https://www.brazzers.com/*
// @match https://www.dadcrush.com/*
// @match https://www.daughterswap.com/*
// @match https://www.deeper.com/*
// @match https://www.fakehub.com/*
// @match https://www.familystrokes.com/*
// @match https://www.fostertapes.com/*
// @match https://www.freeusefantasy.com/*
// @match https://www.freeusemilf.com/*
// @match https://www.hijabhookup.com/*
// @match https://www.littleasians.com/*
// @match https://www.mofos.com/*
// @match https://www.momswap.com/*
// @match https://www.mylf.com/*
// @match https://www.mylfdom.com/*
// @match https://www.notmygrandpa.com/*
// @match https://www.pervdoctor.com/*
// @match https://www.pervmom.com/*
// @match https://www.pervnana.com/*
// @match https://www.pervtherapy.com/*
// @match https://www.realitykings.com/*
// @match https://www.shoplyfter.com/*
// @match https://www.shoplyftermylf.com/*
// @match https://www.sislovesme.com/*
// @match https://www.sisswap.com/*
// @match https://www.teamskeet.com/*
// @match https://www.teensloveblackcocks.com/*
// @match https://www.thickumz.com/*
// @match https://www.tinysis.com/*
// @match https://www.tushy.com/*
// @match https://www.tushyraw.com/*
// @match https://www.vixen.com/*
// ==/UserScript==

const sites = {
  "1000facials": {
    name: "1000 Facials",
  },
  allanal: {
    name: "All Anal",
    scraper: "Swallowed",
  },
  analmom: {
    name: "Anal Mom",
    scraper: "Sis Loves Me",
  },
  analonly: {
    name: "Anal Only",
    scraper: "Swallowed",
  },
  badmilfs: {
    name: "Bad MILFs",
    scraper: "Sis Loves Me",
  },
  bangbros: {
    scraper: "Bangbros",
  },
  bbcparadise: {
    name: "BBC Paradise",
    scraper: "Sis Loves Me",
  },
  bffs: {
    name: "BFFs",
    scraper: "Sis Loves Me",
  },
  blacked: {
    name: "Blacked",
    scraper: "Blacked",
  },
  blackedraw: {
    name: "Blacked Raw",
    scraper: "Blacked",
  },
  blowpass: {
    scraper: "Blowpass",
  },
  brazzers: {
    name: "Brazzers",
    scraper: "Brazzers",
  },
  dadcrush: {
    name: "Dad Crush",
    scraper: "Sis Loves Me",
  },
  daughterswap: {
    name: "Daughter Swap",
    scraper: "Sis Loves Me",
  },
  deeper: {
    name: "Deeper",
    scraper: "Blacked",
  },
  dickdrainers: {
    name: "Dick Drainers",
    scraper: "Dick Drainers",
  },
  fakehub: {
    scraper: "Brazzers",
  },
  familystrokes: {
    name: "Family Strokes",
    scraper: "Sis Loves Me",
  },
  fostertapes: {
    name: "Foster Tapes",
    scraper: "Sis Loves Me",
  },
  freeusefantasy: {
    name: "Freeuse Fantasy",
    scraper: "Sis Loves Me",
  },
  freeusemilf: {
    name: "Freeuse MILF",
    scraper: "Sis Loves Me",
  },
  hijabhookup: {
    name: "Hijab Hookup",
    scraper: "Sis Loves Me",
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
  mommyblowsbest: {
    name: "Mommy Blows Best",
  },
  momswap: {
    name: "Mom Swap",
    scraper: "Sis Loves Me",
  },
  mylf: {
    scraper: "Team Skeet",
  },
  mylfdom: {
    name: "Mylf Dom",
    scraper: "Sis Loves Me",
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
  onlyteenblowjobs: {
    name: "Only Teen Blowjobs",
  },
  pervdoctor: {
    name: "Perv Doctor",
    scraper: "Sis Loves Me",
  },
  pervmom: {
    name: "Perv Mom",
    scraper: "Sis Loves Me",
  },
  pervnana: {
    name: "Perv Nana",
    scraper: "Sis Loves Me",
  },
  pervtherapy: {
    name: "Perv Therapy",
    scraper: "Sis Loves Me",
  },
  realitykings: {
    name: "Reality Kings",
    scraper: "Brazzers",
  },
  shoplyfter: {
    name: "Shoplyfter",
    scraper: "Sis Loves Me",
  },
  shoplyftermylf: {
    name: "Shoplyfter Mylf",
    scraper: "Sis Loves Me",
  },
  sislovesme: {
    name: "Sis Loves Me",
    scraper: "Sis Loves Me",
  },
  sisswap: {
    name: "Sis Swap",
    scraper: "Sis Loves Me",
  },
  spankmonster: {
    name: "Spank Monster",
    scraper: "Spank Monster",
  },
  swallowed: {
    name: "Swallowed",
    scraper: "Swallowed",
  },
  teamskeet: {
    scraper: "Team Skeet",
  },
  teensloveblackcocks: {
    name: "Teens Love Black Cocks",
    scraper: "Sis Loves Me",
  },
  thickumz: {
    name: "Thickumz",
    scraper: "Sis Loves Me",
  },
  throated: {
    name: "Throated",
  },
  tinysis: {
    name: "Tiny Sis",
    scraper: "Sis Loves Me",
  },
  trueanal: {
    name: "True Anal",
    scraper: "Swallowed",
  },
  tushy: {
    name: "Tushy",
    scraper: "Blacked",
  },
  tushyraw: {
    name: "Tushy Raw",
    scraper: "Blacked",
  },
  vixen: {
    name: "Vixen",
    scraper: "Blacked",
  },
};

document.onkeydown = (e) => {
  if (e.key === "/") {
    const components = location.hostname.split(".");
    const name = components[components.length - 2];

    switch (sites[name].scraper) {
      case "Bangbros":
        [...document.querySelectorAll(".thmb_lnk")].forEach((scene) => {
          const el = scene.parentElement;

          const site = el.querySelector(".thmb_mr_lnk span").innerText.trim();
          const title = el.querySelector(".thmb_ttl").innerText.trim();
          const girls = [...el.querySelectorAll(".cast")]
            .map((el) => el.innerText.trim())
            .join(", ");

          scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
        });
      case "Blacked":
        [
          ...document.querySelectorAll('a[class^="VideoThumbnailPreview"]'),
        ].forEach((scene) => {
          const el = scene.parentElement.nextElementSibling;

          const site = sites[name].name;
          const title = el
            .querySelector('a[data-test-component="TitleLink"]')
            ?.innerText.trim();
          const girls = [
            ...el.querySelectorAll('div[data-test-component="Models"] a'),
          ]
            .map((el) =>
              el.innerText
                .trim()
                .toLowerCase()
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")
            )
            .join(", ");

          scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
        });
      case "Blowpass":
        [...document.querySelectorAll(".imgLink")].forEach((scene) => {
          const el = scene.nextElementSibling;

          const site =
            sites[
              el
                .querySelector(".fromSite strong")
                .innerText.trim()
                .split(".")[0]
            ].name;
          const title = el.querySelector(".sceneTitle a").innerText.trim();
          const girls = [...el.querySelector(".sceneActors").children]
            .map((el) => el.innerText.trim())
            .join(", ");

          scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
        });
      case "Brazzers":
        [...document.querySelectorAll('a[href^="/video/"], a[href^="/scene/"]')]
          .filter((el) => el.children.length > 0)
          .forEach((scene) => {
            const el = scene.parentElement.nextElementSibling;

            const site =
              el.querySelector('a[href^="/scenes?site="]')?.children[1]
                .innerText || sites[name].name;
            const title = el
              .querySelector('a[href^="/video/"], a[href^="/scene/"]')
              .innerText.trim();
            const girls = [
              ...el.querySelectorAll(
                'a[href^="/pornstar/"], a[href^="/model/"], a[href^="/modelprofile/"]'
              ),
            ]
              .map((el) => el.innerText.trim())
              .join(", ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          });
      case "Dick Drainers":
        [...document.querySelectorAll(".left a, .item-thumb a")].forEach(
          (scene) => {
            const el = scene.parentElement.parentElement;

            const site = sites[name].name;
            const title = location.href.includes("/movies/")
              ? el.parentElement
                  .querySelector("h3 a")
                  .innerText.trim()
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")
              : el.querySelector("h4 a").innerText.trim();
            const girls = location.href.includes("/movies/")
              ? [...el.parentElement.querySelectorAll(".update_models a")]
                  .map((el) => el.innerText.trim())
                  .join(", ")
              : el.parentElement.parentElement
                  .querySelector("h3")
                  .innerText.trim()
                  .replace(" VIDEO UPDATES", "")
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          }
        );
      case "Manuel Ferrara":
        [...document.querySelectorAll(".update_details")]
          .map((el) => el.children[0])
          .forEach((scene) => {
            const el = scene.parentElement;

            const site = sites[name].name;
            const title = el.children[2].innerText.trim();
            const girls = [...el.querySelectorAll(".update_models a")]
              .map((el) => el.innerText.trim())
              .filter((girl) => girl !== "Manuel Ferrara")
              .join(", ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          });
      case "Nubiles-Porn":
        [...document.querySelectorAll(".img-wrapper")]
          .map(
            (el) =>
              el.children[0].querySelector('a[href^="/video/watch/"]') ||
              el.children[1]
          )
          .forEach((scene) => {
            const el =
              scene.parentElement.nextElementSibling ||
              scene.parentElement.parentElement.parentElement
                .nextElementSibling;

            const site = el
              .querySelector(".site-link")
              .innerText.trim()
              .split(/(?=[A-Z])/)
              .join(" ");
            const title = el.querySelector(".title a").innerText.trim();
            const girls = [...el.querySelectorAll(".model")]
              .map((el) => el.innerText.trim())
              .join(", ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          });
      case "Sis Loves Me":
        [...document.querySelectorAll(".videoimg_wrapper a")].forEach(
          (scene) => {
            const el = scene.parentElement.parentElement.nextElementSibling;

            const site = sites[location.hostname.split(".")[1]].name;
            const title = el.querySelector(".title a").innerText.trim();
            const girls = [...el.querySelectorAll(".model-name-link")]
              .map((el) => el.innerText.trim())
              .join(", ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          }
        );
      case "Swallowed":
        [...document.querySelectorAll(".thumb-full a, .lg-thumb a")].forEach(
          (scene) => {
            const el =
              scene.parentElement.parentElement.parentElement
                .nextElementSibling;

            const site = sites[name].name;
            const title = el
              .querySelector(".title a, .content-title-wrap a")
              .innerText.trim()
              .toLowerCase()
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ");

            const girls = [
              ...el.querySelectorAll(".models a, .content-models a"),
            ]
              .map((el) =>
                el.innerText
                  .trim()
                  .replace(",", "")
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")
              )
              .join(", ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          }
        );
      case "Team Skeet":
        [...document.querySelectorAll(".videoimg_wrapper a")].forEach(
          (scene) => {
            const el = scene.parentElement.nextElementSibling;

            const site = el.querySelector(".py-1 small").innerText.trim();
            const title = el
              .querySelector(".description small")
              .innerText.trim();
            const girls = [...el.querySelectorAll(".model-name-link")]
              .map((el) => el.innerText.trim())
              .join(", ");

            scene.href = `https://www.google.com/search?q=${site} - ${girls} - ${title}`;
          }
        );
    }
  }
};
