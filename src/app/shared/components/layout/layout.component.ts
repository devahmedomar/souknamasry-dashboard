import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [SidebarComponent, RouterModule, NavbarComponent, CommonModule],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  // Controls sidebar visibility
  isSidebarOpen = true;

  // Checks if current screen is mobile
  isMobile = false;

  ngOnInit() {
    this.updateLayout();
  }

  // Updates layout on window resize
  @HostListener('window:resize')
  onResize() {
    this.updateLayout();
  }

  // Adjusts sidebar state based on screen size
  updateLayout() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 1024;
      this.isSidebarOpen = !this.isMobile;
    }
  }

  // Toggles sidebar open/close
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
