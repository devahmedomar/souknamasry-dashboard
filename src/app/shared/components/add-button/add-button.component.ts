import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  constructor(private router: Router) {}

  @Input() width: string = 'auto'; // Optional: customize button width
  @Input() label: string = 'Add New'; // Optional: customize button label
  @Input() route: string = ''; // Target route to navigate when button is clicked
  @Output() addClick = new EventEmitter<void>(); // Optional: emit event if no route is provided

  handleClick() {
    if (this.route) {
      this.router.navigateByUrl(this.route); // Navigate to specified route
    } else {
      this.addClick.emit(); // Emit event if no route is provided
    }
  }
}
