import { NgIf } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  timespan!: any;
  prefix!: any;
  fileName!: any;
  targetTable!: any;
  wb!: any;
  readonly platformId = inject(PLATFORM_ID);

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  executeExport(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.exportToExcel("data-table", "report");
    }
  }

  exportToExcel(tableId: string, name: string): void {
    
    this.timespan = new Date().toISOString();
    this.prefix = name || "Export Result";
    this.fileName = `${this.prefix}-${this.timespan}`;
    this.targetTable = document.getElementById(tableId);
    
    if (this.targetTable != null) {
      try {
        this.wb = XLSX.utils.table_to_book(
          this.targetTable, 
          <XLSX.Table2SheetOpts>{ sheet: this.prefix }
        );
        XLSX.writeFile(this.wb, `${this.fileName}.xlsx`);
      } catch (error) {
        console.error('Error exporting to Excel:', error);
      }
    } else {
      console.warn(`Table with ID '${tableId}' not found`);
    }
  }
}