import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CrudTableComponent {
  // 🟦 Inputs
  @Input() basePath = ''; // Base route for edit navigation
  @Input() columns: { field: string; header: string; width?: string }[] = []; // Table column 
  @Input() data: any[] = []; // data
  @Input() searchTerm = ''; // Search filter value
  @Input() type = ''; // Table type ('users', 'orders')

  // 🟩 Outputs
  @Output() rowClick = new EventEmitter<any>(); // Emitted when a row is clicked
  @Output() onView = new EventEmitter<any>(); // Emitted on "View" action
  @Output() onEdit = new EventEmitter<any>(); // Emitted on "Edit" action
  @Output() onDelete = new EventEmitter<any>(); // Emitted on "Delete" action

  // Pagination options
  readonly rowsPerPageOptions = [5, 10, 20]; 

  constructor(public router: Router) {}

  // Filter table data based on search term
  get filteredData(): any[] {
    if (!this.searchTerm) return this.data;
    const term = this.searchTerm.toLowerCase();
    return this.data.filter(row =>
      Object.values(row).some(value =>
        value?.toString().toLowerCase().includes(term)
      )
    );
  }

  //  Navigate to edit page
  handleEdit(row: any) {
    this.router.navigate([this.basePath, 'edit', row.id]);
  }

  //  Confirm before deleting 
  confirmDelete(row: any) {
    if (confirm('⚠️ Are you sure you want to delete this record?')) {
      this.onDelete.emit(row);
    }
  }

  // Emit row click event
  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
}
