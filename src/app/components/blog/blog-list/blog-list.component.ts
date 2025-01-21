// blog-list.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

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

  currentURL: string = '';

  @Input() fileToLoad = '';

  @Output() sideMenuFileToLoad = new EventEmitter();

  constructor(private blogService: BlogService, private location: Location) {} 

  ngOnInit(): void {

    console.log('this.fileToLoad: ' + this.fileToLoad);

    this.blogService.getAllPosts(this.fileToLoad).subscribe({
      next: (posts) => (this.blogPosts = posts),
      error: (err) => (this.error = 'Failed to load blog posts: ' + err.message),
    });
  }

  loadBlog(data: any)
  {

    this.currentURL = this.location.path();

    this.location.replaceState(this.currentURL + "/" + data);

    this.sideMenuFileToLoad.emit();
    
  }

}
