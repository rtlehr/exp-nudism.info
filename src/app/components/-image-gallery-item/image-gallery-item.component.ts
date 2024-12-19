import { Component, Input } from '@angular/core';

interface Images
{
  src: string,
  title: string,
  description: string,
  href: string
}

@Component({
  selector: 'app-image-gallery-item',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery-item.component.html',
  styleUrl: './image-gallery-item.component.css' 
})
export class ImageGalleryItemComponent {
   
  @Input({required: true}) images!: Images;

}
