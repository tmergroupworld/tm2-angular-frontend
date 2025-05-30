import { Component, OnInit } from '@angular/core';
import { Tmer } from '../shared/tmer.model';
import { TmerService } from '../shared/tmer.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tmer-create',
  templateUrl: './tmer-create.component.html',
  styleUrls: ['./tmer-create.component.css'],
})
export class TmerCreateComponent implements OnInit {
  newTmer: Tmer;
  tmerCategories = Tmer.CATEGORIES;
  errors: string[] = [];
  isSubmitting = false;

  constructor(
    private tmerService: TmerService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.newTmer = new Tmer();
    this.newTmer.shared = false;
  }

  handleImageUpload(imageUrl: string) {
    this.newTmer.image = imageUrl;
    this.errors = this.errors.filter(
      (e) => e !== 'Please upload an image first'
    );
    this.toastr.success('Image uploaded successfully!', 'Success');
  }

  handleImageError() {
    this.newTmer.image = '';
    this.toastr.error('Failed to upload image', 'Error');
  }

  createTmer() {
    if (!this.newTmer.image) {
      this.errors = ['Please upload an image first'];
      this.toastr.warning('Please upload an image first', 'Warning');
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errors = [];

    this.tmerService.createTmer(this.newTmer).subscribe({
      next: (tmer: Tmer) => {
        this.toastr.success('Tmer created successfully!', 'Success');
        this.router.navigate([`/tmers/${tmer._id}`]);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.isSubmitting = false;
        const errorMessage = errorResponse.error?.error
          ? errorResponse.error.error
          : this.translate.instant('TMER_CREATE.ERRORS.UNKNOWN');

        this.errors = [errorMessage];
        this.toastr.error(errorMessage, 'Error');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}

