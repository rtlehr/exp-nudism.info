// blog-list.component.ts

import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  providers: [BlogService],
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  error: string | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    const blogPostsUrl = './assets/content/blog/blog-posts.json'; // Adjust path as needed

    this.blogService.getAllPosts(blogPostsUrl).subscribe({
      next: (posts) => (this.blogPosts = posts),
      error: (err) => (this.error = 'Failed to load blog posts: ' + err.message),
    });
  }
}
