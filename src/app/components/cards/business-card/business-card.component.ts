import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../../services/json-data.service';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-card.component.html',
  styleUrl: './business-card.component.scss'
})
export class BusinessCardComponent { 

  constructor(private jsonDataService: JsonDataService) {}

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  people: any[] = [];

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadPeople(changes['fileToLoad'].currentValue);
      } 

    }

  }

  loadPeople(contentToLoad: String)
  {

      this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      
      const data = this.jsonDataService.getData();

      this.people = data.people;

    });

  }

  get getPeople() {

    return this.people;

  }

}
