import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReusableFormComponent } from '../../shared/components/reusable-form/reusable-form.component';
import { OrdersService, Order } from '../../shared/services/orders.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [CommonModule, ReusableFormComponent],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  // Store edit id if available
  editId: string | null = null;

  // Initial form data (empty for add, filled for edit)
  initialData: Order | null = null;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.editId = id;
        this.ordersService.getById(id).subscribe(order => {
          if (order) {
            this.initialData = order;
          }
        });
      }
    });
  }

  // ✅ Order form fields definition
  orderFields = [
    // --- Row 1 ---
    { type: 'text', label: 'Customer', name: 'customer', placeholder: 'Enter customer name', col: 6, required: true },
    { type: 'date', label: 'Date', name: 'date', placeholder: 'Select order date', col: 6, required: true },

    // --- Row 2 ---
    { type: 'number', label: 'Total ($)', name: 'total', placeholder: 'Enter total price', col: 6, required: true },
    { type: 'number', label: 'Items', name: 'items', placeholder: 'Enter number of items', col: 6, required: true },

    // --- Row 3 ---
    {
      type: 'dropdown',
      label: 'Status',
      name: 'status',
      placeholder: 'Select status',
      col: 6,
      required: true,
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Shipped', value: 'Shipped' },
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Cancelled', value: 'Cancelled' },
      ]
    },
    {
      type: 'dropdown',
      label: 'Payment Method',
      name: 'payment',
      placeholder: 'Select payment method',
      col: 6,
      required: true,
      options: [
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'Cash on Delivery', value: 'Cash on Delivery' },
        { label: 'PayPal', value: 'PayPal' },
      ]
    },

    // --- Row 4 (full width) ---
    { type: 'text', label: 'Shipping Address', name: 'address', placeholder: 'Enter shipping address', col: 12, required: true },
  ];

  // ✅ Save order (add or update)
  saveOrder(orderData: any) {
    if (this.editId) {
      this.ordersService.update(this.editId, orderData);
    } else {
      this.ordersService.add(orderData);
    }

    // Redirect back to orders list after save
    this.router.navigate(['/orders']);
  }
}
