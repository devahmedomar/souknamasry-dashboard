import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ NavbarComponent , SidebarComponent , RouterModule , CommonModule  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
 isSidebarOpen = true;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

}
