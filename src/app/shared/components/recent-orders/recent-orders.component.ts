import { Component } from '@angular/core';
import { GenericTableComponent } from '../generic-table/generic-table.component';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.css'
})
export class RecentOrdersComponent {

   columns: string[] = ['id', 'customerName','productname', 'orderDate', 'status', 'total'];
  data = [
    {
      id: 1,
      customerName: 'Ahmed Hassan',
      productname: 'cattel',
      orderDate: '2025-07-10',
      status: 'Pending',
      total: 1200.5
    },
    {
      id: 2,
      customerName: 'Mona Ali',
      productname: 'cattel',
      orderDate: '2025-07-11',
      status: 'Shipped',
      total: 850
    },
    {
      id: 3,
      customerName: 'Ibrahim Kamal',
      productname: 'cattel',
      orderDate: '2025-07-12',
      status: 'Delivered',
      total: 300
    }
  ];

}
