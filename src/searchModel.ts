// ==UserScript==
// @name    Search Model
// @match   <all_urls>
// @grant   GM.getValue
// @grant   GM.setValue
// @grant   GM.xmlHttpRequest
// ==/UserScript==

import { pause, request, retrieve, store } from './util';

type Site = {
  url: string;
  scraper: string;
  scraperUrl?: string;
};

const sites: { [key: string]: Site } = {
  bangbros: {
    url: 'https://bangbros.com',
    scraper: 'bangbros',
    scraperUrl: 'https://bangbros.com/girls',
  },
  blacked: { url: 'https://www.blacked.com/models', scraper: 'blacked' },
  blackedraw: { url: 'https://www.blackedraw.com/models', scraper: 'blacked' },
  deeper: { url: 'https://www.deeper.com/models', scraper: 'blacked' },
  tushy: { url: 'https://www.tushy.com/models', scraper: 'blacked' },
  tushyraw: { url: 'https://www.tushyraw.com/models', scraper: 'blacked' },
  vixen: { url: 'https://www.vixen.com/models', scraper: 'blacked' },
  blowpass: {
    url: 'https://www.blowpass.com/en/pornstar/blowpass',
    scraper: 'blowpass',
    scraperUrl: 'https://www.blowpass.com/en/pornstars',
  },
  babes: { url: 'https://www.babes.com/model', scraper: 'brazzers' },
  biempire: { url: 'https://www.biempire.com/model', scraper: 'brazzers' },
  brazzers: { url: 'https://www.brazzers.com/pornstar', scraper: 'brazzers' },
  bromo: { url: 'https://www.bromo.com/model', scraper: 'brazzers' },
  digitalplayground: {
    url: 'https://www.digitalplayground.com/modelprofile',
    scraper: 'brazzers',
  },
  fakehub: {
    url: 'https://www.fakehub.com/modelprofile',
    scraper: 'brazzers',
  },
  iconmale: { url: 'https://www.iconmale.com/model', scraper: 'brazzers' },
  lookathernow: {
    url: 'https://www.lookathernow.com/model',
    scraper: 'brazzers',
  },
  men: { url: 'https://www.men.com/modelprofile', scraper: 'brazzers' },
  metrohd: { url: 'https://www.metrohd.com/model', scraper: 'brazzers' },
  milehighmedia: {
    url: 'https://www.milehighmedia.com/model',
    scraper: 'brazzers',
  },
  mofos: { url: 'https://www.mofos.com/model', scraper: 'brazzers' },
  noirmale: { url: 'https://www.noirmale.com/model', scraper: 'brazzers' },
  propertysex: {
    url: 'https://www.propertysex.com/model',
    scraper: 'brazzers',
  },
  realitykings: {
    url: 'https://www.realitykings.com/model',
    scraper: 'brazzers',
  },
  seancody: { url: 'https://www.seancody.com/model', scraper: 'brazzers' },
  sexyhub: {
    url: 'https://www.sexyhub.com/modelprofile',
    scraper: 'brazzers',
  },
  squirted: { url: 'https://www.squirted.com/model', scraper: 'brazzers' },
  transangels: {
    url: 'https://www.transangels.com/model',
    scraper: 'brazzers',
  },
  transsensual: {
    url: 'https://www.transsensual.com/model',
    scraper: 'brazzers',
  },
  trueamateurs: {
    url: 'https://www.trueamateurs.com/model',
    scraper: 'brazzers',
  },
  twistys: { url: 'https://www.twistys.com/model', scraper: 'brazzers' },
  whynotbi: { url: 'https://www.whynotbi.com/model', scraper: 'brazzers' },
  fit18: {
    url: 'https://fit18.com/models',
    scraper: 'fit18',
    scraperUrl: 'https://fit18.team18.app/graphql',
  },
  thicc18: {
    url: 'https://thicc18.com/models',
    scraper: 'fit18',
    scraperUrl: 'https://thicc18.team18.app/graphql',
  },
  naughtyamerica: {
    url: 'https://www.naughtyamerica.com/pornstar',
    scraper: 'naughtyAmerica',
    scraperUrl: 'https://www.naughtyamerica.com/pornstars/top-rated',
  },
  brattymilf: {
    url: 'https://brattymilf.com/model/profile',
    scraper: 'nubilesPorn',
    scraperUrl: 'https://brattymilf.com/model/alpha',
  },
  brattysis: {
    url: 'https://brattysis.com/model/profile',
    scraper: 'nubilesPorn',
    scraperUrl: 'https://brattysis.com/model/alpha',
  },
  deeplush: {
    url: 'https://deeplush.com/model/profile',
    scraper: 'nubilesPorn',
    scraperUrl: 'https://deeplush.com/model/alpha',
  },
  nfbusty: {
    url: 'https://nfbusty.com/model/profile',
    scraper: 'nubilesPorn',
    scraperUrl: 'https://nfbusty.com/model/alpha',
  },
  'nubiles-porn': {
    url: 'https://nubiles-porn.com/model/profile',
    scraper: 'nubilesPorn',
    scraperUrl: 'https://nubiles-porn.com/model/alpha',
  },
  nubilefilms: {
    url: 'https://nubilefilms.com/model/profile',
    scraper: 'nubilesPorn',
    scraperUrl: 'https://nubilefilms.com/model/alpha',
  },
  anal4k: {
    url: 'https://anal4k.com/girls',
    scraper: 'pornPros',
  },
  baeb: {
    url: 'https://baeb.com/girls',
    scraper: 'pornPros',
  },
  bbcpie: {
    url: 'https://bbcpie.com/girls',
    scraper: 'pornPros',
  },
  'castingcouch-x': {
    url: 'https://castingcouch-x.com/girls',
    scraper: 'pornPros',
  },
  cum4k: {
    url: 'https://cum4k.com/girls',
    scraper: 'pornPros',
  },
  exotic4k: {
    url: 'https://exotic4k.com/girls',
    scraper: 'pornPros',
  },
  facials4k: {
    url: 'https://facials4k.com/girls',
    scraper: 'pornPros',
  },
  girlcum: {
    url: 'https://girlcum.com/girls',
    scraper: 'pornPros',
  },
  holed: {
    url: 'https://holed.com/girls',
    scraper: 'pornPros',
  },
  lubed: {
    url: 'https://lubed.com/girls',
    scraper: 'pornPros',
  },
  mom4k: {
    url: 'https://mom4k.com/girls',
    scraper: 'pornPros',
  },
  nannyspy: {
    url: 'https://nannyspy.com/girls',
    scraper: 'pornPros',
  },
  'passion-hd': {
    url: 'https://passion-hd.com/girls',
    scraper: 'pornPros',
  },
  pornpros: {
    url: 'https://pornpros.com/girls',
    scraper: 'pornPros',
  },
  povd: {
    url: 'https://povd.com/girls',
    scraper: 'pornPros',
  },
  puremature: {
    url: 'https://puremature.com/girls',
    scraper: 'pornPros',
  },
  spyfam: {
    url: 'https://spyfam.com/girls',
    scraper: 'pornPros',
  },
  tiny4k: {
    url: 'https://tiny4k.com/girls',
    scraper: 'pornPros',
  },
  analmom: {
    url: 'https://www.analmom.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-alm-Od3Iqu9I/newestModels/items.json',
  },
  badmilfs: {
    url: 'https://www.badmilfs.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/Organic-bad-aiGhaiL5/newestModels/items.json',
  },
  bbcparadise: {
    url: 'https://www.bbcparadise.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-1-goide6Xo/newestModels/items.json',
  },
  bffs: {
    url: 'https://www.bffs.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/BFFS-organic-7o68xoev0j/newestModels/items.json',
  },
  dadcrush: {
    url: 'https://www.dadcrush.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/DC-organic-w8xs8e0dv3/newestModels/items.json',
  },
  daughterswap: {
    url: 'https://www.daughterswap.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/DSW-organic-dfangeym88/newestModels/items.json',
  },
  familystrokes: {
    url: 'https://www.familystrokes.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/FS-organic-1rstmyhj44/newestModels/items.json',
  },
  fostertapes: {
    url: 'https://www.fostertapes.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/FOS-organic-n5oaginage/newestModels/items.json',
  },
  freeusefantasy: {
    url: 'https://www.freeusefantasy.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-fuf-eiBei5In/newestModels/items.json',
  },
  freeusemilf: {
    url: 'https://www.freeusemilf.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-Freeusemilf-uug2tohT/newestModels/items.json',
  },
  hijabhookup: {
    url: 'https://www.hijabhookup.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-hhk-am7zoi2G/newestModels/items.json',
  },
  littleasians: {
    url: 'https://www.littleasians.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/LAS-organic-whlghevsfs/newestModels/items.json',
  },
  momswap: {
    url: 'https://www.momswap.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-momswap-6fkccwxhi0/newestModels/items.json',
  },
  mylfdom: {
    url: 'https://www.mylfdom.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-mylfdom-ieH7cuos /newestModels/items.json',
  },
  notmygrandpa: {
    url: 'https://www.notmygrandpa.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-Baepha2v-1/newestModels/items.json',
  },
  pervdoctor: {
    url: 'https://www.pervdoctor.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-doc-utei5Mai/newestModels/items.json',
  },
  pervmom: {
    url: 'https://www.pervmom.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/PVM-organic-rg7wwuc7uh/newestModels/items.json',
  },
  pervnana: {
    url: 'https://www.pervnana.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/Organic-pna-OongoaF1/newestModels/items.json',
  },
  pervtherapy: {
    url: 'https://www.pervtherapy.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-pvt-fePaiz9a/newestModels/items.json',
  },
  shoplyfter: {
    url: 'https://www.shoplyfter.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/SHL-organic-driobt7t0f/newestModels/items.json',
  },
  shoplyftermylf: {
    url: 'https://www.shoplyftermylf.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/MSL-organic-ws9h564all/newestModels/items.json',
  },
  sislovesme: {
    url: 'https://www.sislovesme.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/SLM-organic-b75inmn9fu/newestModels/items.json',
  },
  sisswap: {
    url: 'https://www.sisswap.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-swp-Jo4daep7/newestModels/items.json',
  },
  teensloveblackcocks: {
    url: 'https://www.teensloveblackcocks.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/TLBC-organic-w8bw4yp9io/newestModels/items.json',
  },
  thickumz: {
    url: 'https://www.thickumz.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/TMZ-organic-958spxinbs/newestModels/items.json',
  },
  tinysis: {
    url: 'https://www.tinysis.com/models',
    scraper: 'sisLovesMe',
    scraperUrl:
      'https://store.psmcdn.net/organic-1-saeXae9v/newestModels/items.json',
  },
  mylf: {
    url: 'https://www.mylf.com/models',
    scraper: 'teamSkeet',
    scraperUrl:
      'https://store2.psmcdn.net/mylf-elastic-hka5k7vyuw-modelscontent/_search?size=1000',
  },
  teamskeet: {
    url: 'https://www.teamskeet.com/models',
    scraper: 'teamSkeet',
    scraperUrl:
      'https://store2.psmcdn.net/ts-elastic-d5cat0jl5o-modelscontent/_search?size=5000',
  },
};

