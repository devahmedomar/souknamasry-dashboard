import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Store model
export interface Store {
  id: number;
  name: string;
  location?: string;
  shopOwner?: string;
  email?: string;
  numberOfProducts?: number;
  status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class StoresService {
  private _storageKey = 'app_stores_v1'; // LocalStorage key

  // BehaviorSubject keeps reactive store data
  private _stores$ = new BehaviorSubject<Store[]>(this._loadInitial());
  stores$ = this._stores$.asObservable(); // Public observable to subscribe

  private get data() {
    return this._stores$.value; // Current snapshot of stores
  }

  // Reset stores to initial data
  reset() {
    const fallback = this._loadInitial();
    this.next(fallback);
  }

  // Update BehaviorSubject and persist in localStorage
  private next(stores: Store[]) {
    this._stores$.next(stores);
    this._save(stores);
  }

  // Load initial data from localStorage or fallback demo data
  private _loadInitial(): Store[] {
    try {
      const raw = localStorage.getItem(this._storageKey);
      if (raw) return JSON.parse(raw) as Store[];
    } catch {}

    // Default demo data
    return [
      {
        id: 1,
        name: 'Main Store',
        location: 'Cairo',
        shopOwner: 'Ahmed Hassan',
        email: 'main@store.com',
        numberOfProducts: 120,
        status: 'active',
      },
      {
        id: 2,
        name: 'Alex Store',
        location: 'Alexandria',
        shopOwner: 'Sara Ali',
        email: 'alex@store.com',
        numberOfProducts: 80,
        status: 'inactive',
      },
    ];
  }

  // Save to localStorage
  private _save(stores: Store[]) {
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(stores));
    } catch {}
  }

  // ----------------------------
  // Public CRUD Methods
  // ----------------------------

  // Get all stores
  getAll() {
    return this.data;
  }

  // Get store by ID
  getById(id: number) {
    return this.data.find((s) => s.id === id);
  }

  // Add new store (auto-generate id)
  add(store: Omit<Store, 'id'>) {
    const id = this.data.length
      ? Math.max(...this.data.map((s) => s.id)) + 1
      : 1;
    this.next([...this.data, { id, ...store }]);
  }

  // Update store by ID
  update(id: number, changes: Partial<Store>) {
    this.next(this.data.map((s) => (s.id === id ? { ...s, ...changes } : s)));
  }

  // Remove store by ID
  remove(id: number) {
    this.next(this.data.filter((s) => s.id !== id));
  }
}
