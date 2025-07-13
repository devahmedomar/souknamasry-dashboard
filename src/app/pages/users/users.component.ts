import { Component } from '@angular/core';
import { DateRangeComponent } from '../../shared/components/date-range/date-range.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DateRangeComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
