// ==UserScript==
// @name    Add Scene to Library
// @version 1.0.0
// @match   https://hdzog.com/videos/*
// @match   https://privatehomeclips.com/videos/*
// @match   https://pornwild.com/videos/*
// @match   https://severeporn.com/videos/*
// @match   https://spankbang.com/*/video/*
// @match   https://txxx.com/videos/*
// @match   https://upornia.com/videos/*
// @match   https://www.fpo.xxx/videos/*
// @match   https://www.peekvids.com/*
// @match   https://www.playvids.com/*
// @match   https://www.pornflip.com/*
// @match   https://www.pornhits.com/video/*
// @match   https://www.porntrex.com/video/*
// @match   https://www.pornoeggs.com/*
// @match   https://www.tnaflix.com/*
// @match   https://www.yourpornflare.com/video/*
// @exclude https://www.peekvids.com/embed?v=*
// @exclude https://www.playvids.com/embed/*
// @exclude https://www.pornflip.com/embed/*
// @exclude https://www.pornoeggs.com/embed?v=*
// @grant   GM_download
// ==/UserScript==

const sites = {
  fpo: {
    template: "https://www.fpo.xxx/embed/#",
    indexOfId: 2,
  },
  hdzog: {
    template: "https://hdzog.com/embed/#",
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
  txxx: {
    template: "https://txxx.com/embed/#",
    indexOfId: 2,
  },
  upornia: {
    template: "https://upornia.com/embed/#",
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
    GM_download(downloadUrl, `${sitename}.webloc`);
  }
};
