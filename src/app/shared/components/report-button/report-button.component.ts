import { Component, Input, inject, PLATFORM_ID } from '@angular/core';
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
  @Input() tableData: any[] = [];
  @Input() dateRange: Date[] = [];

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  exportExcel(event: MouseEvent): void {
    event.preventDefault(); // Prevent default anchor behavior
    this.executeExport();
    this.isDropdownOpen = false; // Close dropdown after export
  }

  executeExport(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.exportToExcel(this.tableData, this.dateRange, "report");
    }
  }

  exportToExcel(data: any[], dateRange: Date[], name: string): void {
    if (!dateRange || dateRange.length < 2) {
      console.warn('Please select a date range first.');
      return;
    }

    const timespan = new Date().toISOString();
    const prefix = name || "Export Result";
    const fileName = `${prefix}-${timespan}.xlsx`;

    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    if (isPlatformBrowser(this.platformId)) {
      XLSX.writeFile(workbook, fileName);
    }
  }
}