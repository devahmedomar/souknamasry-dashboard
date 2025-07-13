import { Component, ViewEncapsulation } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-split-button',
  standalone: true,
  imports: [ToastModule, FormsModule],
  providers: [MessageService],
  templateUrl: './search-split-button.component.html',
  styleUrl: './search-split-button.component.css',
   
})
export class SearchSplitButtonComponent {
  searchTerm = '';
selectedOption = '';
isDropdownOpen = false;

search() {
  console.log(`Searching "${this.searchTerm}" in ${this.selectedOption}`);
}

selectOption(option: string) {
  this.selectedOption = option;
  this.isDropdownOpen = false;
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}




}
