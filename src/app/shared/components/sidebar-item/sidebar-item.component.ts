import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import {trigger,transition,style,animate,} from '@angular/animations';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
  animations: [
    // Animation for submenu expand/collapse
    trigger('submenuAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarItemComponent implements OnInit {
  @Input() label!: string;
  @Input() icon?: string;
  @Input() route?: string;
  @Input() subItems?: { label: string; route: string; icon?: string }[];

  isOpen: boolean = false;         // Controls submenu open/close
  currentRoute: string = '';       // Tracks current active route

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial route
    this.currentRoute = this.router.url;

    // Update on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;

        // Auto-open submenu if any sub-route matches current URL
        this.isOpen = this.subItems?.some(sub =>
          this.currentRoute.startsWith(sub.route)
        ) ?? false;
      }
    });
  }

  // Toggle main item or navigate
  toggle() {
    if (this.subItems?.length) {
      this.isOpen = !this.isOpen;
    }

    if (this.route && this.currentRoute !== this.route) {
      this.router.navigateByUrl(this.route);
    }
  }

  // Navigate to sub-item route
  navigateSub(sub: { route: string }) {
    this.router.navigateByUrl(sub.route);
  }

  // Check if main item is active
  isMainActive(): boolean {
    if (this.route && this.currentRoute === this.route) {
      return true;
    }

    if (this.subItems?.length) {
      return this.subItems.some(sub =>
        this.currentRoute.startsWith(sub.route)
      );
    }

    return false;
  }

  // Check if specific sub-item is active
  isSubActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }
}
