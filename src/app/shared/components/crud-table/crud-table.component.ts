import { Component, Input, Output, EventEmitter, Inject , ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.css',
   encapsulation: ViewEncapsulation.None
})
export class CrudTableComponent {
 @Input() columns: { field: string; header: string; width?: string }[] = [];
@Input() data: any[] = [];

@Input() searchTerm: string = ''; // receive word

@Output() onView = new EventEmitter<any>();
@Output() onEdit = new EventEmitter<any>();
@Output() onDelete = new EventEmitter<any>();

readonly rowsPerPageOptions = [5, 10, 20];

get filteredData(): any[] {
  if (!this.searchTerm) return this.data;
  const term = this.searchTerm.toLowerCase();
  return this.data.filter(row =>
    Object.values(row).some(value =>
      value?.toString().toLowerCase().includes(term)
    )
  );
}

}
