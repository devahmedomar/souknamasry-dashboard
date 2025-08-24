import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudTableComponent } from '../../shared/components/crud-table/crud-table.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { DateRangeComponent } from '../../shared/components/date-range/date-range.component';
import { ReportButtonComponent } from '../../shared/components/report-button/report-button.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CrudTableComponent,
    SearchBarComponent,
    DateRangeComponent,
    ReportButtonComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  // 🔍 Search input state
  searchTerm = signal<string>('');

  // 📌 Current active tab
  activeTab = signal<string>('All');

  // 📌 Tabs list
  tabs: string[] = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

  // 📌 Table columns
  columns = [
    { field: 'id', header: 'Order ID' },
    { field: 'customer', header: 'Customer' },
    { field: 'date', header: 'Date' },
    { field: 'status', header: 'Status' },
    { field: 'total', header: 'Total ($)' },
    { field: 'payment', header: 'Payment Method' },
    { field: 'items', header: 'Items' },
    { field: 'address', header: 'Shipping Address' },
  ];

  // 📌 Orders data
  orders = signal<any[]>([
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
  ]);

  // 📌 Filtered orders (by tab and search)
  filteredOrders = computed(() => {
    let list = this.orders();

    // Filter by active tab
    if (this.activeTab() !== 'All') {
      list = list.filter((o) => o.status === this.activeTab());
    }

    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      list = list.filter((o) =>
        Object.values(o).some((val) =>
          String(val).toLowerCase().includes(term)
        )
      );
    }

    return list;
  });

  // 📌 Handle search change
  handleSearch(term: string) {
    this.searchTerm.set(term);
  }

  // 📌 Set active tab
  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  // 📌 Delete order by ID
  deleteOrder(id: string) {
    this.orders.update((orders) => orders.filter((o) => o.id !== id));
  }

  // 📌 Table events
  handleView(order: any) {
    console.log('View order:', order);
  }

  handleEdit(order: any) {
    console.log('Edit order:', order);
  }

  handleDelete(order: any) {
    console.log('Delete order:', order);
    this.deleteOrder(order.id);
  }
}
