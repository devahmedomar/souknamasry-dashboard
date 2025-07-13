import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateRangeComponent } from "./shared/components/date-range/date-range.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DateRangeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'souknamasry-dashboard';
}
