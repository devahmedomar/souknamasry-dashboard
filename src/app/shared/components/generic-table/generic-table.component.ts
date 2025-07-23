import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
@Input() columns: string[] = [];
@Input() data: any[] = [];

@Input() tableWidth: string = '100%';
@Input() tableHeight: string = 'auto';
}
