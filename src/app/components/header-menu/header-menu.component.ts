import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  @Input() menuFile: string = "";

  headerMenuItems: any[] = [];

  currentUrl: string = '';

  urlItems: string[] = [];

  config: any;

  menuItems: any[] = [];

  constructor(private http: HttpClient, private location: Location, private configService: ConfigService, private router: Router) {} 

  @Output() parentEvent = new EventEmitter<string>();

  ngOnInit(): void {

    const routes = this.router.config; 
    this.menuItems = this.extractMenuItems(routes);
    console.log(' this.menuItems[1].children: ' + this.menuItems[1].children[0].title); 

    /*
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
      
    );*/

  }

  private extractMenuItems(routes: any[]): any[] {

    console.log('extractMenuItems: ' + routes[0].title);

    return routes
      .filter((route) => route.data?.menu) // Include only routes with `menu: true`
      .map((route) => ({
        title: route.title,
        path: route.path,
        children: route.children ? this.extractMenuItems(route.children) : null,
      }));
  }

  get getHeaderMenuItems() {
   
    return this.menuItems;
  }

  fileToLoad(event: Event, type: string, headerData: any, submenuData: any = '') {
/*
    let urlString = headerData.url;

    if(type == "subMenu")
    {
      urlString += "/" + submenuData.url;
    }

    event.preventDefault();

    this.location.replaceState(urlString);

    this.parentEvent.emit();
*/
  }

  // Add trackById method to avoid the error
 /* trackById(index: number, item: any): string {
    return item.id; // Track by unique `id` field
  }*/
}


