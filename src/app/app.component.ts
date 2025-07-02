import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import {trigger,transition,style,animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 animations: [
  trigger('sidebarAnimation', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ])
  ])
]
})
export class AppComponent {
  title = 'souknamasry-dashboard';

  // Controls sidebar open state
  isSidebarOpen = true;

  // Toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
