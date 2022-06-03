// ==UserScript==
// @name          Add Scene to Library
// @match         https://goodporn.to/videos/*
// @match         https://hdzog.com/videos/*
// @match         https://momzr.com/videos/*
// @match         https://privatehomeclips.com/videos/*
// @match         https://pornwild.com/videos/*
// @match         https://severeporn.com/videos/*
// @match         https://spankbang.com/*/video/*
// @match         https://theporngod.com/videos/*
// @match         https://txxx.com/videos/*
// @match         https://upornia.com/videos/*
// @match         https://www.anon-v.net/videos/*
// @match         https://www.eachporn.com/video/*
// @match         https://www.fpo.xxx/videos/*
// @match         https://www.peekvids.com/*
// @match         https://www.playvids.com/*
// @match         https://www.pornflip.com/*
// @match         https://www.pornhits.com/video/*
// @match         https://www.porntrex.com/video/*
// @match         https://www.pornoeggs.com/*
// @match         https://www.tnaflix.com/*
// @match         https://www.xfreehd.com/video/*
// @match         https://www.yourpornflare.com/video/*
// @exclude-match https://www.peekvids.com/embed?v=*
// @exclude-match https://www.playvids.com/embed/*
// @exclude-match https://www.pornflip.com/embed/*
// @exclude-match https://www.pornoeggs.com/embed?v=*
// ==/UserScript==

const sites = {
  "anon-v": {
    template: "https://www.anon-v.net/embed/#",
    indexOfId: 2,
  },
  eachporn: {
    template: "https://www.eachporn.com/embed/#",
    indexOfId: 2,
  },
  filtercams: {
    template: "https://filtercams.com/embed/#",
    indexOfId: 2,
  },
  fpo: {
    template: "https://www.fpo.xxx/embed/#",
    indexOfId: 2,
  },
  goodporn: {
    template: "https://goodporn.to/embed/#",
    indexOfId: 2,
  },
  hdzog: {
    template: "https://hdzog.com/embed/#",
    indexOfId: 2,
  },
  momzr: {
    template: "https://momzr.com/embed/#",
    indexOfId: 2,
  },
  pornhits: {
    template: "https://pornhits.com/embed.php?id=#",
    indexOfId: 2,
  },
  pornoeggs: {
    template: "https://www.pornoeggs.com/embed?v=#",
    indexOfId: 1,
  },
  porntrex: {
    template: "https://www.porntrex.com/embed/#",
    indexOfId: 2,
  },
  pornwild: {
    template: "https://pornwild.to/embed/#",
    indexOfId: 2,
  },
  privatehomeclips: {
    template: "https://hclips.com/embed/#",
    indexOfId: 2,
  },
  severeporn: {
    template: "https://severeporn.com/embed/#",
    indexOfId: 2,
  },
  spankbang: {
    template: "https://spankbang.com/embed/#",
    indexOfId: 1,
  },
  theporngod: {
    template: "https://theporngod.com/embed/#",
    indexOfId: 2,
  },
  txxx: {
    template: "https://txxx.com/embed/#",
    indexOfId: 2,
  },
  upornia: {
    template: "https://upornia.com/embed/#",
    indexOfId: 2,
  },
  xfreehd: {
    template: "https://www.xfreehd.com/embed/#",
    indexOfId: 2,
  },
};

document.onkeydown = (e) => {
  if (e.key === "/") {
    const sitename = location.hostname.replace("www.", "").split(".")[0];

    const site = sites[sitename];

    let url;
    if (site) {
      const id = location.pathname.split("/")[site.indexOfId];
      url = site.template.replace("#", id);
    } else {
      if (
        ["peekvids", "playvids", "pornflip", "yourpornflare"].includes(sitename)
      ) {
        url = document
          .querySelector("textarea")
          .innerText.match(`https://www.${sitename}.com/embed?.*?(?=')`)[0];
      } else if (sitename === "tnaflix") {
        url = document.querySelector('meta[itemprop="embedUrl"]').content;
      }
    }

    const file = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>URL</key>
  <string>${url}</string>
</dict>
</plist>`;

    const downloadUrl = URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${sitename}.webloc`;

    link.click();
  }
};
