import { avatarFor } from '../assets/media';

export type ChatInfo = {
  id: string;
  name: string;
  status: string;
  avatar: string;
  group?: boolean;
  preview: string;
  time: string;
  unread?: number;
};

export const me = { name: 'Михаил', avatar: avatarFor('Михаил', '#2f6d62', '#67a86b') };

export const chats: ChatInfo[] = [
  { id: '1', name: 'Аня', status: 'у костра · голосовая связь', avatar: avatarFor('Аня', '#c14b57', '#e88f4e'), preview: 'Я набрала воды из родника, скоро буду у очага...', time: '14:32', unread: 2 },
  { id: '2', name: 'Миша Михалыч', status: 'был недавно', avatar: avatarFor('Миша', '#8a6d2f', '#c2a23f'), preview: '🔊 Голосовое сообщение (0:45)', time: 'Вчера' },
  { id: '3', name: 'Кооператив «Земля»', status: '12 участников · 5 у костра', avatar: avatarFor('Земля', '#3c5c34', '#6f9b4a'), group: true, preview: 'Бать: Субботник переносится на...', time: 'Пн' },
];

export const chatById = (id: string): ChatInfo => chats.find((chat) => chat.id === id) ?? chats[0];
