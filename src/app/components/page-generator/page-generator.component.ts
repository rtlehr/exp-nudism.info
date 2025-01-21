import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";
import { NewsComponent } from '../news/news.component';
import { FaqComponent } from '../faq/faq.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ContentTabsComponent } from '../content-tabs/content-tabs.component';
import { BlogListComponent } from '../blog/blog-list/blog-list.component'; 
import { ActivatedRoute } from '@angular/router';

interface pageContent {
  contentType: string;
  contentFile: string;
  divId: string;
}

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
    ContentTabsComponent,
    BlogListComponent],
  templateUrl: './page-generator.component.html',
  styleUrl: './page-generator.component.css'
})
export class PageGeneratorComponent {

  
  //@Input() pageContent: any[] = [];

  @Input() divId: String = "";
  
  pageContent: pageContent [] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit()
  {
      console.log("ngOnInit()");

      this.pageContent = this.route.snapshot.data['pageContent']; 

      console.log("pageContent: " + this.pageContent.length);

      this.divId = "testdiv";
    
  }
  
  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['pageContent']) {
      
      console.log("pgeContent: " + changes['pageContent'].currentValue);

      this.pageContent = changes['pageContent'].currentValue;

    }

  }

  get getPageContent() {

    return this.pageContent;

  }

}



