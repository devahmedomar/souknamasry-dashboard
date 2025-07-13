import { NgIf } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { SearchSplitButtonComponent } from '../search-split-button/search-split-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, SearchSplitButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private renderer: Renderer2,){};
isNavbarOpen: boolean = false; // Tracks whether the navbar is open or closed

  
  /**
   * Toggles the visibility of the navbar (e.g., in mobile view).
   */
 toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
    const navbar = document.getElementById('navbarSupportedContent');

    if (navbar) {
      if (this.isNavbarOpen) {
        // Open the navbar
        this.renderer.removeClass(navbar, 'd-none');
        this.renderer.addClass(navbar, 'd-block');
      } else {
        // Close the navbar
        this.renderer.addClass(navbar, 'd-none');
        this.renderer.removeClass(navbar, 'd-block');
      }
    }
}



  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}