import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

/** Interface for dynamic form fields */
export interface FormField {
  name: string;                                     // form control name
  type: string;                                     // input type (text, textarea, dropdown, etc.)
  label?: string;                                   // field label
  placeholder?: string;                             // input placeholder
  options?: { label: string; value: any }[];        // dropdown options
  required?: boolean;                               // if true → field is required
  col?: number;                                     // bootstrap column size (default 12)
  [key: string]: any;                               // allow extra props (to avoid errors)
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
export class ReusableFormComponent implements OnInit, OnChanges {
  /** Form title shown at the top */
  @Input() formTitle: string = 'Add Item';
  
  /** Dynamic fields configuration */
  @Input() fields: FormField[] = [];

  /** Initial data for editing mode */
  @Input() initialData: any = null;

  /** Emits form values when submitted */
  @Output() formSubmit = new EventEmitter<any>();

  /** Main reactive form group */
  formGroup: FormGroup = new FormGroup({});

  /** Lifecycle hook - build form on init */
  ngOnInit() {
    this.buildForm();
  }

  /** Lifecycle hook - update form values when initialData changes */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.formGroup) {
      this.formGroup.patchValue(this.initialData || {});
    }
  }

  /** Build form dynamically based on fields input */
  private buildForm() {
    let group: any = {};
    this.fields.forEach(field => {
      group[field.name] = new FormControl(
        this.initialData ? this.initialData[field.name] : '', // set initial value if provided
        field.required ? Validators.required : null           // add required validation if needed
      );
    });
    this.formGroup = new FormGroup(group);
  }

  /** Handle form submit */
  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value); // emit form data to parent
    }
  }

  /** Handle cancel - reset form */
  onCancel() {
    this.formGroup.reset();
  }
}
