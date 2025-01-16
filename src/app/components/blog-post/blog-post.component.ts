import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {

  blogContent: any;

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 
  
      if (changes['fileToLoad']) {
  
        if(changes['fileToLoad'].currentValue != "")
        {
          this.loadBlog(changes['fileToLoad'].currentValue);
        } 
  
      }
  
    }

  constructor(private http: HttpClient) {}

  loadBlog(contentToLoad: String)
  {
    this.http.get('assets/content/pages/cms-information/component-samples/blog-post/blog-post.json').subscribe(
      (data) => {
        this.blogContent = data;
      },
      (error) => {
        console.error('Failed to load blog content:', error);
      }
    );
  }

}
