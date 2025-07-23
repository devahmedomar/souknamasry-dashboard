import { Component, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './report-button.component.html',
  styleUrl: './report-button.component.css'
})
export class ReportButtonComponent {
  isDropdownOpen = false;
  readonly platformId = inject(PLATFORM_ID);

  @ViewChild('exportTable', { static: false }) exportTableRef!: ElementRef;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onExportClick(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const table: HTMLElement = this.exportTableRef?.nativeElement;
    if (!table) {
      console.warn("Table not found for export");
      return;
    }

    const timespan = new Date().toISOString();
    const fileName = `report-${timespan}`;
    try {
      const wb: XLSX.WorkBook = XLSX.utils.table_to_book(table, { sheet: 'report' });
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } catch (err) {
      console.error('Excel export error:', err);
    }
  }
}
