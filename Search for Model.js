// ==UserScript==
// @name    Search for Model
// @version 3
// @match   https://*/*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

document.onkeydown = (e) => {
  if (e.ctrlKey && e.key === " ") {
    const model = window.prompt("What model would you like to lookup?");
    searchBrazzers(model);
    searchSisLovesMe(model);
  }
};

const searchBrazzers = (model) => {
  GM_xmlhttpRequest({
    url: `https://www.brazzers.com/pornstars?q=${model}`,
    onload: (res) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.response, "text/html");

      const anchor = [
        ...doc.querySelectorAll('span > a[href^="/pornstar/"]'),
      ].find((el) => el.innerText === "Skylar Snow");

      if (anchor)
        window.open(anchor.href.replace("/pornstar", "/videos/models"));
    },
  });
};

const searchSisLovesMe = (model) => {
  const url = `https://www.sislovesme.com/models/${model
    .toLowerCase()
    .replace(" ", "-")}`;

  GM_xmlhttpRequest({
    url,
    onload: (res) => {
      if (res.status === 200) window.open(url);
    },
  });
};
