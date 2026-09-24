import { avatarFor, artFor } from '../assets/media';

export type ChatInfo = {
  id: string;
  name: string;
  username: string;
  status: string;
  online?: boolean;
  avatar: string;
  group?: boolean;
  preview: string;
  time: string;
  unread?: number;
};

export const me = { name: 'Михаил', username: 'mikhail.glina', avatar: avatarFor('Михаил', '#2f6d62', '#67a86b') };

export const chats: ChatInfo[] = [
  { id: '1', name: 'Аня', username: 'anya.rodnik', status: 'В сети', online: true, avatar: avatarFor('Аня', '#c14b57', '#e88f4e'), preview: 'набрала воды из родника, скоро буду', time: '14:32', unread: 2 },
  { id: '2', name: 'Миша Михалыч', username: 'misha.telega', status: 'Был(а) недавно', avatar: avatarFor('Миша', '#8a6d2f', '#c2a23f'), preview: 'Голосовое сообщение · 0:45', time: 'Вчера' },
  { id: '3', name: 'Кооператив «Земля»', username: 'coop.zemlya', status: '12 участников · 5 в сети', avatar: avatarFor('Земля', '#3c5c34', '#6f9b4a'), group: true, preview: 'Катя: субботник переносится', time: 'Пн' },
];

export const chatById = (id: string): ChatInfo => chats.find((chat) => chat.id === id) ?? chats[0];

export const stories = [
  { name: 'Аня', avatar: avatarFor('Аня', '#c14b57', '#e88f4e') },
  { name: 'Миша', avatar: avatarFor('Миша', '#8a6d2f', '#c2a23f') },
  { name: 'Земля', avatar: avatarFor('Земля', '#3c5c34', '#6f9b4a') },
  { name: 'Гриша', avatar: avatarFor('Гриша', '#b05a2c', '#e09a52') },
  { name: 'Оля', avatar: avatarFor('Оля', '#7a4a6b', '#b07a9e') },
  { name: 'Пётр', avatar: avatarFor('Пётр', '#3f5d6e', '#6e93a8') },
];

export const posts = [
  { id: 'p1', author: 'Аня', username: 'anya.rodnik', avatar: avatarFor('Аня', '#c14b57', '#e88f4e'), image: artFor('peach'), caption: 'Тихое утро у родника. Вода сегодня особенно вкусная', likes: 1284, comments: 48, time: '2 ч' },
  { id: 'p2', author: 'Кооператив «Земля»', username: 'coop.zemlya', avatar: avatarFor('Земля', '#3c5c34', '#6f9b4a'), image: artFor('forest'), caption: 'Грядки готовы к весне. Работали всем кооперативом', likes: 856, comments: 31, time: '5 ч' },
  { id: 'p3', author: 'Гриша', username: 'grisha.ognivo', avatar: avatarFor('Гриша', '#b05a2c', '#e09a52'), image: artFor('violet'), caption: 'Новая партия кружек вышла из печи. Глина, огонь и терпение', likes: 2341, comments: 96, time: '8 ч' },
];

export const reels = [
  { id: 1, chatId: '1', author: 'Аня', username: 'anya.rodnik', avatar: avatarFor('Аня', '#c14b57', '#e88f4e'), video: '/reels/r1.mp4', caption: 'Закат сегодня нереальный. Ловите момент', music: 'Оригинальный звук · Аня', likes: 12400, comments: 214 },
  { id: 2, chatId: '3', author: 'Земля', username: 'coop.zemlya', avatar: avatarFor('Земля', '#3c5c34', '#6f9b4a'), video: '/reels/r2.mp4', caption: 'Как мы готовим грядки вместе', music: 'Кооператив «Земля» · трек недели', likes: 8900, comments: 132 },
  { id: 3, chatId: '1', author: 'Гриша', username: 'grisha.ognivo', avatar: avatarFor('Гриша', '#b05a2c', '#e09a52'), video: '/reels/r3.mp4', caption: 'Глина, огонь и один хороший вечер', music: 'Голос Очага · подкаст', likes: 21300, comments: 388 },
  { id: 4, chatId: '2', author: 'Миша', username: 'misha.telega', avatar: avatarFor('Миша', '#8a6d2f', '#c2a23f'), video: '/reels/r4.mp4', caption: 'Телега готова. Поехали', music: 'Дорога домой · ambient', likes: 4500, comments: 67 },
];

export const exploreGrid = ['ocean', 'candy', 'mint', 'rust', 'dusk', 'violet', 'peach', 'forest', 'candy'].map((v, i) => ({ id: `e${i}`, image: artFor(v as never) }));
export const profileGrid = ['peach', 'mint', 'ocean', 'rust', 'violet', 'dusk', 'forest', 'candy', 'peach'].map((v, i) => ({ id: `g${i}`, image: artFor(v as never) }));
export const savedGrid = ['dusk', 'peach', 'ocean', 'mint'].map((v, i) => ({ id: `s${i}`, image: artFor(v as never) }));
export const highlights = [
  { name: 'Родник', image: artFor('ocean') },
  { name: 'Грядка', image: artFor('forest') },
  { name: 'Печь', image: artFor('rust') },
  { name: 'Чай', image: artFor('peach') },
];
