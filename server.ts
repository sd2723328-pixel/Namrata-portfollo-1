import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  initDatabase,
  getPortfolio,
  updatePortfolio,
  authenticateUser,
  validateSession,
  revokeSession,
  changeAdminPassword,
  addContactMessage,
  getContactMessages,
  markMessageRead,
  deleteContactMessage,
  StoredSession
} from './server/db.js';

// Extend Express Request type to carry session
declare global {
  namespace Express {
    interface Request {
      session?: StoredSession;
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize persistent database
  initDatabase();

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Helper auth middleware
  function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || (req.headers['x-auth-token'] as string);
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (authHeader) {
      token = authHeader;
    }

    const session = validateSession(token);
    if (!session) {
      res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
      return;
    }

    req.session = session;
    next();
  }

  // ================= API ROUTES =================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 1. Portfolio Data Endpoints
  app.get('/api/portfolio', (req, res) => {
    try {
      const data = getPortfolio();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch portfolio', message: err.message });
    }
  });

  app.put('/api/portfolio', requireAuth, (req, res) => {
    try {
      const updated = updatePortfolio(req.body);
      res.json({ success: true, data: updated, message: 'Portfolio updated successfully' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update portfolio', message: err.message });
    }
  });

  // 2. Authentication Endpoints
  app.post('/api/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = authenticateUser(email, password);
      if (!result) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      res.json({
        success: true,
        session: {
          token: result.session.token,
          email: result.session.email,
          name: result.session.name,
          expiresAt: result.session.expiresAt
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Login error', message: err.message });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        revokeSession(authHeader.substring(7));
      }
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (err: any) {
      res.status(500).json({ error: 'Logout error', message: err.message });
    }
  });

  app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({
      user: {
        email: req.session?.email,
        name: req.session?.name,
        expiresAt: req.session?.expiresAt
      }
    });
  });

  app.put('/api/auth/change-password', requireAuth, (req, res) => {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters long' });
        return;
      }

      if (req.session?.userId) {
        changeAdminPassword(req.session.userId, newPassword);
        res.json({ success: true, message: 'Password updated successfully' });
      } else {
        res.status(400).json({ error: 'Session invalid' });
      }
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update password', message: err.message });
    }
  });

  // 3. Contact Form & Messages Endpoints
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        res.status(400).json({ error: 'Name, email, and message are required' });
        return;
      }

      const saved = addContactMessage({
        name: String(name).slice(0, 100),
        email: String(email).slice(0, 150),
        subject: String(subject || 'Portfolio Inquiry').slice(0, 200),
        message: String(message).slice(0, 2000)
      });

      res.status(201).json({ success: true, message: 'Your message has been sent to Namrata Ghosh!', data: saved });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit contact message', message: err.message });
    }
  });

  app.get('/api/messages', requireAuth, (req, res) => {
    try {
      const messages = getContactMessages();
      res.json(messages);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch messages', message: err.message });
    }
  });

  app.put('/api/messages/:id/read', requireAuth, (req, res) => {
    try {
      markMessageRead(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to mark message as read', message: err.message });
    }
  });

  app.delete('/api/messages/:id', requireAuth, (req, res) => {
    try {
      deleteContactMessage(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete message', message: err.message });
    }
  });

  // ================= VITE / STATIC SERVING =================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
