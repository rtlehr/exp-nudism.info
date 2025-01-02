import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent {

  @Input() fileToLoad: string = ''; // JSON configuration file path
  @Input() sliderWidth: string = '100%'; // Default width
  @Input() sliderHeight: string = '300px'; // Default height

  @Input() imagesCount: number = 0; 

  images: any[] = [];
  currentIndex: number = 0;
  slideInterval: number = 3000; // Default interval in ms

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadImages(changes['fileToLoad'].currentValue);
      } 

    }

  }

  constructor(private http: HttpClient) {}

  loadImages(contentToLoad: String)
  {

    this.http.get<any>('assets/' + contentToLoad).subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.images = response.images || [];

        this.imagesCount = this.images.length;

        this.sliderWidth = response.width || '100%';
        this.sliderHeight = response.height || '400px';
        this.slideInterval = response.slideInterval || 10000;

        this.startAutoSlide();

      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }

  startAutoSlide(): void {
   setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.imagesCount;
  }

  previousSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

}
