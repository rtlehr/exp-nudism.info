import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { JsonDataService } from '../../../services/json-data.service'; 

interface ImageData {
  imageUrl: string;
  title: string;
  textBoxes: { text: string }[];
  componentSize: number;
}

@Component({
  selector: 'app-info-highlite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-highlite.component.html',
  styleUrl: './info-highlite.component.scss'
})
export class InfoHighliteComponent implements OnInit, OnDestroy{

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  images: ImageData[] = [];
  currentIndex = 0;
  autoScroll = false;
  autoScrollSub: Subscription | null = null;

  imageSize: number = 150; // Default size, will be updated from JSON 

  constructor(private http: HttpClient, private jsonDataService: JsonDataService) {}

  ngOnInit(): void {

    this.jsonDataService.loadData('assets/' + this.fileToLoad).subscribe(() => {
      
      const data = this.jsonDataService.getData();

      this.images = data.images || [];

      this.imageSize = data.componentSize || 300;

      this.autoScroll = data.autoScroll;

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

  getFontSize(): number {
    return Math.min(this.imageSize / 400, 1);
  }
  

}
