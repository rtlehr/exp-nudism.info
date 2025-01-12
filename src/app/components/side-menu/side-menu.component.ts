import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core'; // Import Component decorator from Angular core
import { sideMenuItemComponent } from '../side-menu-item/side-menu-item.component'; // Import a custom component used in this component
import { HttpClient } from '@angular/common/http'; // Import HttpClient to handle HTTP requests
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu', // The HTML tag to use this component
  standalone: true, // Marks this component as a standalone component
  imports: [sideMenuItemComponent], // Imports other standalone components or directives used in the template
  templateUrl: './side-menu.component.html', // Path to the HTML template for this component
  styleUrl: './side-menu.component.css', // Path to the CSS file for this component
})
export class sideMenuComponent {

  menuItems: any[] = []

  currentURL: string = '';

  currentURLArray: string[] = [];

  constructor(private http: HttpClient, private location: Location, private router: Router) {}
 
  @Input() sideMenuToLoad: String = '';

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['sideMenuToLoad']) {

      if(changes['sideMenuToLoad'].currentValue != "")
      {
       
        this.currentURL = this.location.path();

        this.currentURLArray = this.currentURL.slice(1).split("/");

        this.currentURL = this.currentURLArray[0] + "/" + this.currentURLArray[1];

        console.log("currentURL: " + this.location.path());

        this.getSideMenu(changes['sideMenuToLoad'].currentValue);

      }

    }

  }

  ngOnInit(): void {
    
  }

  getSideMenu(sideMenuToLoad: String)
  {

    this.http.get<any[]>('' + sideMenuToLoad).subscribe(
      (response) => {
        
        this.menuItems = response;

      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded
        console.error('Error fetching JSON file:', error);
      }
    );

  }

  get getMenuItems() {
    return this.menuItems;
  }

  @Output() sideMenuFileToLoad = new EventEmitter();

  sendToAppComponent(data: any)
  {

    this.location.replaceState(this.currentURL + "/" + data.url);

    this.sideMenuFileToLoad.emit( data );

  }

}
