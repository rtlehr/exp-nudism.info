import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ConfigService } from '../../services/config.service';

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

  currentUrl: string = '';

  urlItems: string[] = [];

  config: any;

  constructor(private http: HttpClient, private location: Location, private configService: ConfigService) {} 

  @Output() parentEvent = new EventEmitter<string>();

  ngOnInit(): void {

    this.config = this.configService.getConfig();
    
    this.http.get<any[]>('assets/' + this.config.headerMenuPath).subscribe(
      
      (response) => {

        this.headerMenuItems = response;

        //let data: any = {'file':this.headerMenuItems[0].file, 'component': this.headerMenuItems[0].component};

        this.currentUrl = this.location.path();

        this.urlItems = this.currentUrl.slice(1).split("/");
    
        // Load the home page if no items in the URL
        if (!this.urlItems[0]) {
        
          this.location.replaceState(this.headerMenuItems[0]?.url || "");
              
        }

        this.parentEvent.emit();

      },
      (error) => {
        console.error('Error fetching JSON file:', error); 
      }

    );



  
  }

  get getHeaderMenuItems() {
   
    return this.headerMenuItems;
  }

  fileToLoad(event: Event, type: string, headerData: any, submenuData: any = '') {

    let urlString = headerData.url;

    if(type == "subMenu")
    {
      urlString += "/" + submenuData.url;
    }

    event.preventDefault();

    this.location.replaceState(urlString);

    this.parentEvent.emit();

  }

  // Add trackById method to avoid the error
  trackById(index: number, item: any): string {
    return item.id; // Track by unique `id` field
  }
}
