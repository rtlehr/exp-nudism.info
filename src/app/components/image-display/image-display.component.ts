import { CommonModule} from '@angular/common';
import { Component, Input, SimpleChanges  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.css'
})
export class ImageDisplayComponent {

  images: any[] = [];

  constructor(private http: HttpClient) {}

  @Input() fileToLoad: String = '';

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
    
    this.http.get<any[]>('assets/' + contentToLoad).subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.images = response;
      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

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
