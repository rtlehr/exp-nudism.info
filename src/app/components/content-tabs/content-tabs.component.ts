import { Component } from '@angular/core';
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

  ngOnInit(): void {

    this.loadTabsData();  

  }

  get getPageContent() {

    //return this.pageContent;

    return [{"contentType": "contentPage", "contentFile": "pages/componentSamples/imageGallery.html"},{"contentType": "imageGallery", "contentFile": "page-image-gallery-images.json"}];

  }

  loadTabsData(): void {
    this.http.get<any[]>('./assets/JSON/content-tabs.json').subscribe(data => {

      this.tabsData = data;

      console.log("this.tabsData: " + this.tabsData.length)

    });
  }

  c:number = 0;

  get getTabContent() 
  {
    console.log("count: " + this.c);

    return this.tabsData[this.c].content;

    this.c++;

    
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

}
