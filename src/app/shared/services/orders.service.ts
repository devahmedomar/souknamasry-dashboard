import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* =====================
   Order model interface
   ===================== */
export interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  payment: string;
  items: number;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  /* Key for localStorage */
  private readonly _storageKey = 'app_orders_v1';

  /* BehaviorSubject holds and streams orders data */
  private readonly _orders$ = new BehaviorSubject<Order[]>(this._getFallback());
  orders$ = this._orders$.asObservable();

  /* Shortcut to access current data */
  private get data(): Order[] {
    return this._orders$.value;
  }

  /* Reset orders back to fallback data */
  reset() {
    this.next(this._getFallback());
  }

  /* Push new orders array into BehaviorSubject and save */
  private next(orders: Order[]) {
    this._orders$.next(orders);
    this._save(orders);
  }

  /* Save orders to localStorage */
  private _save(orders: Order[]) {
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(orders));
    } catch (err) {
      console.error('❌ Failed to save orders to localStorage', err);
    }
  }

  /* Default fallback orders */
  private _getFallback(): Order[] {
    return [
      {
        id: '1001',
        customer: 'Ahmed Ali',
        date: '2025-08-10',
        status: 'Pending',
        total: 120,
        payment: 'Credit Card',
        items: 3,
        address: 'Cairo, Egypt',
      },
      {
        id: '1002',
        customer: 'Sara Youssef',
        date: '2025-08-11',
        status: 'Shipped',
        total: 250,
        payment: 'Cash on Delivery',
        items: 5,
        address: 'Giza, Egypt',
      },
      {
        id: '1003',
        customer: 'Omar Mohamed',
        date: '2025-08-12',
        status: 'Delivered',
        total: 90,
        payment: 'PayPal',
        items: 2,
        address: 'Alexandria, Egypt',
      },
      {
        id: '1004',
        customer: 'Mona Adel',
        date: '2025-08-13',
        status: 'Cancelled',
        total: 180,
        payment: 'Credit Card',
        items: 4,
        address: 'Mansoura, Egypt',
      },
    ];
  }

  // =====================
  //  CRUD methods
  // =====================

  /* Return all orders */
  getAll(): Order[] {
    return this.data;
  }

  /* Get order by ID */
  getById(id: string): Observable<Order | undefined> {
    return this.orders$.pipe(map(orders => orders.find(o => o.id === id)));
  }

  /* Add a new order (auto-generate ID) */
  add(order: Omit<Order, 'id'>) {
    const id = (Math.max(...this.data.map(o => +o.id), 0) + 1).toString();
    const newOrder: Order = { id, ...order };
    this.next([...this.data, newOrder]);
  }

  /* Update existing order */
  update(id: string, changes: Partial<Order>) {
    const exists = this.data.some(o => o.id === id);
    if (!exists) return;

    const updated = this.data.map(o =>
      o.id === id ? { ...o, ...changes } : o
    );
    this.next(updated);
  }

  /* Remove order by ID */
  remove(id: string) {
    const exists = this.data.some(o => o.id === id);
    if (!exists) return;

    this.next(this.data.filter(o => o.id !== id));
  }
}
