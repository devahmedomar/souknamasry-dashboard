import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudTableComponent } from '../../shared/components/crud-table/crud-table.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { DateRangeComponent } from '../../shared/components/date-range/date-range.component';
import { ReportButtonComponent } from '../../shared/components/report-button/report-button.component';
import { OrdersService, Order } from '../../shared/services/orders.service';

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
export class OrdersComponent implements OnInit {
  // 🔍 Search input signal
  searchTerm = signal<string>('');

  // Current active tab signal
  activeTab = signal<string>('All');

  // Available tabs
  tabs: string[] = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

  // Table column definitions
columns = [
  { field: 'id', header: 'Order ID' },
  { field: 'customer', header: 'Customer' },
  { field: 'date', header: 'Date' },
  { field: 'status', header: 'Status' },
  { field: 'total', header: 'Total ($)' },
  { field: 'payment', header: 'Payment Method' },
  { field: 'items', header: 'Items' },
  { field: 'address', header: ' Address' },
];


  // Orders list 
  orders = signal<Order[]>([]);

  constructor(
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    // Subscribe to orders from the service
    this.ordersService.orders$.subscribe(list => {
      this.orders.set(list);
    });
  }

  // Filtered orders based on active tab and search term
  filteredOrders = computed(() => {
    let list = this.orders();

    // Filter by active tab (status)
    if (this.activeTab() !== 'All') {
      list = list.filter(o => o.status === this.activeTab());
    }

    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      list = list.filter(o =>
        Object.values(o).some(val =>
          String(val).toLowerCase().includes(term)
        )
      );
    }

    return list;
  });

  // Handle search input change
  handleSearch(term: string) {
    this.searchTerm.set(term);
  }

  // Change active tab
  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  // Delete order by ID
  deleteOrder(id: string) {
    this.ordersService.remove(id);
  }

  // Table actions
  handleView(order: Order) {
    console.log('View order:', order);
  }
  // Navigate to the edit page 
  handleEdit(order: Order) {
    this.router.navigate(['/orders/edit', order.id]);
  }

  // Navigate to the details page 
  handleRowClick(order: Order) {
  this.router.navigate(['/details', 'orders', order.id]);
}

}
