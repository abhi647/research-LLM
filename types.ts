export enum ViewState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  isPro: boolean;
}

export interface Document {
  id: string;
  title: string;
  size: string;
  uploadDate: string;
  status: 'processed' | 'processing' | 'error';
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  sources?: Source[];
  ragStatus?: 'searching_pdf' | 'searching_web' | 'generating' | 'complete';
}

export interface Source {
  id: string;
  title: string;
  type: 'pdf' | 'web';
  url?: string;
  snippet: string;
  page?: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  comments: number;
  tags: string[];
  timestamp: string;
}
