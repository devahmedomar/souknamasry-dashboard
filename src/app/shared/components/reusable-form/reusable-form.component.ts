import { NgIf } from '@angular/common';
import { Component } from '@angular/core';



@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [NgIf],
  templateUrl: './reusable-form.component.html',
  styleUrl: './reusable-form.component.css'
})
export class ReusableFormComponent {

}
