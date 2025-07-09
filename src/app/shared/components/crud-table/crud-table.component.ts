import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
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
  // ✅ Inputs: received from parent component
  @Input() columns: { field: string; header: string; width?: string }[] = [];
  @Input() data: any[] = [];

  // ✅ Outputs: emit events to parent
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  // ✅ Flags
  isMobileView = false;
  isBrowser: boolean;

  // ✅ Pagination state
  first = 0;                    
  rows = 5;                     
  rowsPerPageOptions = [5, 10, 20]; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Detect if running in browser (important for SSR support)
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // 🔹 Optional responsiveness (disabled for now)
  // ngOnInit(): void {
  //   if (this.isBrowser) {
  //     this.checkScreenSize();
  //     window.addEventListener('resize', () => this.checkScreenSize());
  //   }
  // }

  // @HostListener('window:resize')
  // onResize() {
  //   if (this.isBrowser) {
  //     this.checkScreenSize();
  //   }
  // }

  // private checkScreenSize() {
  //   if (this.isBrowser) {
  //     this.isMobileView = window.innerWidth <= 1070;
  //   }
  // }

  //  Slice data manually for pagination
  get paginatedData() {
    return this.data.slice(this.first, this.first + this.rows);
  }

  //  Handle pagination change event
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
