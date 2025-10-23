import { Component } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoresService, Store } from '../../shared/services/stores.service';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass, CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css'
})
export class StoresComponent {
  searchTerm: string = '';
  stores: Store[] = []; // stores from service

  constructor(private storesService: StoresService) {}

  ngOnInit() {
    this.loadStores();
  }

  // load stores from service
  loadStores() {
    this.stores = this.storesService.getAll();
  }

  // search filter
  get filteredStores(): Store[] {
    if (!this.searchTerm) return this.stores;
    const lower = this.searchTerm.toLowerCase();
    return this.stores.filter(store =>
      store.name.toLowerCase().includes(lower) ||
      (store.location?.toLowerCase().includes(lower) ?? false) ||
      (store.shopOwner?.toLowerCase().includes(lower) ?? false)
    );
  }
}
