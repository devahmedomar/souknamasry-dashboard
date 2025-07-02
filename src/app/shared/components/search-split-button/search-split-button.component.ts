import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
  selector: 'app-search-split-button',
  standalone: true,
  imports: [CommonModule, FormsModule,CascadeSelectModule],

  templateUrl: './search-split-button.component.html',
  styleUrl: './search-split-button.component.css'
})
export class SearchSplitButtonComponent {

  // Holds the selected value from the dropdown
  selectedItem: any;

  // Options for the cascaded dropdown
  items: any[] = [
    {
      name: 'Stores',
      children: [
        { name: 'Open' },
        { name: 'Pending Approval' },
        { name: 'Suspended' },
        { name: 'Banned' },
        { name: 'Closed' }
      ]
    },
    {
      name: 'Users',
      children: [
        { name: 'Active' },
        { name: 'Inactive' },
        { name: 'Banned' },
        { name: 'Deleted' }
      ]
    },
    {
      name: 'Orders',
      children: [
        { name: 'Pending' },
        { name: 'Shipped' },
        { name: 'Delivered' },
        { name: 'Cancelled' },
        
      
      ]
    },
    {
      name: 'Roles',
      children: [
        { name: 'Super Admin' },
        { name: 'Admin' },
        { name: 'Shop Owner' }
      ]
    }
  ];

}