import { Component } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Store {
  name: string;
  category: string;
  products: number;
  status: string;
  images: string[];
}
@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [NgFor,FormsModule, NgClass, CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css'
})
export class StoresComponent {
searchTerm: string = '';

  stores: Store[] = [
    { name: 'TrendHive', category: 'Clothing', products: 133, status: 'Active', 
      images: ['../../../assets/images/shop3 1.png', '../../../assets/images/shop5 1.png'] },
    { name: 'HomeLux', category: 'Furniture', products: 85, status: 'Active', images: ['../../../assets/images/shop6 1.png'] },
    { name: 'CookEase', category: 'Kitchenware', products: 55, status: 'Active', images: ['../../../assets/images/shop7 1.png'] },
    { name: 'TrendHive', category: 'Clothing', products: 133, status: 'Active', 
      images: ['../../../assets/images/shop3 1.png', '../../../assets/images/shop5 1.png'] },
    { name: 'HomeLux', category: 'Furniture', products: 85, status: 'Active', images: ['../../../assets/images/shop6 1.png'] },
    { name: 'CookEase', category: 'Kitchenware', products: 55, status: 'Active', images: ['../../../assets/images/shop7 1.png'] },
    
  ];

  get filteredStores(): Store[] {
    if (!this.searchTerm) return this.stores;
    const lower = this.searchTerm.toLowerCase();
    return this.stores.filter(store =>
      store.name.toLowerCase().includes(lower) ||
      store.category.toLowerCase().includes(lower)
    );
  }
}
