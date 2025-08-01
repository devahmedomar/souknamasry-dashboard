import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
  animations: [
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

  isOpen: boolean = false;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Store the current route on initial load
    this.currentRoute = this.router.url;

    // Update currentRoute on each navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  // Handle main link click and toggle submenu if exists
 toggle() {
  if (this.subItems?.length) {
    this.isOpen = !this.isOpen;
  }

  if (this.route && this.currentRoute !== this.route) {
    this.router.navigateByUrl(this.route);
  }
}


  // Navigate to a sub-item's route
  navigateSub(sub: { route: string }) {
     this.router.navigateByUrl(sub.route);
  }

  // Check if the main route is active
  isMainActive(): boolean {
    return this.route ? this.currentRoute === this.route : false;
  }

  // Check if a sub-item's route is active
  isSubActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
