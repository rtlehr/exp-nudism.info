import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonDataService } from '../../services/json-data.service';

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

  @Input() divId: String = '';

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

  constructor(private jsonDataService: JsonDataService) {} 

  loadImages(contentToLoad: String)
  {

    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {

      const data = this.jsonDataService.getData();

      this.images = data.images || [];

        this.imagesCount = this.images.length;

        this.sliderWidth = data.width || '100%';
        this.sliderHeight = data.height || '400px';
        this.slideInterval = data.slideInterval || 10000;

        this.startAutoSlide();
        
    });


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
