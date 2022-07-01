// ==UserScript==
// @name    Scrape Mobage Cards
// @version 4
// @match   https://sp.mbga.tv/hsdd/list*
// @grant   GM_xmlhttpRequest
// ==/UserScript==

const get = async (url) =>
  new Promise((resolve, _) => {
    GM_xmlhttpRequest({
      url,
      responseType: 'blob',
      headers: {
        referer: 'https://sp.mbga.tv/',
      },
      onload: (data) => {
        resolve(data.response);
      },
    });
  });

const pause = async () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

document.addEventListener('keydown', async (e) => {
  if (e.key === '/') {
    const links = [];

    for (const card of [
      ...document.querySelectorAll('a[href^="/hsdd/card/"]'),
    ]) {
      const title = card.innerText.split('(')[0];

      if (!title.includes('EX')) {
        for (const [i, img] of [...card.querySelectorAll('img')].entries()) {
          const data = await get(img.src.replace('/r/', '/l/'));

          const link = document.createElement('a');
          link.href = URL.createObjectURL(data);
          link.download = `${title} - ${i + 1}.jpeg`;

          links.push(link);
        }
      }
    }

    while (links.length > 0) {
      for (const link of links.splice(0, 10)) {
        link.click();
      }

      await pause();
    }
  }
});
