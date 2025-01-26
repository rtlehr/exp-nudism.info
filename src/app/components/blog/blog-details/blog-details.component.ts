import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  providers: [BlogService],
})
export class BlogDetailsComponent {
  blogPost: BlogPost | null = null;
  blogPostsUrl: string = ''; 
  error: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private sharedDataService: SharedDataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Retrieve the blogPostsUrl from route query parameters

    const pathElemets = this.location.path().split('/');

    this.blogPostsUrl = "assets/content/pages/" + pathElemets[1] + "/blog-posts.json";

    // Retrieve the blog post ID from the route parameters
    const url = String(this.activatedRoute.snapshot.paramMap.get('id'));

    if (url) {
      this.blogService.getPostByURL(this.blogPostsUrl, url).subscribe(
        (post) => (this.blogPost = post),
        (error) => (this.error = 'Failed to load blog post')
      );
    } else {
      this.error = 'Invalid blog post ID';
    }
  }
}
