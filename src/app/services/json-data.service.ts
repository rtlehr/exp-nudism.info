import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available app-wide
})
export class JsonDataService {
  private jsonData = new BehaviorSubject<any | null>(null); // Holds the loaded JSON data
  jsonData$ = this.jsonData.asObservable(); // Exposes the data as an observable

  constructor(private http: HttpClient) {}

  /**
   * Loads a JSON file from the given URL and stores it.
   * @param url The URL to load the JSON file from.
   */
  loadJson(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (data) => {
          console.log('Fetched JSON data:', data);
          this.jsonData.next(data);
          resolve(data); // Resolve the promise with the loaded data
        },
        error: (err) => {
          console.error('Error loading JSON file:', err);
          this.jsonData.next(null);
          reject(err); // Reject the promise with the error
        },
      });
    });
  }
  
}
