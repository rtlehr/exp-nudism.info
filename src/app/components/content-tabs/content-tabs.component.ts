import { Component } from '@angular/core';
import { Input, SimpleChanges  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainContentComponent } from '../main-content/main-content.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { NewsComponent } from '../news/news.component';
import { FaqComponent } from '../faq/faq.component';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';

@Component({
  selector: 'app-content-tabs', 
  standalone: true,
  imports: [MainContentComponent,
    ImageGalleryComponent,
    ImageDisplayComponent,
    ImageSliderComponent,
    NewsComponent,
    FaqComponent,
    FormGeneratorComponent

  ],
  templateUrl: './content-tabs.component.html',
  styleUrl: './content-tabs.component.css'
})
export class ContentTabsComponent { 

  pageContent: any [] = [];

  tabsData: any[] = [];

  activeTabIndex: number = 0;

  constructor(private http: HttpClient) { }

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadTabsData(changes['fileToLoad'].currentValue);
      } 

    } 

  }

  loadTabsData(contentToLoad: String)
  {
    
    this.http.get<any[]>('assets/' + contentToLoad).subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.tabsData = response;
      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

}
