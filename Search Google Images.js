// ==UserScript==
// @name          Search Google Images
// @match         https://*/*
// ==/UserScript==

document.querySelectorAll("img").forEach((img) => {
  img.onclick = (e) => {
    const googleSearch =
      "https://www.google.com/searchbyimage?image_url=" + img.src;

    console.log(googleSearch);
  };
});
