import {Component,Input,Output,EventEmitter,ViewEncapsulation,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CrudTableComponent {
  // Table columns configuration
  @Input() columns: { field: string; header: string; width?: string }[] = [];

  // Original data to be displayed
  @Input() data: any[] = [];

  // Text used to filter table rows
  @Input() searchTerm: string = '';

  // Output events for CRUD actions
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  readonly rowsPerPageOptions = [5, 10, 20];

  // Compute filtered rows based on search term
  get filteredData(): any[] {
    if (!this.searchTerm) return this.data;
    const term = this.searchTerm.toLowerCase();
    return this.data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(term)
      )
    );
  }

  //  Simple confirm before delete
  confirmDelete(row: any) {
    if (confirm('⚠️ Are you sure you want to delete this record?')) {
      this.onDelete.emit(row);
    }
  }
}
