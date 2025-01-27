// blog-list.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { SharedDataService } from '../../../services/shared-data.service';

interface pageContent {
  contentType: string;
  contentFile: string;
  divId: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  providers: [BlogService],
})
export class BlogListComponent implements OnInit {

  @Input() fileToLoad = '';

  pageContent: pageContent [] = [];

  blogPosts: BlogPost[] = [];
  
  error: string | null = null;

  constructor(private blogService: BlogService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private sharedDataService: SharedDataService,
              private location: Location) {}

  ngOnInit(): void {
    this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 

    this.sharedDataService.set('blogPostsUrl', this.pageContent[0].contentFile);

    this.blogService.getAllPosts(this.pageContent[0].contentFile).subscribe({
      next: (posts) => (this.blogPosts = posts),
      error: (err) => (this.error = 'Failed to load blog posts: ' + err.message),
    });
  }

  navigateToDetails(url: string): void {

    //const pathElemets = this.location.path().split('/');

    const currurl = this.location.path();

    //const cleanedURL = currurl.split("/").slice(0, -1).join("/");

    //const blogPostsUrl = "assets/content/pages" + cleanedURL + "/blog-posts.json";

    this.router.navigate([currurl, url]);

  }

}
