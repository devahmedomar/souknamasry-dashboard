import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
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
  styleUrl: './crud-table.component.css'
})
export class CrudTableComponent {
  @Input() columns: { field: string; header: string; width?: string }[] = [];
  @Input() data: any[] = [];

  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  readonly rowsPerPageOptions = [5, 10, 20];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
}
