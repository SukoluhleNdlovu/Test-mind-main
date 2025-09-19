// Cookie management utilities for TestMind
export interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class CookieManager {
  private static instance: CookieManager;

  private constructor() {}

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  // Set a cookie
  public setCookie(name: string, value: string, options: CookieOptions = {}): void {
    const {
      expires,
      path = '/',
      domain,
      secure = true,
      httpOnly = false,
      sameSite = 'strict'
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires) {
      if (typeof expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else {
        cookieString += `; expires=${expires.toUTCString()}`;
      }
    }

    cookieString += `; path=${path}`;

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (secure) {
      cookieString += '; secure';
    }

    if (httpOnly) {
      cookieString += '; httpOnly';
    }

    cookieString += `; sameSite=${sameSite}`;

    document.cookie = cookieString;
  }

  // Get a cookie value
  public getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }

  // Delete a cookie
  public deleteCookie(name: string, path: string = '/', domain?: string): void {
    let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    
    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    document.cookie = cookieString;
  }

  // Check if a cookie exists
  public hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  // Get all cookies as an object
  public getAllCookies(): Record<string, string> {
    const cookies: Record<string, string> = {};
    const cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      const [name, value] = cookie.split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }

    return cookies;
  }

  // Clear all cookies
  public clearAllCookies(): void {
    const cookies = this.getAllCookies();
    for (const name in cookies) {
      this.deleteCookie(name);
    }
  }

  // Set session cookie (expires when browser closes)
  public setSessionCookie(name: string, value: string, options: Omit<CookieOptions, 'expires'> = {}): void {
    this.setCookie(name, value, { ...options, expires: undefined });
  }

  // Set persistent cookie with days
  public setPersistentCookie(name: string, value: string, days: number, options: Omit<CookieOptions, 'expires'> = {}): void {
    this.setCookie(name, value, { ...options, expires: days });
  }

  // Cookie consent management
  public setConsentPreferences(preferences: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }): void {
    this.setPersistentCookie('cookie_consent', JSON.stringify(preferences), 365);
  }

  public getConsentPreferences(): {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  } | null {
    const consent = this.getCookie('cookie_consent');
    if (consent) {
      try {
        return JSON.parse(consent);
      } catch (error) {
        console.error('Failed to parse cookie consent preferences:', error);
        return null;
      }
    }
    return null;
  }

  // GDPR compliance helpers
  public isConsentGiven(): boolean {
    return this.hasCookie('cookie_consent');
  }

  public revokeConsent(): void {
    this.deleteCookie('cookie_consent');
    // Delete all non-necessary cookies
    const cookies = this.getAllCookies();
    for (const name in cookies) {
      if (!this.isNecessaryCookie(name)) {
        this.deleteCookie(name);
      }
    }
  }

  private isNecessaryCookie(name: string): boolean {
    const necessaryCookies = [
      'cookie_consent',
      'session_token',
      'csrf_token',
      'security_token'
    ];
    return necessaryCookies.includes(name);
  }

  // Security-related cookie methods
  public setSecureToken(name: string, token: string): void {
    this.setCookie(name, token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      expires: 1 // 1 day
    });
  }

  public getSecureToken(name: string): string | null {
    return this.getCookie(name);
  }

  // Analytics and tracking cookies
  public setAnalyticsCookie(name: string, value: string): void {
    const consent = this.getConsentPreferences();
    if (consent?.analytics) {
      this.setPersistentCookie(name, value, 365, {
        secure: true,
        sameSite: 'lax'
      });
    }
  }

  public setMarketingCookie(name: string, value: string): void {
    const consent = this.getConsentPreferences();
    if (consent?.marketing) {
      this.setPersistentCookie(name, value, 365, {
        secure: true,
        sameSite: 'lax'
      });
    }
  }
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance();

// Cookie consent banner component data
export const cookieCategories = {
  necessary: {
    name: 'Necessary Cookies',
    description: 'Essential cookies required for the website to function properly. These cannot be disabled.',
    required: true
  },
  analytics: {
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website by collecting anonymous information.',
    required: false
  },
  marketing: {
    name: 'Marketing Cookies',
    description: 'Used to track visitors across websites to display relevant and engaging advertisements.',
    required: false
  },
  functional: {
    name: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization, such as remembering your preferences.',
    required: false
  }
};

