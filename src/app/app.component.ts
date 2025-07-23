import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from "./shared/components/breadcrumb/breadcrumb.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'souknamasry-dashboard';
}
