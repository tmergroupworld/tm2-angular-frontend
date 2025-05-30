import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from '../image-upload/image-upload.module';

import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditableSelectComponent } from './editable-select/editable-select.component';
import { EditableImageComponent } from './editable-image/editable-image.component'; // Add this component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditableImageComponent,
    ImageUploadModule,
  ],
  declarations: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectComponent,
    
  ],
  exports: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectComponent,
    EditableImageComponent, // Export it here
  ],
})
export class EditableModule {}
