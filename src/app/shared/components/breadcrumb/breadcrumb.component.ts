import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

interface BreadcrumbItem {
  label: string;
  url: string;
  isActive: boolean;
}
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });

     // Initialize breadcrumbs on component load
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    for (const child of route.children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'] || this.getRouteLabel(routeURL);

      if (label) {
        breadcrumbs.push({
          label,
          url,
          isActive: false
        });
      }

      this.createBreadcrumbs(child, url, breadcrumbs);
    }
       // Set the last breadcrumb as active
    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].isActive = true;
    }

    return breadcrumbs;
  }

   private getRouteLabel(route: string): string {
    const routeLabels: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'users': 'Users',
      'orders': 'Orders',
      'stores': 'Stores',
      'products': 'Products',
      'settings': 'Settings',
      'roles': 'Roles'
    };

    return routeLabels[route] || route;
  }
}
