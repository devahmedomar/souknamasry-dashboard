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
    // Get type and id from the route
    this.type = this.route.snapshot.paramMap.get('type')!;
    const idParam = this.route.snapshot.paramMap.get('id')!;

    // Fetch user data
    if (this.type === 'users') {
      this.id = Number(idParam);
      this.usersService.getById(this.id).subscribe({
        next: data => (this.item = data),
        error: err => console.error('Error fetching user:', err)
      });
    }

    // Fetch order data
    else if (this.type === 'orders') {
      this.id = idParam;
      this.ordersService.getById(this.id).subscribe({
        next: data => (this.item = data),
        error: err => console.error('Error fetching order:', err)
      });
    }
  }

  // Navigate back to the list
  goBack(): void {
    this.router.navigate([`/${this.type}`]);
  }
}
