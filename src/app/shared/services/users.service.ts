import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* User model */
export interface User {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  phone?: string;
  email?: string;
  hasOrder?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  /* Key used to store data in localStorage */
  private readonly _storageKey = 'app_users_v1';

  /* BehaviorSubject holds and streams users data */
  private readonly _users$ = new BehaviorSubject<User[]>(this._getFallback());
  users$ = this._users$.asObservable(); // public observable for components

  /* Shortcut to get current users list */
  private get data(): User[] {
    return this._users$.value;
  }

  /* Reset users => always fallback data (ignore localStorage) */
  reset() {
    this.next(this._getFallback());
  }

  /* Push new users array into BehaviorSubject and save to storage */
  private next(users: User[]) {
    this._users$.next(users);
    this._save(users);
  }

  /* Save users to localStorage safely */
  private _save(users: User[]) {
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(users));
    } catch (err) {
      console.error('❌ Failed to save users to localStorage', err);
    }
  }

  /* Fallback default users (used when reset or initial load) */
  private _getFallback(): User[] {
    return [
      { id: 1, name: 'Shahd Othman', status: 'active', phone: '01012345678', hasOrder: true, email: 'shahd@example.com' },
      { id: 2, name: 'Mohamed Ali', status: 'inactive', phone: '01098765432', hasOrder: false, email: 'mo@example.com' },
      { id: 3, name: 'Mohamed Ahmed', status: 'active', phone: '01098765432', hasOrder: true, email: 'mo.ahmed@example.com' },
      { id: 4, name: 'Sara Hassan', status: 'active', phone: '01055556666', hasOrder: false, email: 'sara@example.com' },
      { id: 5, name: 'Omar Youssef', status: 'inactive', phone: '01077778888', hasOrder: true, email: 'omar@example.com' },
    ];
  }

  // =====================
  //  CRUD methods
  // =====================

  /* Return all users as array */
  getAll(): User[] {
    return this.data;
  }

  /* Find user by id as observable (async) */
  getById(id: number): Observable<User | undefined> {
    return this.users$.pipe(map(users => users.find(u => u.id === id)));
  }

  /* Add a new user (id auto-generated) */
  add(user: Pick<User, 'name' | 'status'> & Partial<User>) {
    const id = this.data.length ? Math.max(...this.data.map(u => u.id)) + 1 : 1;
    const newUser: User = { id, ...user };
    this.next([...this.data, newUser]);
  }

  /* Update existing user by id (with check before next) */
  update(id: number, changes: Partial<User>) {
    const exists = this.data.some(u => u.id === id);
    if (!exists) return;

    const updated = this.data.map(u => (u.id === id ? { ...u, ...changes } : u));
    this.next(updated);
  }

  /* Remove user by id (with check before next) */
  remove(id: number) {
    const exists = this.data.some(u => u.id === id);
    if (!exists) return;

    this.next(this.data.filter(u => u.id !== id));
  }
}
