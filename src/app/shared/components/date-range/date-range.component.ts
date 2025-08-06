import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [FormsModule, CalendarModule, CommonModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class DateRangeComponent {
  rangeDates: Date[] = [];
  showCalendar = false;

  toggleCalendarVisibilty(event: MouseEvent) {
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
      const startStr = this.formatDate(startDate);
      const endStr = this.formatDate(endDate);
      return startStr === endStr ? startStr : `${startStr} - ${endStr}`;
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