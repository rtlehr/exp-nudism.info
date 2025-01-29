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
import { Router, RouterModule, RouterOutlet } from '@angular/router';

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
            ContentTabsComponent,
            RouterModule, 
            RouterOutlet],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  providers: [BlogService],
})
export class BlogDetailsComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private sharedDataService: SharedDataService,
    private location: Location
  ) {}

  blogPost: BlogPost | null = null;

  blogAllPost: BlogPost[] = [];

  blogPostsUrl: string = ''; 

  error: string | null = null;

  pageContent: pageContent [] = [];
  
  blogURL: String = "";

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      const blogUrl = params.get('url'); // Extract blog URL from the route parameters

      if (blogUrl) {

          const currurl = this.location.path();

          const cleanedURL = currurl.split("/").slice(0, -1).join("/");

          this.blogURL = cleanedURL;

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

          this.blogService.getAllPosts(this.blogPostsUrl).subscribe({
            next: (posts) => (this.blogAllPost = posts),
            error: (err) => (this.error = 'Failed to load blog posts: ' + err.message),
          });


      } else {
        this.error = 'Invalid blog URL';
      }
    });


  }

  get getAllBlogPosts() {

    return this.blogAllPost;

  }

}
