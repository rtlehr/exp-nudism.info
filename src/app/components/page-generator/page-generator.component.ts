import { Component, Input, SimpleChanges } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";
import { NewsComponent } from '../news/news.component';
import { FaqComponent } from '../faq/faq.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ContentTabsComponent } from '../content-tabs/content-tabs.component';

@Component({
  selector: 'app-page-generator',
  standalone: true, 
  imports: [MainContentComponent,
    ImageGalleryComponent,
    NewsComponent,
    FaqComponent,
    ImageDisplayComponent,
    FormGeneratorComponent,
    ImageSliderComponent,
    ContentTabsComponent],
  templateUrl: './page-generator.component.html',
  styleUrl: './page-generator.component.css'
})
export class PageGeneratorComponent {

  
  @Input() pageContent: any[] = [];

  @Input() divId: String = "";
  
  ngOnChanges(changes: SimpleChanges): void { 

    
    if (changes['pageContent']) {
      
      this.pageContent = changes['pageContent'].currentValue;

    }

  }

  get getPageContent() {

    return this.pageContent;

  }

}



