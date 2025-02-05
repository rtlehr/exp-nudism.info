import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

interface ImageData {
  imageUrl: string;
  textBoxes: { text: string }[];
}

@Component({
  selector: 'app-info-highlite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-highlite.component.html',
  styleUrl: './info-highlite.component.scss'
})
export class InfoHighliteComponent implements OnInit, OnDestroy{

  images: ImageData[] = [];
  currentIndex = 0;
  autoScroll = true;
  autoScrollSub: Subscription | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ImageData[]>('assets/content/info-highlite.json').subscribe((data) => {
      this.images = data;
      if (this.autoScroll) {
        this.startAutoScroll();
      }
    });
  }

  changeImage(index: number): void {
    this.currentIndex = index;
    this.resetAutoScroll();
  }

  startAutoScroll(): void {
    this.autoScrollSub = interval(5000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    });
  }

  resetAutoScroll(): void {
    if (this.autoScrollSub) {
      this.autoScrollSub.unsubscribe();
      this.startAutoScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.autoScrollSub) {
      this.autoScrollSub.unsubscribe();
    }
  }

}