document.addEventListener('keydown', async (e) => {
  if (e.ctrlKey && e.key === 'm') {
    const query = prompt('Search for a model')!;

    if (query === '') return;

    const parts = query.split(' - ');

    const model = parts[0]
      .match(/[a-zA-Z]+/g)!
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const timestamp = await retrieve('timestamp');
    let models: { [key: string]: string[] } = await retrieve('data');

    let shouldUpdate: boolean = false;

    if (!timestamp || !models) shouldUpdate = true;
    else if (
      Date.now() > parseInt(timestamp) + 1000 * 60 * 60 * 24 &&
      confirm(
        `The database was last updated on ${new Date(
          timestamp
        ).toDateString()}. Would you like to refresh the database?`
      )
    )
      shouldUpdate = true;

    if (shouldUpdate) {
      models = {};

      let remaining: string[] = Object.keys(sites);

      const data: { [key: string]: string[] } = {};

      // const arr: string[][] = await Promise.all(
      //   Object.entries(sites).map(([_, siteData]) =>
      //     eval(`${siteData.scraper}(${siteData.scraperUrl || siteData.url})`)
      //   )
      // );

      while (remaining.length) {
        for (const siteName of remaining) {
          const siteData = sites[siteName];

          try {
            const timestamp = Date.now();

            const arr =
              siteData.scraper === 'bangbros'
                ? await bangbros(siteData.scraperUrl!)
                : siteData.scraper === 'blacked'
                ? await blacked(siteData.url!)
                : siteData.scraper === 'blowpass'
                ? await blowpass(siteData.scraperUrl!)
                : siteData.scraper === 'brazzers'
                ? await brazzers(siteData.url)
                : siteData.scraper === 'fit18'
                ? await fit18(siteName, siteData.scraperUrl!)
                : siteData.scraper === 'naughtyAmerica'
                ? await naughtyAmerica(siteData.scraperUrl!)
                : siteData.scraper === 'nubilesPorn'
                ? await nubilesPorn(siteData.scraperUrl!)
                : siteData.scraper === 'pornPros'
                ? await pornPros(siteData.url)
                : siteData.scraper === 'sisLovesMe'
                ? await sisLovesMe(siteData.scraperUrl!)
                : siteData.scraper === 'teamSkeet'
                ? await teamSkeet(siteData.scraperUrl!)
                : [];

            data[siteData.url] = arr;
            remaining = remaining.filter((site) => !site);

            console.log(remaining.length);

            console.log(
              `finished [${siteName}] in ${
                (Date.now() - timestamp) / 1000
              } seconds`
            );
          } catch (err) {}
        }

        if (remaining.length) {
          if (
            !confirm(
              `The following sites were not scraped properly. Would you like to retry?\n${remaining.map(
                (site) => `\n${site}`
              )}`
            )
          )
            break;
        }
      }

      for (const [prefix, slugs] of Object.entries(data)) {
        for (const slug of slugs) {
          const name = slug
            .match(/[a-zA-Z]+/g)!
            .map(
              (word: any) => word[0].toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
          const url = `${prefix}/${slug}`;

          const entry = models[name];
          if (entry) models[name] = [...entry, url];
          else models[name] = [url];
        }
      }

      console.log(models);

      store('data', models);
      store('timestamp', Date.now());
    }

    const urls = models[model];
    if (urls) {
      let site = parts[1]?.replace(' ', '').toLowerCase();
      if (site) {
        const url = urls.find((url) => url.includes(site));

        if (url) window.open(url);
        return;
      } else if (
        confirm(
          `The following URLs will be opened:\n${urls
            .map((url) => `\t- ${url}`)
            .join('\n')}`
        )
      ) {
        for (const url of urls) {
          window.open(url);
        }
      }
    }
  }
});

// const data = {
//   Swallowed: [
//     'https://tour.swallowed.com/search/#',
//     'https://tour.nympho.com/models/#',
//     'https://tour.trueanal.com/models/#',
//     'https://tour.allanal.com/models/#',
//     'https://tour.analonly.com/models/#',
//   ],
//   Other: [
//     'https://dickdrainers.com/tour/models/#.html',
//     'https://manuelferrara.com/trial/models/#.html',
//     'https://www.spankmonster.com/spank-monster-#-porn-stars.html?sort=ag_name',
//   ],
// };

const bangbros = async (url: string) => {
  const data = await request({ url });
  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );
  const count = parseInt(
    doc
      .querySelector<HTMLAnchorElement>('#pagination_btn_last')!
      .href.split('/girls/')[1]
  );

  const models: string[] = [];

  for (let i = 1; i <= count; i++) {
    const data = await request({
      url: `${url}/${i}`,
    });
    const doc = new DOMParser().parseFromString(
      data.response as string,
      'text/html'
    );

    const arr = [...doc.querySelectorAll<HTMLAnchorElement>('.thmb_lnk')].map(
      (el) => el.href.match(/model.*/)![0]
    );

    models.push(...arr);
  }

  return models;
};

