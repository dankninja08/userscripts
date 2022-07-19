// ==UserScript==
// @name    Add Video Controls
// @match   http://www.uflash.tv/video/*
// @match   https://crazyshit.com/cnt/medias/*
// @match   https://daftsex.com/watch/*
// @match   https://daxab.com/player/*
// @match   https://exporntoons.net/watch/*
// @match   https://exporntoons.net/player/*
// @match   https://fapster.xxx/videos/*
// @match   https://goodporn.to/videos/*
// @match   https://hdzog.com/videos/*
// @match   https://hentaidude.com/*
// @match   https://hentaihaven.xxx/watch/*
// @match   https://hentaihaven.xxx/wp-content/plugins/player-logic/player.php?data=*
// @match   https://hotmovs.com/videos/*
// @match   https://hqporner.com/*
// @match   https://latestporn.co/*
// @match   https://muchohentai.com/*
// @match   https://mydaddy.cc/video/*
// @match   https://noodlemagazine.com/watch/*
// @match   https://noodlemagazine.com/player/*
// @match   https://pornez.net/video*
// @match   https://pornez.net/player/*
// @match   https://pornmedium.com/video/*
// @match   https://pornwild.com/videos/*
// @match   https://povcum.com/video/*
// @match   https://privatehomeclips.com/videos/*
// @match   https://severeporn.com/videos/*
// @match   https://sxyprn.com/post/*
// @match   https://spankbang.com/*/video/*
// @match   https://thisvid.com/videos/*
// @match   https://tittykings.com/videos/*
// @match   https://tubepornclassic.com/videos/*
// @match   https://txxx.com/videos/*
// @match   https://upornia.com/videos/*
// @match   https://vjav.com/videos/*
// @match   https://voyeurhit.com/videos/*
// @match   https://xfantazy.com/video/*
// @match   https://xhamster.com/videos/*
// @match   https://*.xtremestream.co/player/index.php*
// @match   https://tube.perverzija.com/*
// @match   https://www.anon-v.com/videos/*
// @match   https://www.cambro.tv/*
// @match   https://www.cliphunter.com/w/*
// @match   https://www.fpo.xxx/videos/*
// @match   https://www.mypornhere.com/videos/*
// @match   https://www.peekvids.com/*
// @match   https://www.playvids.com/*
// @match   https://www.playvids.com/*
// @match   https://www.pornflip.com/*
// @match   https://www.porngo.com/videos/*
// @match   https://www.pornharlot.com/video/*
// @match   https://www.pornhits.com/video/*
// @match   https://www.pornhub.com/view_video.php*
// @match   https://www.pornktube.tv/videos/*
// @match   https://www.pornoeggs.com/*
// @match   https://www.porntrex.com/video/*
// @match   https://www.tnaflix.com/*
// @match   https://www.trannyvideosx.com/video/*
// @match   https://www.trendyporn.com/video/*
// @match   https://www.trendyxxx.com/video/*
// @match   https://www.whoreshub.com/videos/*
// @match   https://www.xfreehd.com/video/*
// @match   https://www.xnxx.com/video-*
// @match   https://www.xozilla.com/*
// @match   https://www.xvideos.com/video*
// @match   https://www.xxxfiles.com/videos/*
// @match   https://www.youcrazyx.com/video/*
// @match   https://www.yourpornflare.com/video/*
// @match   https://www9.pornhd3x.tv/movies/*
//
// @grant   GM.getValue
// @grant   GM.setClipboard
// @grant   GM.setValue
//
// @run-at  document-start
// ==/UserScript==

import { retrieve, store } from './util';

let video: HTMLVideoElement;
let target: string;
let iframeSelector: string;
let iframe: HTMLIFrameElement | null;

if (location.hostname === 'daftsex.com') {
  iframeSelector = '.frame_wrapper > iframe';
} else if (location.hostname === 'daxab.com') {
  target = 'https://daftsex.com';
} else if (location.hostname === 'hqporner.com') {
  iframeSelector = '#playerWrapper > iframe';
} else if (location.hostname === 'mydaddy.cc') {
  target = 'https://hqporner.com';
} else if (location.hostname === 'tube.perverzija.com') {
  iframeSelector = '#player-embed > iframe';
} else if (location.hostname.includes('.xtremestream.co')) {
  target = 'https://tube.perverzija.com';
} else if (location.hostname === 'latestporn.co') {
  iframeSelector = 'p > iframe';
} else if (location.hostname === 'streamzz.to') {
  target = 'https://latestporn.co';
} else if (location.hostname === 'pornez.net') {
  iframeSelector = '.video-player > iframe';
} else if (location.hostname === 'noodlemagazine.com') {
  iframeSelector = '#player_box > iframe';
  target = 'https://noodlemagazine.com';
} else if (location.hostname === 'hentaihaven.xxx') {
  iframeSelector = '.player_logic_item > iframe';
}

const getTimestamps = async () => {
  let times = await retrieve<number[]>('times');

  if (!times) {
    times = decodeURIComponent(location.hash.substring(1))
      .split(',')
      .filter((time) => !!time)
      .map((time) => parseFloat(time));

    store('times', times);
  }

  return times;
};

