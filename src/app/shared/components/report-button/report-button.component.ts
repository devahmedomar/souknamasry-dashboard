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

 

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  executeExport(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.exportToExcel("data-table", "report");
    }
  }

  exportToExcel(tableId: string, name: string): void {
    
   const timespan = new Date().toISOString();
   const prefix = name || "Export Result";
   const fileName = `${prefix}-${timespan}`;
   const targetTable = document.getElementById(tableId);
    
    if (targetTable != null) {
      try {
        const wb = XLSX.utils.table_to_book(
          targetTable, 
          <XLSX.Table2SheetOpts>{ sheet: prefix }
        );
        XLSX.writeFile(wb, `${fileName}.xlsx`);
      } catch (error) {
        console.error('Error exporting to Excel:', error);
      }
    } else {
      console.warn(`Table with ID '${tableId}' not found`);
    }
  }
}