const blacked = async (url: string) => {
  const data = await request({ url });

  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );
  const count = parseInt(
    doc
      .querySelector<HTMLAnchorElement>(
        'a[data-test-component="PaginationLast"]'
      )!
      .href.split('=')[1]
  );

  const models: string[] = [];
  for (let i = 1; i <= count; i++) {
    const data = await request({
      url: `${url}?page=${i}`,
    });
    const doc = new DOMParser().parseFromString(
      data.response as string,
      'text/html'
    );

    const arr = [
      ...doc.querySelectorAll<HTMLAnchorElement>(
        'div[data-test-component="ModelsListItem"] > a'
      ),
    ].map((el) => new URL(el.href).pathname.replace('/models/', ''));

    models.push(...arr);
  }

  return models;
};

const blowpass = async (url: string) => {
  const data = await request({ url });
  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );

  const models = [
    ...doc.querySelectorAll<HTMLOptionElement>(
      '#models_list option:nth-child(n+3)'
    ),
  ].map((el) => el.value.match(/[a-zA-Z0-9-]+\/[0-9]+/)![0]);

  return models;
};

const brazzers = async (url: string) => {
  let data = await request({
    url: `https://${new URL(url).hostname}`,
    responseType: 'text',
  });
  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );

  const jwt = doc.body.innerHTML
    .match(/jwt":".*?(?=")/)![0]
    .replace('jwt":"', '');

  data = await request({
    url: `https://site-api.project1service.com/v1/actors?limit=1`,
    headers: {
      instance: jwt,
    },
    responseType: 'json',
  });

  const total = (data.response as any).meta.total;

  let models: string[] = [];

  for (let i = 0; i <= Math.round(total / 100) * 100; i += 100) {
    data = await request({
      url: `https://site-api.project1service.com/v1/actors?orderBy=name&limit=100&&offset=${i}`,
      headers: {
        instance: jwt!,
      },
      responseType: 'json',
    });
    const json = data.response as any;

    const arr = (json.result as any[])
      .filter((model) => model.gender !== 'male')
      .map(
        (model: any) =>
          `${model.id}/${model.name.toLowerCase().replace(' ', '-')}`
      );

    models.push(...arr);

    await pause(100);
  }

  return models;
};

const fit18 = async (site: string, url: string) => {
  let data = await request({
    url: `https://${site}.com`,
    responseType: 'text',
  });
  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );

  const apiKey = doc.head.innerHTML.match(
    /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/
  )![0];

  data = await request({
    url,
    headers: {
      'argonath-api-key': apiKey,
    },
    method: 'POST',
    responseType: 'json',
    data: JSON.stringify({
      operationName: 'ListTalent',
      variables: { limit: 200 },
      query: `query ListTalent($limit: Int) {
  talent {
    list(input: { first: $limit }) {
      result {
        edges {
          node {
            talentId
          }
        }
      }
    }
  }
}`,
    }),
  });

  const models: string[] = (
    data.response as any
  ).data.talent.list.result.edges.map((edge: any) => edge.node.talentId);

  return models;
};

