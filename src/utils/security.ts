// Security utilities for TestMind
export class SecurityManager {
  private static instance: SecurityManager;
  private encryptionKey: string;

  private constructor() {
    this.encryptionKey = this.generateEncryptionKey();
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  // Generate a secure encryption key
  private generateEncryptionKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Encrypt sensitive data
  public encrypt(data: string): string {
    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      // Simple XOR encryption for demo purposes
      // In production, use proper encryption libraries
      const encrypted = new Uint8Array(dataBuffer.length);
      for (let i = 0; i < dataBuffer.length; i++) {
        encrypted[i] = dataBuffer[i] ^ (this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
      }
      
      return btoa(String.fromCharCode(...encrypted));
    } catch (error) {
      console.error('Encryption failed:', error);
      return data;
    }
  }

  // Decrypt sensitive data
  public decrypt(encryptedData: string): string {
    try {
      const encrypted = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)));
      const decrypted = new Uint8Array(encrypted.length);
      
      for (let i = 0; i < encrypted.length; i++) {
        decrypted[i] = encrypted[i] ^ (this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
      }
      
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData;
    }
  }

  // Generate secure session token
  public generateSessionToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validate session token
  public validateSessionToken(token: string): boolean {
    return token && token.length === 64 && /^[0-9a-f]+$/.test(token);
  }

  // Sanitize user input
  public sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .replace(/[;]/g, '') // Remove semicolons
      .trim();
  }

  // Validate email format
  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  public validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Check for suspicious activity
  public detectSuspiciousActivity(userAgent: string, ip: string): boolean {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /automated/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(userAgent));
  }

  // Rate limiting check
  public checkRateLimit(identifier: string, maxAttempts: number = 5, windowMs: number = 900000): boolean {
    const key = `rate_limit_${identifier}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    const now = Date.now();
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    // Add current attempt
    validAttempts.push(now);
    localStorage.setItem(key, JSON.stringify(validAttempts));
    
    return true; // Within rate limit
  }
}

// Export singleton instance
export const securityManager = SecurityManager.getInstance();

