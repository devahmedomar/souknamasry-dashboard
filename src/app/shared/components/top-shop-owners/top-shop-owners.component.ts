import { Component } from '@angular/core';
import { GenericTableComponent } from "../generic-table/generic-table.component";

@Component({
  selector: 'app-top-shop-owners',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './top-shop-owners.component.html',
  styleUrl: './top-shop-owners.component.css'
})
export class TopShopOwnersComponent {
  topShopTitle = `Top Shop Owners`;
  columns: string[] = ['IMG', 'Shop','OwnerName', 'Revenue', 'Location', 'PhoneNumber'];
 data = [
    {
      id: 1,
      Shop: 'Lashika',
      OwnerName: 'Mohamed Tharwat',
      Revenue: '1.534 M',
      Location: 'Alexandria',
      PhoneNumber: '012743973785'
    },
     {
      id: 2,
      Shop: 'Lashika',
      OwnerName: 'Mohamed Tharwat',
      Revenue: '1.534 M',
      Location: 'Alexandria',
      PhoneNumber: '012743973785'
    },
     {
      id: 3,
      Shop: 'Lashika',
      OwnerName: 'Mohamed Tharwat',
      Revenue: '1.534 M',
      Location: 'Alexandria',
      PhoneNumber: '012743973785'
    },
  ];


}
