import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../modal-service/modal.service';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css' 
})

export class ImageGalleryComponent {

  images: any[] = [];

  constructor(private http: HttpClient, private modalService: ModalService) {} 

  @Input() fileToLoad: String = '';

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

    this.http.get<any[]>('assets/JSON/' + contentToLoad).subscribe(
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

  openModalFromLink(event: Event) {
    event.preventDefault(); // Prevent link default behavior
    this.modalService.open('Link Triggered', 'This modal was opened from a link.');
  }

}
