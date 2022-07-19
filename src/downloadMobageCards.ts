// ==UserScript==
// @name    Download Mobage Cards
// @match   https://sp.mbga.tv/hsdd/list*
// @grant   GM.xmlHttpRequest
// @run-at  document-start
// ==/UserScript==

import { request } from './util';

document.ontouchstart = () => {};

document.addEventListener('keydown', async (e) => {
  if (e.metaKey && e.key === 's') {
    e.preventDefault();

    for (const card of [
      ...document.querySelectorAll<HTMLAnchorElement>('a[href^="/hsdd/card/"]'),
    ].reverse()) {
      const title = card.innerText.split('(')[0];

      if (!title.includes('EX')) {
        for (const [i, img] of [...card.querySelectorAll('img')].entries()) {
          const data = await request({
            url: img.src.replace('/r/', '/l/'),
            responseType: 'blob',
            headers: { referer: 'https://sp.mbga.tv/' },
          });

          const a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([data.response as Blob]));
          a.download = `${title} - ${i + 1}.jpeg`;

          a.click();
        }
      }
    }
  }
});
