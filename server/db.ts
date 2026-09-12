import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { initialPortfolioData } from './initialData.js';
import { PortfolioData, ContactMessage } from '../src/types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLogin?: string;
}

export interface StoredSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
}

// Memory cache with file backup
let portfolioCache: PortfolioData = initialPortfolioData;
let usersCache: StoredUser[] = [];
let sessionsCache: Map<string, StoredSession> = new Map();
let messagesCache: ContactMessage[] = [];

// Password hashing helpers
export function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')): { hash: string; salt: string } {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const checkHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(checkHash, 'hex'));
}

// Initialize database files
export function initDatabase() {
  // 1. Portfolio data
  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      const data = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
      portfolioCache = JSON.parse(data);
    } else {
      portfolioCache = initialPortfolioData;
      fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(portfolioCache, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error loading portfolio.json:', err);
    portfolioCache = initialPortfolioData;
  }

  // 2. Users data (Admin account for Namrata Ghosh)
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      usersCache = JSON.parse(data);
    } else {
      // Create initial admin account
      const defaultPassword = 'Namrata@2025';
      const { hash, salt } = hashPassword(defaultPassword);
      usersCache = [
        {
          id: 'admin-1',
          email: 'namrataghosh9832@gmail.com',
          name: 'Namrata Ghosh',
          passwordHash: hash,
          salt: salt,
          createdAt: new Date().toISOString()
        }
      ];
      fs.writeFileSync(USERS_FILE, JSON.stringify(usersCache, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error loading users.json:', err);
  }

  // 3. Messages data
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messagesCache = JSON.parse(data);
    } else {
      messagesCache = [
        {
          id: 'msg-seed-1',
          name: 'Rohit Roy',
          email: 'rohit.bca@university.edu',
          subject: 'BCA Semester 3 Notes Collaboration',
          message: 'Hi Namrata! Loved your CampusConnect project. Wanted to ask if we can contribute our DBMS practical questions to the BCA section?',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          read: false
        }
      ];
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesCache, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error loading messages.json:', err);
  }
}

// Portfolio getters and setters
export function getPortfolio(): PortfolioData {
  return portfolioCache;
}

export function updatePortfolio(newData: PortfolioData): PortfolioData {
  portfolioCache = {
    ...portfolioCache,
    ...newData,
    personal: {
      ...portfolioCache.personal,
      ...newData.personal
    }
  };
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(portfolioCache, null, 2), 'utf-8');
  return portfolioCache;
}

// User Authentication
export function authenticateUser(email: string, password: string): { session: StoredSession; user: StoredUser } | null {
  const normalizedEmail = email.trim().toLowerCase();
  const user = usersCache.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return null;

  const valid = verifyPassword(password, user.passwordHash, user.salt);
  if (!valid) return null;

  // Create session (valid for 7 days)
  const token = crypto.randomBytes(32).toString('hex');
  const session: StoredSession = {
    token,
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
  };

  sessionsCache.set(token, session);
  user.lastLogin = new Date().toISOString();
  fs.writeFileSync(USERS_FILE, JSON.stringify(usersCache, null, 2), 'utf-8');

  return { session, user };
}

export function validateSession(token: string): StoredSession | null {
  if (!token) return null;
  const session = sessionsCache.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessionsCache.delete(token);
    return null;
  }
  return session;
}

export function revokeSession(token: string): boolean {
  return sessionsCache.delete(token);
}

export function changeAdminPassword(userId: string, newPassword: string): boolean {
  const user = usersCache.find(u => u.id === userId);
  if (!user) return false;
  const { hash, salt } = hashPassword(newPassword);
  user.passwordHash = hash;
  user.salt = salt;
  fs.writeFileSync(USERS_FILE, JSON.stringify(usersCache, null, 2), 'utf-8');
  return true;
}

// Contact messages
export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): ContactMessage {
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    timestamp: new Date().toISOString(),
    read: false
  };
  messagesCache.unshift(newMsg);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesCache, null, 2), 'utf-8');
  return newMsg;
}

export function getContactMessages(): ContactMessage[] {
  return messagesCache;
}

export function markMessageRead(id: string): boolean {
  const msg = messagesCache.find(m => m.id === id);
  if (!msg) return false;
  msg.read = true;
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesCache, null, 2), 'utf-8');
  return true;
}

export function deleteContactMessage(id: string): boolean {
  const index = messagesCache.findIndex(m => m.id === id);
  if (index === -1) return false;
  messagesCache.splice(index, 1);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesCache, null, 2), 'utf-8');
  return true;
}
