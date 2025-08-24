import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

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
    NgIf
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
errorMessage: string = '';


    
  
  onSubmit(form: NgForm) {
    const value = this.loginData.emailOrPhone;
    // Check if the input is a number (i.e., phone number)
    if (/^\d+$/.test(value)) {
      console.log('Login with phone:', value);
    } else {
      console.log('Login with email:', value);
    }
    if (!this.loginData.emailOrPhone && !this.loginData.password) {
      this.errorMessage = 'Please enter your email or phone and password.';
    } else if (!this.loginData.emailOrPhone) {
      this.errorMessage = 'Please enter your email or phone.';
    } else if (!this.loginData.password) {
      this.errorMessage = 'Please enter your password.';
    } else {
      this.errorMessage = '';
      // ✅ Here you can call your login API
      console.log('Login data:', this.loginData);
    }
  }
}
