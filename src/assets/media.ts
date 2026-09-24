const uri = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s{2,}/g, ' '))}`;

export function avatarFor(name: string, from: string, to: string): string {
  const letter = (name.replace(/[«»"']/g, '').trim()[0] ?? 'К').toUpperCase();
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="120" height="120" fill="url(#g)"/><text x="60" y="79" font-family="-apple-system, 'Segoe UI', Arial, sans-serif" font-size="52" font-weight="600" fill="#fff" text-anchor="middle">${letter}</text></svg>`);
}

type ArtVariant = 'peach' | 'forest' | 'violet' | 'ocean' | 'candy' | 'mint' | 'rust' | 'dusk';

const art: Record<ArtVariant, { bg: [string, string]; blobs: Array<{ x: number; y: number; r: number; c: string }> }> = {
  peach: { bg: ['#f7b267', '#f4845f'], blobs: [{ x: 620, y: 210, r: 200, c: '#ffdba4' }, { x: 190, y: 600, r: 240, c: '#e0574f' }, { x: 420, y: 420, r: 160, c: '#fff1d0' }] },
  forest: { bg: ['#1f4d36', '#0e2a1d'], blobs: [{ x: 600, y: 640, r: 230, c: '#5fa572' }, { x: 220, y: 180, r: 190, c: '#a8d5a2' }, { x: 520, y: 300, r: 130, c: '#f2e8cf' }] },
  violet: { bg: ['#3a2a5d', '#151029'], blobs: [{ x: 580, y: 220, r: 210, c: '#8f6fd3' }, { x: 240, y: 620, r: 240, c: '#5b3fa8' }, { x: 430, y: 430, r: 120, c: '#e0d4ff' }] },
  ocean: { bg: ['#134e6f', '#062033'], blobs: [{ x: 610, y: 590, r: 240, c: '#3e8fb0' }, { x: 200, y: 200, r: 180, c: '#77c4d8' }, { x: 480, y: 340, r: 130, c: '#eaf7ff' }] },
  candy: { bg: ['#e5567c', '#7c2a66'], blobs: [{ x: 590, y: 250, r: 200, c: '#ffb3c6' }, { x: 230, y: 610, r: 230, c: '#a4378f' }, { x: 440, y: 420, r: 140, c: '#fff0f4' }] },
  mint: { bg: ['#63b6a2', '#22635a'], blobs: [{ x: 250, y: 240, r: 200, c: '#bfe8d9' }, { x: 620, y: 620, r: 220, c: '#2f8f7c' }, { x: 460, y: 380, r: 120, c: '#f4fffb' }] },
  rust: { bg: ['#a6552d', '#4a2113'], blobs: [{ x: 560, y: 620, r: 220, c: '#e08d4f' }, { x: 210, y: 220, r: 190, c: '#6e3a1e' }, { x: 450, y: 400, r: 130, c: '#ffe3c2' }] },
  dusk: { bg: ['#2c3e6b', '#0d1226'], blobs: [{ x: 600, y: 200, r: 190, c: '#617bb5' }, { x: 220, y: 630, r: 230, c: '#3d4f86' }, { x: 470, y: 400, r: 150, c: '#f4c95d' }] },
};

export function artFor(variant: ArtVariant): string {
  const v = art[variant];
  const blobs = v.blobs.map((b) => `<circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.c}" opacity="0.6"/>`).join('');
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${v.bg[0]}"/><stop offset="1" stop-color="${v.bg[1]}"/></linearGradient><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="72"/></filter></defs><rect width="800" height="800" fill="url(#bg)"/><g filter="url(#b)">${blobs}</g></svg>`);
}

export const reelsPosters: Record<number, string> = { 1: artFor('peach'), 2: artFor('forest'), 3: artFor('rust'), 4: artFor('dusk') };
