import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { JsonDataService } from '../../../services/json-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-loader.component.html',
  styleUrl: './json-loader.component.scss'
})
export class JsonLoaderComponent {

  jsonData: any | null = null; // Stores the loaded JSON data

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit() {
    const url = '/assets/content/pages/cms-information/component-samples/blog-post/blog-post.json'; // URL of the JSON file
    this.jsonDataService.loadJson(url).then((data) => {
      console.log('Component received JSON data:', data); // Debug log
      this.jsonData = data;
    }).catch((err) => {
      console.error('Failed to load JSON data:', err);
    });
  }
  

}
