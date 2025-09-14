import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Interface to define each form field structure
export interface FormField {
  name: string;                                // form control name
  type: string;                                // field type: text, textarea, dropdown, etc.
  label?: string;                              // field label
  placeholder?: string;                        // placeholder text
  options?: { label: string; value: any }[];   // options for dropdown
  required?: boolean;                          // mark field as required
  validators?: any[];                          // custom validators
  col?: number;                                // column size (Bootstrap grid)
  [key: string]: any;                          // allow extra properties if needed
}

@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputTextareaModule
  ],
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.css']
})
export class ReusableFormComponent<T = any> implements OnInit, OnChanges {
  // Title displayed at the top of the form
  @Input() formTitle: string = 'Add Item';

  // List of fields to render dynamically
  @Input() fields: FormField[] = [];

  // Initial data (used for editing an existing item)
  @Input() initialData: Partial<T> | null = null;

  // Emit form values when form is submitted
  @Output() formSubmit = new EventEmitter<T>();

  // Reactive form group
  formGroup: FormGroup = new FormGroup({});

  // Build the form when the component initializes
  ngOnInit() {
    this.buildForm();
  }

  // Handle changes to inputs (fields or initial data)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] && this.fields?.length) {
      this.buildForm();
    }
    if (changes['initialData'] && this.formGroup) {
      // Patch existing values into form (useful for edit mode)
      this.formGroup.patchValue(this.initialData || {});
    }
  }

  // Dynamically build the form controls based on fields config
  private buildForm() {
    const group: Record<string, FormControl> = {};
    this.fields.forEach(field => {
      group[field.name] = new FormControl(
        this.initialData ? (this.initialData as any)[field.name] : '', // set initial value if exists
        field.validators || (field.required ? [Validators.required] : []) // add validators
      );
    });
    this.formGroup = new FormGroup(group);
  }

  // Submit form and emit values if form is valid
  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value as T); // cast to generic type T
    } else {
      this.formGroup.markAllAsTouched(); // mark all controls to show validation errors
    }
  }

  // Reset form to initial values (useful for cancel action)
  onCancel() {
    this.formGroup.reset(this.initialData || {});
  }
}
