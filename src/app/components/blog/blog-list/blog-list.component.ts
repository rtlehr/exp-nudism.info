import { Component, OnInit, Input, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';

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
export class BlogListComponent implements OnInit, AfterViewInit {

  constructor(private blogService: BlogService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private location: Location) {}

  @Input() fileToLoad = '';

  pageContent: pageContent[] = []; 
  blogPosts: BlogPost[] = [];
  error: string | null = null;
  isVisible: boolean = false;

  @ViewChildren('blogItem') blogDivs!: QueryList<ElementRef>;

  showFeaturedOnly: boolean = false; // Flag for toggling featured posts

  ngOnInit(): void {
    this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.blogService.getAllPosts(this.pageContent[0].contentFile).subscribe({
      next: (posts) => {
        this.blogPosts = posts;
      },
      error: (err) => {
        this.error = 'Failed to load blog posts: ' + err.message;
      },
    });
  }

  getFeaturedPosts(): void {
    this.blogService.getFeaturedPosts(this.pageContent[0].contentFile).subscribe({
      next: (posts) => {
        this.blogPosts = posts;
      },
      error: (err) => {
        this.error = 'Failed to load blog posts: ' + err.message;
      },
    });
  }

  toggleFeaturedPosts(): void {
    
    this.blogDivs.forEach((div) => {
      div.nativeElement.classList.remove('visible');
    });

    this.showFeaturedOnly = !this.showFeaturedOnly;
    if (this.showFeaturedOnly) {
      this.getFeaturedPosts(); // Show featured posts only
    } else {
      this.getAllPosts(); // Show all posts
    }
  }

  ngAfterViewInit(): void {
    this.blogDivs.changes.subscribe(() => {
      if (this.blogDivs.length === this.blogPosts.length) {
        this.onAllPostsRendered();
      }
    });
  }

  onAllPostsRendered(): void {
    this.blogDivs.forEach((div, index) => {
      setTimeout(() => {
        div.nativeElement.classList.add('visible');
      }, index * 100);
    });
  }

  navigateToDetails(url: string): void {
    const currurl = this.location.path();
    this.router.navigate([currurl, url]);
  }
}
