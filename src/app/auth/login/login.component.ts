import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { FormsModule, NgForm } from '@angular/forms';

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
  // This object holds the user input values bound from the login form
  loginData = {
    emailOrPhone: '',
    password: '',
    remember:false
  };

  onSubmit(form: NgForm) {
    const value = this.loginData.emailOrPhone;
    // Check if the input is a number (i.e., phone number)
    if (/^\d+$/.test(value)) {
      console.log('Login with phone:', value);
    } else {
      console.log('Login with email:', value);
    }
  }
}
