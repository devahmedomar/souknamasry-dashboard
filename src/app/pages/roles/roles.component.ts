import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { DateRangeComponent } from "../../shared/components/date-range/date-range.component";
import { ReportButtonComponent } from "../../shared/components/report-button/report-button.component";
import { AddButtonComponent } from "../../shared/components/add-button/add-button.component";
import { CrudTableComponent } from "../../shared/components/crud-table/crud-table.component";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [BreadcrumbComponent, DateRangeComponent, ReportButtonComponent, AddButtonComponent, CrudTableComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
// ✅ Columns definition for the CRUD table
  tableColumns = [
    { field: 'no', header: 'Number', width: '100px'},
    { field: 'name', header: 'Name', width: '150px'},
    { field: 'email', header: 'Email', width: '250px'},
    { field: 'phone', header: 'Phone Number', width: '150px'},
    { field: 'role', header: 'Role', width: '120px'},
    {field:'actions', header:'Actions', width:"100px"}
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
      name: 'Shahd Othman',
      email: 'shahd@example.com',
      phone: '01012345678',
      role: "delivery",
    },
    {
      no: 3,
      name: 'Shahd Othman',
      email: 'shahd@example.com',
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