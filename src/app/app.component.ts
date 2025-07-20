import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { RecentOrdersComponent } from "./shared/components/recent-orders/recent-orders.component";
import { TopShopOwnersComponent } from './shared/components/top-shop-owners/top-shop-owners.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RecentOrdersComponent, TopShopOwnersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'souknamasry-dashboard';
}
