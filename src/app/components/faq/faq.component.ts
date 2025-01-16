import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  faqs: any[] = [];

  constructor(private http: HttpClient) {}

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadfaqs(changes['fileToLoad'].currentValue);
      } 

    }

  }

  loadfaqs(contentToLoad: String)
  {

    console.log("contentToLoad: " + contentToLoad);
    
    this.http.get<any[]>('assets/' + contentToLoad).subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.faqs = response;
      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }

  get getFaqs() {
    return this.faqs;
  }

  scrollToAnswer(index: number): void {
    const element = document.getElementById(`answer-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    const topElement = document.getElementById('faq-questions');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
 