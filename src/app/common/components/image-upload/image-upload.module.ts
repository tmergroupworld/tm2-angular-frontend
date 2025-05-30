import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageUploadComponent } from './image-upload.component'; // Standalone component
import { ImageUploadService } from './image-upload.service';

@NgModule({
  imports: [
    CommonModule,
    ImageUploadComponent, // Import the standalone component here
    HttpClientModule,
    ImageCropperModule,
  ],
  providers: [ImageUploadService],
  exports: [
    ImageUploadComponent, // Export the standalone component
  ],
})
export class ImageUploadModule {}
 
