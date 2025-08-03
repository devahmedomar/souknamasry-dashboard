import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input , Output , EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {

@Input() width: string = 'auto';
@Output() addClick = new EventEmitter<void>();

}
