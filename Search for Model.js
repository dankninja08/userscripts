// ==UserScript==
// @name    Search for Model
// @version 1
// @match   https://*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

document.onkeydown((e) => {
  if (e.key === "`") {
    const model = window.prompt("What model would you like to lookup?");
    searchBrazzers(model);
  }
});

const searchBrazzers = (model) => {
  GM_xmlhttpRequest({
    url: `https://www.brazzers.com/pornstars?q=${model}`,
    onload: (res) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.response, "text/html");

      const link = [
        ...doc.querySelectorAll('span > a[href^="/pornstar/"]'),
      ].find((el) => el.innerText === "Skylar Snow");

      if (link) window.open(link.href.replace("/pornstar", "/videos/models"));
    },
  });
};
