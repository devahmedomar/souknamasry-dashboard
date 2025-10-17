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
  orderId?: string;
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

  /* Reset users => always fallback data  */
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

  /* Fallback default users  */
     private _getFallback(): User[] {
  return [
    {
      id: 1,
      name: 'Ahmed Ali',
      status: 'active',
      phone: '01012345678',
      hasOrder: true,
      email: 'ahmed@example.com',
      orderId: '1001'
    },
    {
      id: 2,
      name: 'Sara Youssef',
      status: 'active',
      phone: '01098765432',
      hasOrder: true,
      email: 'sara@example.com',
      orderId: '1002'
    },
    {
      id: 3,
      name: 'Omar Mohamed',
      status: 'active',
      phone: '01055556666',
      hasOrder: true,
      email: 'omar@example.com',
      orderId: '1003'
    },
    {
      id: 4,
      name: 'Mona Adel',
      status: 'active',
      phone: '01077778888',
      hasOrder: true,
      email: 'mona@example.com',
      orderId: '1004'
    },
    {
      id: 5,
      name: 'Shahd Othman',
      status: 'inactive',
      phone: '01022223333',
      hasOrder: false,
      email: 'shahd@example.com'
    }
  ];
}


  // =====================
  //  CRUD methods
  // =====================

  /* Return all users */
  getAll(): User[] {
    return this.data;
  }

  /* Find user by id  */
  getById(id: number): Observable<User | undefined> {
    return this.users$.pipe(map(users => users.find(u => u.id === id)));
  }

  /* Add a new user  */
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
