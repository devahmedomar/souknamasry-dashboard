import { Component } from '@angular/core';
import { ReusableFormComponent } from '../../shared/components/reusable-form/reusable-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReusableFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
