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

    console.log("headerMenu: ");


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

    if(this.location.path() == ""){

      this.http.get<any[]>('assets/' + this.menuFile).subscribe(
        (response) => {

          this.headerMenuItems = response;

          let data: any = {'file':this.headerMenuItems[0].url};

          this.location.replaceState(this.headerMenuItems[0].url);

          this.parentEvent.emit(this.headerMenuItems[0].url);

        },
        (error) => {
          console.error('Error fetching JSON file:', error); 
        }

      );
    
    }
    else
    {

      let u = this.location.path().slice(1).split('/');

      this.parentEvent.emit(u[0] + "/" + u[1]);

    }

  }

  get getHeaderMenuItems() {
   
    return this.headerMenuItems;
  }

  fileToLoad(event: Event, type: string, headerData: any, submenuData: any = '') {

    let urlString = headerData.url;

    console.log("Header Menu fileToLoad: " + headerData.url);

    if(type == "subMenu")
    {
      urlString += "/" + submenuData.url;
    }

    event.preventDefault();

    this.location.replaceState(urlString);

    //this.parentEvent.emit(data);

    this.parentEvent.emit(urlString);

  }

  // Add trackById method to avoid the error
  trackById(index: number, item: any): string {
    return item.id; // Track by unique `id` field
  }
}
