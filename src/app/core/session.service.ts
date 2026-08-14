import { Injectable, signal } from '@angular/core';

const USER_KEY = 'eed-username';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly username = signal(sessionStorage.getItem(USER_KEY) ?? '');

  signIn(username: string): void {
    sessionStorage.setItem(USER_KEY, username);
    this.username.set(username);
  }

  signOut(): void {
    sessionStorage.removeItem(USER_KEY);
    this.username.set('');
  }
}
