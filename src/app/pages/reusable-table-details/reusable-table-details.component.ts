import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../shared/services/users.service';
import { OrdersService } from '../../shared/services/orders.service';

@Component({
  selector: 'app-reusable-table-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-table-details.component.html',
  styleUrls: ['./reusable-table-details.component.css']
})
export class ReusableTableDetailsComponent implements OnInit {
  item: any;
  type!: string;
  id!: string | number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    // Watch route params and load the correct data
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type')!;
      const idParam = params.get('id')!;

      if (this.type === 'users') {
        this.id = Number(idParam);
        this.usersService.getById(this.id).subscribe({
          next: data => (this.item = data),
          error: err => console.error('Error fetching user:', err)
        });
      } else if (this.type === 'orders') {
        this.id = idParam;
        this.ordersService.getById(this.id).subscribe({
          next: data => (this.item = data),
          error: err => console.error('Error fetching order:', err)
        });
      }
    });
  }

  // Navigate back to list
  goBack(): void {
    this.router.navigate([`/${this.type}`]);
  }

  // Navigate from user → related order
  goToOrderDetails(): void {
    if (this.item?.orderId) {
      this.router.navigate(['/details', 'orders', this.item.orderId]);
    } else {
      alert('This user has no linked order.');
    }
  }
}
