import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { SharedDataService } from '../../../services/shared-data.service';
import { PageGeneratorComponent } from '../../contentDisplay/page-generator/page-generator.component';
import { pageContent } from '../../../models/page-content.model';
import { MainContentComponent } from '../../main-content/main-content.component';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { NewsComponent } from '../../news/news.component';
import { FaqComponent } from '../../faq/faq.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { ContentTabsComponent } from '../../content-tabs/content-tabs.component';

@Component({
  selector: 'app-blog-details', 
  standalone: true,
  imports: [CommonModule,
            MainContentComponent,
            ImageDisplayComponent,
            ImageGalleryComponent,
            ImageSliderComponent,
            NewsComponent,
            FaqComponent,
            FormGeneratorComponent,
            ContentTabsComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  providers: [BlogService],
})
export class BlogDetailsComponent {
  blogPost: BlogPost | null = null;
  blogPostsUrl: string = ''; 
  error: string | null = null;

  pageContent: pageContent [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private sharedDataService: SharedDataService,
    private location: Location
  ) {}

  ngOnInit(): void {

    //this.pageContent = [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/imageGallery/imageGallery.html"},
   // {"contentType": "imageGallery", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/imageGallery/page-image-gallery-images.json"}];

    const currurl = this.location.path();

    const cleanedURL = currurl.split("/").slice(0, -1).join("/");

    this.blogPostsUrl = "assets/content/pages" + cleanedURL + "/blog-posts.json";

    // Retrieve the blog post ID from the route parameters
    const url = String(this.activatedRoute.snapshot.paramMap.get('url'));

    if (url) {
      this.blogService.getPostByURL(this.blogPostsUrl, url).subscribe(
        (post) => (this.blogPost = post),
        (error) => (this.error = 'Failed to load blog post')
      );
    } else {
      this.error = 'Invalid blog post ID';
    }
  }

  get getPageContent() {

    return this.pageContent;

  }

}
