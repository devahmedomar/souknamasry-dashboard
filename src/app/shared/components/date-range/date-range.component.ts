import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [FormsModule, CalendarModule, CommonModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css',
})
export class DateRangeComponent implements OnInit {
  rangeDates: Date[] | undefined;
  showCalendar = false;

  ngOnInit() {
    // Optional: Set default range if needed
    // this.rangeDates = [new Date(), new Date()];
  }

  toggleCalendar(event: MouseEvent) {
    event.stopPropagation(); // Prevent closing immediately
    this.showCalendar = !this.showCalendar;
  }

  onDateSelect() {
    this.showCalendar = false; // Close calendar after selection
    console.log('Selected dates:', this.rangeDates);
  }

  formatDateRange(): string {
    if (!this.rangeDates || this.rangeDates.length === 0) {
      return 'choose date range';
    }

    const startDate = this.rangeDates[0];
    const endDate = this.rangeDates[1];

    if (startDate && endDate) {
      return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
    } else if (startDate) {
      return this.formatDate(startDate);
    }

    return 'choose date range';
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}