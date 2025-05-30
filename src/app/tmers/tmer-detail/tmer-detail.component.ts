import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tmer } from '../shared/tmer.model';
import { Review } from '../../review/share/review.model';
import { ReviewService } from '../../review/share/review.service';
import { TmerService } from '../shared/tmer.service';

import * as moment from 'moment';

@Component({
  selector: 'app-tmer-detail',
  templateUrl: './tmer-detail.component.html',
  styleUrls: ['./tmer-detail.component.scss'],
})
export class TmerDetailComponent implements OnInit {
  tmer?: Tmer; // Marked as optional
  reviews: Review[] = [];
  isLoadingReviews: boolean = false;
  reviewsError: string | null = null;
  averageRating: number = 0;
  reviewCount: number = 0;
  rating: number;

  constructor(
    private route: ActivatedRoute,
    private tmerService: TmerService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const tmerId = params['tmerId'];
      if (tmerId) {
        this.getTmer(tmerId);
        this.loadReviewsData(tmerId);
      }
    });
  }

  getTmer(tmerId: string) {
    this.tmerService.getTmerById(tmerId).subscribe({
      next: (tmer: Tmer) => {
        this.tmer = tmer;
        // Add a check to ensure _id exists
        if (tmer._id) {
          this.getReviews(tmer._id);
          this.getOverallRating(tmer._id);
        } else {
          console.error('Tmer ID is undefined');
        }
      },
      error: (err) => {
        console.error('Error loading tmer:', err);
      },
    });
  }

  getReviews(tmerId: string) {
    this.reviewService.getTmerReviews(tmerId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  formatDate(date?: string | Date): string {
    if (!date) return ''; // Handle undefined/null cases
    return `${moment(date).fromNow()}`;
  }

  loadReviewsData(tmerId: string) {
    //this.getTmerReviews(tmerId);
  }

  

  getOverallRating(tmerId: string) {
    this.reviewService.getOverallRating(tmerId).subscribe({
      next: (response: any) => {
        this.rating = response.ratingAvg || 0; // Extract just the rating value
        this.reviewCount = response.reviewCount || 0; // Also store review count if needed
      },
      error: (err) => {
        console.error('Error loading rating:', err);
        this.rating = 0; // Default value on error
      },
    });
  }

  // Add this method to safely handle the try again click
  handleTryAgain() {
    if (this.tmer && this.tmer._id) {
      //this.getTmerReviews(this.tmer._id);
    }
  }
}
