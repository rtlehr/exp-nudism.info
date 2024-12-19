import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.css'
})
export class FormGeneratorComponent {

  form: any[] = [];

  constructor(private http: HttpClient) {}

  @Input() fileToLoad: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadform(changes['fileToLoad'].currentValue);
      } 

    } 

  }

  loadform(contentToLoad: String)
  {

    console.log("contentToLoad: " + contentToLoad);
    
    this.http.get<any[]>('assets/JSON/' + contentToLoad).subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.form = response;
      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }

  get getForm() {
    return this.form;
  }

  get getFormFields() {

    return this.form[0].fields;

  }

} 
