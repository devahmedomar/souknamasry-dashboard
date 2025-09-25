import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableFormComponent } from '../../shared/components/reusable-form/reusable-form.component';
import { UsersService, User } from '../../shared/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReusableFormComponent],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] 
})
export class AddUserComponent implements OnInit {
  editId: number | null = null;
  initialData: User | null = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editId = +id;

        // since getById now returns Observable<User | undefined>
        this.usersService.getById(this.editId).subscribe(user => {
          if (user) {
            this.initialData = user;
          }
        });
      }
    });
  }

  // Form fields definition (can be reused by the reusable-form component)
  userFields = [
    { type: 'text', label: 'Name', name: 'name', placeholder: 'Enter full name', col: 6, required: true },
    { type: 'text', label: 'Phone', name: 'phone', placeholder: 'Enter phone number', col: 6 },
    { type: 'text', label: 'Email', name: 'email', placeholder: 'Enter email address', col: 6 },
    {
      type: 'dropdown', label: 'Status', name: 'status', placeholder: 'Select status', col: 6,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ]
    },
    {
      type: 'dropdown', label: 'Order Requested?', name: 'hasOrder', placeholder: 'Select option', col: 6,
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    }
  ];

  // Save user (add or update)
  saveUser(data: Pick<User, 'name' | 'status'> & Partial<User>) {
  if (this.editId) {
    this.usersService.update(this.editId, data);
  } else {
    this.usersService.add(data);
  }
  this.router.navigate(['/users']);
}

}
