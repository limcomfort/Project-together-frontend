import axios, { AxiosInstance } from 'axios';
import type {
  User,
  Post,
  Comment,
  Chat,
  Message,
  ApiResponse,
  LoginRequest,
  AuthResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Posts API
  async getPosts(): Promise<Post[]> {
    const response = await this.client.get<ApiResponse<{ posts: Post[] }>>('/posts');
    return response.data.data?.posts || [];
  }

  async getPostById(id: string): Promise<Post> {
    const response = await this.client.get<ApiResponse<{ post: Post }>>(`/posts/${id}`);
    if (!response.data.data?.post) {
      throw new Error('Post not found');
    }
    return response.data.data.post;
  }

  async createPost(content: string, author: string): Promise<Post> {
    const response = await this.client.post<ApiResponse<{ post: Post }>>('/posts', {
      content,
      author,
    });
    if (!response.data.data?.post) {
      throw new Error('Failed to create post');
    }
    return response.data.data.post;
  }

  async deletePost(id: string): Promise<void> {
    await this.client.delete(`/posts/${id}`);
  }

  // Users API
  async getUsers(): Promise<User[]> {
    const response = await this.client.get<ApiResponse<{ users: User[] }>>('/users');
    return response.data.data?.users || [];
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.client.get<ApiResponse<{ user: User }>>(`/users/${id}`);
    if (!response.data.data?.user) {
      throw new Error('User not found');
    }
    return response.data.data.user;
  }

  // Auth API (mock for now)
  async login(data: LoginRequest): Promise<AuthResponse> {
    // Mock implementation - replace with real endpoint
    const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/login', data);
    if (!response.data.data) {
      throw new Error('Login failed');
    }
    return response.data.data;
  }

  async verifyCode(phoneNumber: string, code: string): Promise<AuthResponse> {
    const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/verify', {
      phoneNumber,
      code,
    });
    if (!response.data.data) {
      throw new Error('Verification failed');
    }
    return response.data.data;
  }

  // Chats API (mock)
  async getChats(): Promise<Chat[]> {
    // Mock data - replace with real endpoint
    return [
      {
        id: '1',
        name: 'Аня',
        avatar: 'https://i.pravatar.cc/150?img=1',
        type: 'private',
        lastMessage: 'Привезла новые глиняные чашки...',
        lastMessageTime: '12:30',
        unreadCount: 2,
      },
      {
        id: '2',
        name: 'Миша Мельник',
        avatar: 'https://i.pravatar.cc/150?img=2',
        type: 'private',
        lastMessage: 'Договорились. Завтра в Очаге!',
        lastMessageTime: 'Вчера',
        unreadCount: 0,
      },
      {
        id: '3',
        name: 'Кооператив «Земля»',
        type: 'cooperative',
        lastMessage: 'Катя: Обсуждаем план грядок на весну',
        lastMessageTime: 'Пн',
        unreadCount: 0,
        participantCount: 12,
      },
    ];
  }

  async getChatById(id: string): Promise<Chat> {
    const chats = await this.getChats();
    const chat = chats.find(c => c.id === id);
    if (!chat) {
      throw new Error('Chat not found');
    }
    return chat;
  }

  async getMessages(chatId: string): Promise<Message[]> {
    // Mock data
    return [
      {
        id: '1',
        chatId,
        senderId: '1',
        senderName: 'Катя',
        senderAvatar: 'https://i.pravatar.cc/150?img=1',
        content: '@Лука сможешь забрать семена у Ани вечером?',
        mentions: ['Лука'],
        createdAt: '2024-01-15T14:02:00Z',
        threadCount: 3,
      },
    ];
  }

  async sendMessage(chatId: string, content: string): Promise<Message> {
    // Mock implementation
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      senderId: 'currentUser',
      senderName: 'Вы',
      content,
      createdAt: new Date().toISOString(),
    };
    return newMessage;
  }
}

export const api = new ApiClient();
export default api;
