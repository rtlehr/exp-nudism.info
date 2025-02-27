import { Component} from '@angular/core';
import { MainContentComponent } from '../../main-content/main-content.component';
import { ImageGalleryComponent } from "../../image-gallery/image-gallery.component";
import { NewsComponent } from '../../news/news.component';
import { FaqComponent } from '../../faq/faq.component';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { ContentTabsComponent } from '../../content-tabs/content-tabs.component';
import { BlogListComponent } from '../../blog/blog-list/blog-list.component'; 
import { pageContent } from '../../../models/page-content.model';
import { InfoHighlightComponent } from '../../cards/info-highlight/info-highlight.component';
import { BusinessCardComponent } from '../../cards/business-card/business-card.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    BlogListComponent,
    InfoHighlightComponent,
    BusinessCardComponent],
  templateUrl: './page-generator.component.html',
  styleUrl: './page-generator.component.scss'
})
export class PageGeneratorComponent {

  
  //@Input() pageContent: any[] = [];

  divId: String = "";
  
  pageContent: pageContent [] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit()
  {

      this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 

      const currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path || "";

      // Generate the dynamic div ID by concatenating "-div"
      this.divId = `${currentRoutePath}-div`;

      console.log('Dynamic Div ID:', this.divId); // Debugging log
    
  }

  get getPageContent() {

    return this.pageContent;

  }

}



