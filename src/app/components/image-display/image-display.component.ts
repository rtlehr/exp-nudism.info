import { CommonModule} from '@angular/common';
import { Component, Input, SimpleChanges  } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';


@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.css'
})
export class ImageDisplayComponent {

  images: any[] = [];

  constructor(private jsonDataService: JsonDataService) {}

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadimages(changes['fileToLoad'].currentValue);
      } 

    } 

  }

  loadimages(contentToLoad: String)
  {
    
    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.images = this.jsonDataService.getData();
    });

  }

  get getImages() {
    return this.images;
  }

  selectedImage: any = null;

  openModal(image: any): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }

}
