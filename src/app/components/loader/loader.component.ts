import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared-service/shared.service';

@Component({
  selector: 'app-loader',
  template: '', // No HTML file needed
})
export class LoaderComponent {
  constructor(private http: HttpClient, private sharedService: SharedService) {}


  // Method to load the JSON file on click
  loadJson(fileName: any): void {
    this.http.get<any[]>(`assets/JSON/${fileName.file}`).subscribe(
      (response) => {
        this.sharedService.emitEvent(response); // Send data to the service
        console.log('JSON loaded successfully:', response);
      },
      (error) => {
        console.error('Error loading JSON file:', error);
      }
    );
  }
}
