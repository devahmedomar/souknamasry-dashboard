import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReusableFormComponent } from '../../shared/components/reusable-form/reusable-form.component';
import { StoresService } from '../../shared/services/stores.service';

@Component({
  selector: 'app-add-store',
  standalone: true,
  imports: [CommonModule, ReusableFormComponent],
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.css'
})
export class AddStoreComponent {

  // Form fields config for reusable form
  storeFields = [
    { type: 'text', label: 'Store Name', name: 'name', placeholder: 'Enter store name', col: 6, required: true },
    { type: 'text', label: 'Location', name: 'location', placeholder: 'Enter store location', col: 6 },
    { type: 'text', label: 'Shop Owner', name: 'shopOwner', placeholder: 'Enter shop owner name', col: 6 },
    { type: 'text', label: 'Email', name: 'email', placeholder: 'Enter store email', col: 6 },
    { type: 'number', label: 'Number of Products', name: 'numberOfProducts', placeholder: 'Enter number of products', col: 6 },
    { 
      type: 'dropdown', 
      label: 'Status', 
      name: 'status', 
      placeholder: 'Select status', 
      col: 6, 
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ]
    }
  ];

  constructor(
    private storesService: StoresService, // Service to handle store data
    private router: Router                // Router for navigation
  ) {}

  // Save form data and redirect
  saveStore(data: any) {
    this.storesService.add(data);   // Call service to add store
    this.router.navigate(['/stores']); // Redirect to stores list
  }
}
