import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  
  news: any[] = [];

  constructor(private http: HttpClient) {}

  @Input() fileToLoad: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadnews(changes['fileToLoad'].currentValue);
      } 

    }

  }

  loadnews(contentToLoad: String)
  {

    console.log("contentToLoad: " + contentToLoad);
    
    this.http.get<any[]>('assets/' + contentToLoad).subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.news = response;
      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }

  get getNews() {
    return this.news;
  }

}
