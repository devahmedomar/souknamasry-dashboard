import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarItemComponent, ButtonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Emit event to close sidebar
  @Output() close = new EventEmitter<void>();

  // Used to check if current view is mobile
  @Input() isMobile = false;

  // Logo image path
  image = 'assets/images/logo-al2.png';

  // Track the current active route
  activeRoute = '';

  // Sidebar menu items with optional sub-items
  menuItems = [
    { label: 'Home', icon: 'pi-home', route: '/home', subItems: [] },
    {
      label: 'Stores',
      icon: 'pi-shop',
      route: '/stores',
      subItems: [
        { label: 'Add Store', route: '/stores/add', icon: 'pi pi-plus' },
      ],
    },
    {
      label: 'Users',
      icon: 'pi-user',
      route: '/users',
      subItems: [
        { label: 'Add User', route: '/users/add', icon: 'pi pi-user-plus' },
      ],
    },
    {
      label: 'Orders',
      icon: 'pi-shopping-cart',
      route: '/orders',
      subItems: [
        { label: 'Add Order', route: '/orders/add', icon: 'pi pi-cart-plus' },
      ],
    },
    {
      label: 'Roles',
      icon: 'pi-users',
      route: '/roles',
      subItems: [
        { label: 'Add Role', route: '/roles/add', icon: 'pi pi-plus-circle' },
      ],
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/settings',
    },
  ];

  constructor(private router: Router) {
    // Set initial active route
    this.activeRoute = this.router.url;

    // Update active route on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  // Trigger sidebar close event
  toggleSidebar() {
    this.close.emit();
  }

  // Redirect to login on logout
  logout() {
    this.router.navigate(['/login']);
  }
}
