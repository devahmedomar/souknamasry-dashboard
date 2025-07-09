import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
   imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginData = {
    email: '',
    password: '',
    remember: false,
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Submitted:', this.loginData);
    } else {
      console.warn('Form Invalid');
    }
  }
}
