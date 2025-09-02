import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** User model */
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
  /** LocalStorage key */
  private _storageKey = 'app_users_v1';

  /** BehaviorSubject to keep users state reactive and shared across components */
  private _users$ = new BehaviorSubject<User[]>(this._loadInitial());
  /** Public observable for components to subscribe */
  users$ = this._users$.asObservable();

  /** Quick getter for current data */
  private get data(): User[] {
    return this._users$.value;
  }

  /** Reset users back to fallback/initial data */
  reset() {
    const fallback = this._loadInitial();
    this.next(fallback);
  }

  /** Update BehaviorSubject + save to localStorage */
  private next(users: User[]) {
    this._users$.next(users);
    this._save(users);
  }

  /** Load initial users from localStorage or fallback data */
  private _loadInitial(): User[] {
    try {
      const raw = localStorage.getItem(this._storageKey);
      if (raw) return JSON.parse(raw) as User[];
    } catch {}

    // ✅ fallback data (unique IDs)
    return [
      {
        id: 1,
        name: 'Shahd Othman',
        status: 'active',
        phone: '01012345678',
        hasOrder: true,
        email: 'shahd@example.com',
      },
      {
        id: 2,
        name: 'Mohamed Ali',
        status: 'inactive',
        phone: '01098765432',
        hasOrder: false,
        email: 'mo@example.com',
      },
      {
        id: 3,
        name: 'Mohamed Ahmed',
        status: 'active',
        phone: '01098765432',
        hasOrder: true,
        email: 'mo.ahmed@example.com',
      },
      {
        id: 4,
        name: 'Sara Hassan',
        status: 'active',
        phone: '01055556666',
        hasOrder: false,
        email: 'sara@example.com',
      },
      {
        id: 5,
        name: 'Omar Youssef',
        status: 'inactive',
        phone: '01077778888',
        hasOrder: true,
        email: 'omar@example.com',
      },
    ];
  }

  /** Save users to localStorage */
  private _save(users: User[]) {
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(users));
    } catch {}
  }

  // ----------------------------
  // Public CRUD Methods
  // ----------------------------

  /** Get all users */
  getAll(): User[] {
    return this.data;
  }

  /** Get user by ID */
  getById(id: number): User | undefined {
    return this.data.find((u) => u.id === id);
  }

  /** Add new user (auto-generate ID) */
  add(user: Omit<User, 'id'>) {
    const id = this.data.length
      ? Math.max(...this.data.map((u) => u.id)) + 1
      : 1;
    this.next([...this.data, { id, ...user }]);
  }

  /** Update user by ID */
  update(id: number, changes: Partial<User>) {
    this.next(
      this.data.map((u) => (u.id === id ? { ...u, ...changes } : u))
    );
  }

  /** Remove user by ID */
  remove(id: number) {
    this.next(this.data.filter((u) => u.id !== id));
  }
}
