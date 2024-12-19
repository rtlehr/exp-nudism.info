import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { HeaderMenuItemComponent } from '../header-menu-item/header-menu-item.component';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to handle HTTP requests
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [HeaderMenuItemComponent], 
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.css'
})
 
export class HeaderMenuComponent { 

  headerMenuItems: any[] = [];

  constructor(private http: HttpClient) {}

  //@ViewChild(LoaderComponent) loader!: LoaderComponent;

  @Output() parentEvent = new EventEmitter<string>();
  
  ngOnInit(): void {

    this.http.get<any[]>('assets/JSON/header-menu.json').subscribe(
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.headerMenuItems = response;
      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }

  get getHeaderMenuItems() {

    return this.headerMenuItems;

  }

  fileToLoad(data: any) 
  {

    this.parentEvent.emit(data);

  }

}
