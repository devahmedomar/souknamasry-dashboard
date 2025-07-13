import { Component } from '@angular/core';
import { AddButtonComponent } from '../../shared/components/add-button/add-button.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AddButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
