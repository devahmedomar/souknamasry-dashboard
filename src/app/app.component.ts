import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrudTableComponent } from "./shared/components/crud-table/crud-table.component";
import { UsersComponent } from "./pages/users/users.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrudTableComponent, UsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'souknamasry-dashboard';
}
