import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudTableComponent } from '../../shared/components/crud-table/crud-table.component';
import { AddButtonComponent } from "../../shared/components/add-button/add-button.component";
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CrudTableComponent, CommonModule, AddButtonComponent, SearchBarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  ngOnInit(): void {
  console.log('UsersComponent initialized');
}

   searchTerm = ''; //reccive search results

  handleSearch(term: string) {
  this.searchTerm = term;
}

  // ✅ Columns definition for the CRUD table
  tableColumns = [
    { field: 'name', header: 'Name', width: '150px', },
    { field: 'status', header: 'Status', width: '120px' },
    { field: 'phone', header: 'Phone Number', width: '150px' },
    { field: 'hasOrder', header: 'Has Order?', width: '120px' },
    { field: 'email', header: 'Email', width: '250px' },
  ];

  // ✅ Sample data to display in the table
  tableData = [
    {
      id: 1,
      name: 'Shahd Othman',
      status: 'active',
      phone: '01012345678',
      hasOrder: true,
      email: 'shahd@example.com'
    },
    {
      id: 2,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 3,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 4,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 5,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 6,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 7,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 8,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 9,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 10,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 11,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 12,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    {
      id: 13,
      name: 'Mohamed Ali',
      status: 'inactive',
      phone: '01098765432',
      hasOrder: false,
      email: 'mo@example.com'
    },
    
  ];

  // ✅ Handle view action from the table
  handleView(user: any) {
    console.log('Viewing:', user);
  }

  // ✅ Handle edit action from the table
  handleEdit(user: any) {
    console.log('Editing:', user);
  }

  // ✅ Handle delete action from the table
  handleDelete(user: any) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.tableData = this.tableData.filter(u => u.id !== user.id);
    }
  }

 

  get totalUsers() {
  return this.tableData.length;
}

get activeUsers() {
  return this.tableData.filter(user => user.status.toLowerCase() === 'active').length;
}

get inactiveUsers() {
  return this.tableData.filter(user => user.status.toLowerCase() === 'inactive').length;
}


}
