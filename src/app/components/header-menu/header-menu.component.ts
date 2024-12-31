import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {
  headerMenuItems: any[] = [];

  constructor(private http: HttpClient) {}

  @Output() parentEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.http.get<any[]>('assets/JSON/header-menu.json').subscribe(
      (response) => {
        this.headerMenuItems = response;
      },
      (error) => {
        console.error('Error fetching JSON file:', error);
      }
    );
  }

  get getHeaderMenuItems() {
    return this.headerMenuItems;
  }

  fileToLoad(data: any) {
    this.parentEvent.emit(data);
  }

  // Add trackById method to avoid the error
  trackById(index: number, item: any): string {
    return item.id; // Track by unique `id` field
  }
}
