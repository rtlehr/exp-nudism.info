import { Component, Input, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css' 
})

export class ImageGalleryComponent {

  images: any[] = [];

  constructor(private jsonDataService: JsonDataService) {} 

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadImages(changes['fileToLoad'].currentValue);
      } 

    }

  }

  loadImages(contentToLoad: String)
  {

    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.images = this.jsonDataService.getData();
    });

  }

  get getImages() {
    return this.images;
  }


}
