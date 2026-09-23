// User types
export interface User {
  id: string;
  username: string;
  fullName: string;
  biography?: string;
  avatarUrl?: string | null;
  bannerURL?: string | null;
  phoneNumber?: string;
  passwordHash?: string;
  createdAt: string;
}

// Post types
export interface Post {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

// Comment types
export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

// Chat/Message types for messenger
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  mentions?: string[];
  isEdited?: boolean;
  isPinned?: boolean;
  createdAt: string;
  threadCount?: number;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  type: 'private' | 'group' | 'cooperative';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  participantCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
  participants?: User[];
  pinnedMessage?: Message;
}

// Poll types
export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isAnonymous: boolean;
  createdAt: string;
}

// Attachment types
export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'poll';
  url?: string;
  name?: string;
  size?: number;
  thumbnail?: string;
}

// Location/Place
export interface Location {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
}

// Contact
export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatarUrl?: string;
}

// Voice call types
export interface VoiceCall {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar?: string;
  status: 'connecting' | 'active' | 'ended';
  duration: number;
  isRecording: boolean;
  isMuted: boolean;
  isSpeaker: boolean;
  playbackSpeed: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Auth types
export interface LoginRequest {
  phoneNumber: string;
  code: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
