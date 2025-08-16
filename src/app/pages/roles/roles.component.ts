import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudTableComponent } from "../../shared/components/crud-table/crud-table.component";
import { DateRangeComponent } from "../../shared/components/date-range/date-range.component";
import { ReportButtonComponent } from "../../shared/components/report-button/report-button.component";
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ DateRangeComponent, ReportButtonComponent, CrudTableComponent, SearchBarComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  constructor(private router: Router) {}

handleAddUser() {
  this.router.navigate(['/roles/add']);
}

 


// ✅ Columns definition for the CRUD table
  tableColumns = [
    { field: 'no', header: 'Number', width: '100px'},
    { field: 'name', header: 'Name', width: '150px'},
    { field: 'email', header: 'Email', width: '250px'},
    { field: 'phone', header: 'Phone Number', width: '150px'},
    { field: 'role', header: 'Role', width: '120px'},
    
  ];

  // ✅ Sample data to display in the table
  tableData = [
    {
      no: 1,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 2,
      name: 'Maged Ahmed',
      email: 'magedahm@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 3,
      name: 'Maged Walid',
      email: 'MGWA@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 4,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 5,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 6,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 7,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 8,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 9,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 10,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 11,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 12,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
     no: 13,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    
  ];
  selectedDateRange: Date[] = [];
  onDateRangeChange(dates: Date[]) {
    this.selectedDateRange = dates;
  }
    searchTerm: string = ''; //reccive search results


  filteredData = [...this.tableData]; 

handleSearch(term: string) {
  this.searchTerm = term.toLowerCase();

  this.filteredData = this.tableData.filter(user =>
    user.name.toLowerCase().includes(this.searchTerm) ||
    user.email.toLowerCase().includes(this.searchTerm)
  );
}

  

  
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
      this.tableData = this.tableData.filter(u => u.no !== user.no);
    }
  }
}