if (location === parent.location) {
  store('times', null);
  store('times', getTimestamps());

  addEventListener('message', async (e) => {
    iframe = document.querySelector<HTMLIFrameElement>(iframeSelector);
    if (iframe) {
      const url = new URL(iframe.src);

      target = `${url.protocol}//${url.hostname}`;

      if (e.origin === target) {
        if (e.data.hashChanged) {
          history.replaceState(
            '',
            '',
            `${location.href.split('#')[0]}#${(await getTimestamps()).join(
              ','
            )}`
          );
        }
      }
    }
  });
} else {
  addEventListener('message', (e) => {
    extractVideo();

    if (e.origin === target) {
      if (e.data.togglePlayback) togglePlayback();
      else if (e.data.rewind) rewind();
      else if (e.data.skip) skip();
      else if (e.data.previousFrame) previousFrame();
      else if (e.data.nextFrame) nextFrame();
      else if (e.data.previousTimestamp) previousTimestamp();
      else if (e.data.nextTimestamp) nextTimestamp();
      else if (e.data.addTimestamp) addTimestamp();
      else if (e.data.removeTimestamp) removeTimestamp();
    }
  });
}

document.addEventListener(
  'keydown',
  (e) => {
    if (
      document.activeElement?.tagName === 'INPUT' ||
      (e.metaKey && e.shiftKey && e.key === 's')
    ) {
      return;
    }

    if (
      ['[', ']', ',', '.', 'ArrowLeft', 'ArrowRight', '/', 's', ' '].includes(
        e.key
      )
    ) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    const w = iframe?.contentWindow;
    if (w && new URL(iframe!.src).hostname !== location.hostname) {
      if (e.key === ' ') w.postMessage({ togglePlayback: true }, target);
      else if (e.key === 'ArrowLeft') w.postMessage({ rewind: true }, target);
      else if (e.key === 'ArrowRight') w.postMessage({ skip: true }, target);
      else if (e.key === ',') w.postMessage({ previousFrame: true }, target);
      else if (e.key === '.') w.postMessage({ nextFrame: true }, target);
      else if (e.key === '[')
        w.postMessage({ previousTimestamp: true }, target);
      else if (e.key === ']') w.postMessage({ nextTimestamp: true }, target);
      else if (e.key === '=') w.postMessage({ addTimestamp: true }, target);
      else if (e.key === '-') w.postMessage({ removeTimestamp: true }, target);
      else if (e.metaKey && e.key === 's') saveUrl();
    } else {
      extractVideo();

      if (e.key === ' ') togglePlayback();
      else if (e.key === 'ArrowLeft') rewind();
      else if (e.key === 'ArrowRight') skip();
      else if (e.key === ',') previousFrame();
      else if (e.key === '.') nextFrame();
      else if (e.key === '[') previousTimestamp();
      else if (e.key === ']') nextTimestamp();
      else if (e.key === '=') addTimestamp();
      else if (e.key === '-') removeTimestamp();
      else if (e.metaKey && e.key === 's')
        if (location === parent.location) saveUrl();
    }
  },
  true
);

const extractVideo = () => {
  video =
    document.querySelector('.mgp_videoWrapper > video') ||
    document
      .querySelector<HTMLIFrameElement>(iframeSelector)
      ?.contentWindow?.document?.querySelector('video') ||
    document.querySelector('video')!;
};

const togglePlayback = () => {
  if (video.paused) video.play();
  else video.pause();
};

const rewind = () => {
  video.currentTime -= 5;
};

const skip = () => {
  video.currentTime += 5;
};

const previousFrame = () => {
  const currTime = video.currentTime;

  video.currentTime = Number.isInteger(currTime)
    ? currTime - 1
    : video.paused
    ? Math.floor(currTime)
    : Math.floor(currTime - 1);
};

const nextFrame = () => {
  const currTime = video.currentTime;

  video.currentTime = Number.isInteger(currTime)
    ? currTime + 1
    : Math.ceil(currTime);
};

const previousTimestamp = async () => {
  const currTime = video.currentTime;
  const times = await getTimestamps();

  if (currTime > times[0]) {
    const i = times.findIndex((time) => time > currTime) - 1;

    if (i < 0) {
      if (currTime - times[times.length - 1] < 0.5)
        video.currentTime = times[times.length - 2];
      else video.currentTime = times[times.length - 1];
    } else {
      if (video.currentTime - times[i] < 0.5)
        video.currentTime = i > 0 ? times[i - 1] : times[0];
      else video.currentTime = times[i];
    }
  }
};

const nextTimestamp = async () => {
  const currTime = video.currentTime;
  const times = await getTimestamps();

  if (currTime < times[times.length - 1])
    video.currentTime = times[times.findIndex((time) => time > currTime)];
};

const addTimestamp = async () => {
  const currTime = video.currentTime;
  let times = await getTimestamps();

  if (!times.includes(currTime)) {
    times = [...times, currTime].sort((a, b) => a - b);
    store('times', times);

    if (location === parent.location) {
      history.replaceState(
        '',
        '',
        `${location.href.split('#')[0]}#${times.join(',')}`
      );
    } else parent.postMessage({ hashChanged: true }, target);
  }
};

const removeTimestamp = async () => {
  const currTime = video.currentTime;
  let times = await getTimestamps();

  if (times.includes(currTime)) {
    times = times.filter((t) => t !== currTime);
    store('times', times);

    if (location === parent.location) {
      history.replaceState(
        '',
        '',
        `${location.href.split('#')[0]}#${times.join(',')}`
      );
    } else parent.postMessage({ hashChanged: true }, target);
  }
};

const saveUrl = async () => {
  const file = `<dict>
  <key>URL</key>
  <string>${location.href}</string>
</dict>`;

  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([file]));
  a.download = `${location.hostname.replace('www.', '').split('.')[0]}.webloc`;

  a.click();
};