const naughtyAmerica = async (url: string) => {
  let data = await request({ url });
  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );
  const count = parseInt(
    new URL(
      doc.querySelector<HTMLAnchorElement>(
        '.pagination li:last-child > a'
      )!.href
    ).search.split('=')[1]
  );

  let models: string[] = [];

  for (let i = 1; i <= count; i++) {
    data = await request({
      url: `${url}?page=${i}`,
    });
    const doc = new DOMParser().parseFromString(
      data.response as string,
      'text/html'
    );

    const arr = [
      ...doc.querySelectorAll<HTMLAnchorElement>('.performer-image'),
    ].map((el) => new URL(el.href).pathname.replace('/pornstar/', ''));

    models.push(...arr);
  }

  return models;
};

const nubilesPorn = async (url: string) => {
  const models: string[] = [];

  for (const letter of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    const data = await request({
      url: `${url}/${letter}`,
    });

    const doc = new DOMParser().parseFromString(
      data.response as string,
      'text/html'
    );

    const arr = [
      ...doc.querySelectorAll<HTMLAnchorElement>('.img-wrapper > a'),
    ].map((el) => new URL(el.href).pathname.replace('/model/profile/', ''));

    models.push(...arr);
  }

  return models;
};

const pornPros = async (url: string) => {
  let data = await request({ url });
  const doc = new DOMParser().parseFromString(
    data.response as string,
    'text/html'
  );
  const count = parseInt(
    doc.querySelector<HTMLElement>('.pagination :nth-last-child(2) > a')!
      .innerText
  );

  let models: string[] = [];

  for (let i = 1; i < count; i++) {
    data = await request({
      url: `${url}?page=${i}`,
    });
    const doc = new DOMParser().parseFromString(
      data.response as string,
      'text/html'
    );

    const arr = [
      ...doc.querySelectorAll<HTMLAnchorElement>('.information > a'),
    ].map((el) => new URL(el.href).pathname.replace('/girls/', ''));

    models.push(...arr);
  }

  return models;
};

const sisLovesMe = async (url: string) => {
  const data = await request({ url, responseType: 'json' });
  const json = data.response as any;

  return Object.values(json).map((model: any) => model.id) as string[];
};

const teamSkeet = async (url: string) => {
  const data = await fetch(url);
  const json = await data.json();

  return json.hits.hits.map((model: any) => model._id) as string[];
};
