import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarItemComponent, ButtonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // Logo image path
  image = 'assets/images/logo-al2.png';

  // To track the currently active route
  activeRoute = '';

  // Emit event to close sidebar (used in parent component)
  @Output() close = new EventEmitter<void>();

  // List of menu items for the sidebar
  menuItems = [
    {
      label: 'Home',
      icon: 'pi-home',
      route: '/home',
      subItems: []
    },
    {
      label: 'Stores',
      icon: 'pi-shop',
      route: '/stores',
      subItems: [
        { label: 'Add Store', route: '/stores/add', icon: 'pi pi-plus' }
      ]
    },
    {
      label: 'Users',
      icon: 'pi-user',
      route: '/users',
      subItems: [
        { label: 'Add User', route: '/users/add', icon: 'pi pi-user-plus' }
      ]
    },
    {
      label: 'Orders',
      icon: 'pi-shopping-cart',
      route: '/orders',
      subItems: [
        { label: 'Add Order', route: '/orders/add', icon: 'pi pi-cart-plus' }
      ]
    },
    {
      label: 'Roles',
      icon: 'pi-users',
      route: '/roles',
      subItems: [
        { label: 'Add Role', route: '/roles/add', icon: 'pi pi-plus-circle' }
      ]
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/settings'
    }
  ];

  constructor(private router: Router) {
    // Get the current URL when the component is initialized
    this.activeRoute = this.router.url;

    // Update active route whenever navigation happens
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  // Handle sidebar toggle icon click
  toggleSidebar() {
    this.close.emit();
  }

  // Logout and navigate to login page
  logout() {
    this.router.navigate(['/login']);
  }
}
