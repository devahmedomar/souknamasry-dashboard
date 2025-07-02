import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchSplitButtonComponent } from "./shared/components/search-split-button/search-split-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchSplitButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'souknamasry-dashboard';
}
