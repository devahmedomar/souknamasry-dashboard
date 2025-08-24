import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddButtonComponent } from '../add-button/add-button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, AddButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Input() addButtonRoute: string = ''; // ✅ New input
  @Output() searchChange = new EventEmitter<string>();
  @Input() addButtonLabel: string = 'Add New'; // button name


  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }
}
