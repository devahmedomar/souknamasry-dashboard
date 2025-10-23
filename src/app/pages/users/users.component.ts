import { Component } from '@angular/core';
import { UsersService , User } from '../../shared/services/users.service';
import { CommonModule } from '@angular/common';
import { CrudTableComponent } from '../../shared/components/crud-table/crud-table.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { ReportButtonComponent } from "../../shared/components/report-button/report-button.component";
import { DateRangeComponent } from "../../shared/components/date-range/date-range.component";
import { ViewEncapsulation } from '@angular/core';
import { ReusableTableDetailsComponent } from '../reusable-table-details/reusable-table-details.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CrudTableComponent,CommonModule,SearchBarComponent,ReportButtonComponent,DateRangeComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {
  // Search term (used with search bar)
  searchTerm = '';

  // fetch from the service 
  users$ = this.usersService.users$;

  // Table columns configuration
  tableColumns = [
    { field: 'name', header: 'Name', width: '150px' },
    { field: 'status', header: 'Status', width: '120px' },
    { field: 'phone', header: 'Phone Number', width: '150px' },
    { field: 'hasOrder', header: 'Has Order?', width: '120px' },
    { field: 'email', header: 'Email', width: '250px' },
  ];

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    console.log('UsersComponent initialized');
  }

  // Navigate to Add User page
  handleAddUser() {
    this.router.navigate(['/users/add']);
  }

  // Update search term
  handleSearch(term: string) {
    this.searchTerm = term;
  }

  // Table actions
  handleView(user: User) {
    console.log('Viewing:', user);
  }

  handleEdit(user: User) {
    this.router.navigate(['/users/edit', user.id]);
  }

  handleDelete(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.usersService.remove(user.id);
    }
  }

  // Stats (calculated from service data)
  get totalUsers() {
    return this.usersService.getAll().length;
  }

  get activeUsers() {
    return this.usersService.getAll().filter(user => user.status.toLowerCase() === 'active').length;
  }

  get inactiveUsers() {
    return this.usersService.getAll().filter(user => user.status.toLowerCase() === 'inactive').length;
  }
  // Navigate to the details page 
  handleRowClick(user: any) {
  this.router.navigate(['/details', 'users', user.id]);
}




}
