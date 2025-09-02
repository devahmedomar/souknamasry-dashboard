import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableFormComponent } from '../../shared/components/reusable-form/reusable-form.component';
import { UsersService } from '../../shared/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule , ReusableFormComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  editId: number | null = null;
  initialData: any = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editId = +id;
        this.initialData = this.usersService.getById(this.editId);
      }
    });
  }

  userFields = [
    { type: 'text', label: 'Name', name: 'name', placeholder: 'Enter full name', col: 6, required: true },
    { type: 'text', label: 'Phone', name: 'phone', placeholder: 'Enter phone number', col: 6 },
    { type: 'text', label: 'Email', name: 'email', placeholder: 'Enter email address', col: 6 },
    { type: 'dropdown', label: 'Status', name: 'status', placeholder: 'Select status', col: 6, options: [
        {label:'Active', value:'active'}, {label:'Inactive', value:'inactive'} ] },
    { type: 'dropdown', label: 'Order Requested?', name: 'hasOrder', placeholder: 'Select option', col: 6, options: [
        {label:'Yes', value:true}, {label:'No', value:false} ] }
  ];

  saveUser(data: any) {
    if (this.editId) {
      this.usersService.update(this.editId, data);   // ✅ تعديل
    } else {
      this.usersService.add(data);                   // ✅ إضافة
    }
    this.router.navigate(['/users']);
  }
}