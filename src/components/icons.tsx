import type { CSSProperties } from 'react';

const shapes: Record<string, string> = {
  home: 'M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z',
  search: 'M11 3.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm5.8 13.1 4.2 4.2',
  reels: 'M7.4 2.9 9.9 8M2.8 8.6h18.4M10.5 11.6l5.4 3.1-5.4 3.1Z',
  heart: 'M12 20.7C7.2 16.9 3 13.7 3 9.5 3 6.5 5.3 4.2 8.1 4.2c1.6 0 3 .8 3.9 2 .9-1.2 2.3-2 3.9-2 2.8 0 5.1 2.3 5.1 5.3 0 4.2-4.2 7.4-9 11.2Z',
  comment: 'M20.7 11.6c0 4.7-3.9 8.4-8.7 8.4-1.3 0-2.6-.3-3.7-.8L3.3 20.6l1.5-4.3a8 8 0 0 1-1.5-4.7c0-4.7 3.9-8.5 8.7-8.5s8.7 3.8 8.7 8.5Z',
  share: 'M21.4 3.3 9.6 10.2M21.4 3.3l-6.9 18-3.1-7.1-7.1-3.1Z',
  bookmark: 'M6.3 3.5h11.4v17l-5.7-4.1-5.7 4.1v-17Z',
  more: 'M5 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm7 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm7 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z',
  back: 'M15 4.5 7.5 12l7.5 7.5',
  messenger: 'M6.8 13.8l3.7-3.9 2.6 2.8 3.4-3.6-3.7 3.9-2.6-2.8Z',
  plus: 'M12 5v14M5 12h14',
  camera: 'M4.8 6.5h2.6l1.4-2.2h6.4l1.4 2.2h2.6a1.8 1.8 0 0 1 1.8 1.8v9.4a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 17.7V8.3a1.8 1.8 0 0 1 1.8-1.8Z',
  mic: 'M9 2.8h6v11.4H9zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.2',
  phone: 'M6.5 10.6a13.4 13.4 0 0 0 6.9 6.9l2.3-2.3a1 1 0 0 1 1-.2 11 11 0 0 0 3.5.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.7 21 3 13.3 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .5 3.5 1 1 0 0 1-.2 1Z',
  grid: 'M4.5 3.5h15v17h-15zM4.5 9h15M4.5 15h15M9.5 3.5v17M15.5 3.5v17',
  music: 'M9 17.5V5.8l11-2v11.4M6.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm11-2.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  close: 'M5.5 5.5l13 13M18.5 5.5l-13 13',
  send: 'M3.4 11.9 20.6 4.2l-7.7 17.2-1.9-6.5Z',
  video: 'M2.5 6h13v12h-13zM15.5 10.5l6-3.5v10l-6-3.5',
  pause: 'M8.5 5v14M15.5 5v14',
  sound: 'M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4ZM15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11',
  mute: 'M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4ZM16 9.5l5 5M21 9.5l-5 5',
  image: 'M4.5 3.5h15a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM7.7 11.4a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.8 18.2l4.9-5 3.5 3.5 3.8-4.2 4.9 5.4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  chevron: 'm5 9.5 7 7 7-7',
  lock: 'M7 10.5V8a5 5 0 0 1 10 0v2.5M5.5 10.5h13v10h-13z',
};

interface IconProps {
  name: keyof typeof shapes | string;
  size?: number;
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function Icon({ name, size = 24, filled = false, className, style }: IconProps) {
  const d = shapes[name] ?? shapes.more;
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0.8 : 1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
