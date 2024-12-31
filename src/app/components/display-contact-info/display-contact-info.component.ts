import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ConInfoPhysical {
  name: string;
  text: string;
  icon: string;
}

interface ConInfoSocial {
  name: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-display-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './display-contact-info.component.html',
  styleUrls: ['./display-contact-info.component.css'], // Fixed typo
})
export class DisplayContactInfoComponent implements OnInit {

  @Input() socialOnly: boolean = false;

  conInfoPhysical: ConInfoPhysical[] = [];
  conInfoSocial: ConInfoSocial[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ physical: ConInfoPhysical[]; social: ConInfoSocial[] }>(
      'assets/JSON/contact-information.json'
    ).subscribe(
      (response) => {
        // Assign the fetched JSON data to respective properties
        this.conInfoPhysical = response.physical;
        this.conInfoSocial = response.social;
      },
      (error) => {
        // Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );
  }

  get getConInfoPhysical() {
    return this.conInfoPhysical;
  }

  get getConInfoSocial() {
    return this.conInfoSocial;
  }
}
