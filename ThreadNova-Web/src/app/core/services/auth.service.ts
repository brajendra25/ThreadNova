import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated = signal<boolean>(this.hasValidToken());
  public userRole = signal<string>('customer');

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    const user = this.getUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
    }
  }

  login(email: string, password: string): void {
    // Mock login - in real app, call API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      phoneNumber: '+1234567890',
      addresses: [],
      createdAt: new Date()
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'mock-token-' + Math.random().toString(36));
    localStorage.setItem('userRole', 'customer');

    this.currentUserSubject.next(mockUser);
    this.isAuthenticated.set(true);
    this.userRole.set('customer');
  }

  register(firstName: string, lastName: string, email: string, password: string): void {
    // Mock register
    this.login(email, password);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.userRole.set('customer');
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private hasValidToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
