import { Component, Input, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  faqs: any[] = [];

  constructor(private jsonDataService: JsonDataService) {}

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

    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.faqs = this.jsonDataService.getData();
    });

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
 