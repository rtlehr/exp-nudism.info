import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  @Input() menuFile: string = "";

  headerMenuItems: any[] = [];

  constructor(private http: HttpClient, private location: Location) {}

  @Output() parentEvent = new EventEmitter<string>();

  ngOnInit(): void {

    this.http.get<any[]>('assets/' + this.menuFile).subscribe(
      (response) => {

        this.headerMenuItems = response;

        let data: any = {'file':this.headerMenuItems[0].file, 'component': this.headerMenuItems[0].component};

        this.parentEvent.emit(data);

      },
      (error) => {
        console.error('Error fetching JSON file:', error); 
      }

    );

  }

  get getHeaderMenuItems() {


    return this.headerMenuItems;
  }

  fileToLoad(event: Event, data: any) {

    event.preventDefault();

    this.location.replaceState('');

    this.parentEvent.emit(data);
  }

  // Add trackById method to avoid the error
  trackById(index: number, item: any): string {
    return item.id; // Track by unique `id` field
  }
}
