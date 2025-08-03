import { Component, HostListener, Inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarOpen = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Set sidebar state on initial load (browser only)
    if (isPlatformBrowser(this.platformId)) {
      this.updateSidebarState(window.innerWidth);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update sidebar state on window resize
    if (isPlatformBrowser(this.platformId)) {
      const target = event.target as Window;
      this.updateSidebarState(target.innerWidth);
    }
  }

  // Show/hide sidebar based on screen width
  updateSidebarState(width: number) {
    this.isSidebarOpen = width > 1024;
  }

  // Toggle sidebar manually (button click)
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Check if current screen is mobile size
  get isMobile(): boolean {
    return isPlatformBrowser(this.platformId) && window.innerWidth <= 1024;
  }
}
