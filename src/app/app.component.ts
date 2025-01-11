import { Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { sideMenuComponent } from "./components/side-menu/side-menu.component";
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [sideMenuComponent, 
            HeaderMenuComponent, 
            PageGeneratorComponent,
            DisplayLogoComponent,
            DisplayContactInfoComponent,
            RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent { 
  
  constructor(private http: HttpClient, private location: Location) {}

  currentUrl: string = '';

  ngOnInit() {

    this.initialize();

  }

  htmlContent!: any;

  showSideBar: boolean = true;
  
  sideMenuToLoad: String = '';

  defaultPage: any [] = [];
  
  pageContent: any [] = [];

  pageToLoad: string = "";
  urlItems: string[] = [];
  headerMenuItems: any[] = [];
  menuFile: string = "menus/header-menu.json";
  returnData: any[] = [];

  
  sideMenuFileToLoad(fileObjectToLoad: any)
  {
    
    this.initialize();

  }

  pageURL: string = '';

  loadContent(fileObjectToLoad: any) { 

    this.initialize();
   
  }

  private initialize(): void {

    this.currentUrl = this.location.path();

    this.urlItems = this.currentUrl.slice(1).split("/");

    this.http.get<any[]>(`assets/${this.menuFile}`).subscribe({

      next: (response) => {
        this.headerMenuItems = response;
        this.getPage();
      },
      error: (err) => console.error('Error fetching JSON file:', err),
    });

  }

  private getPage(): void {

    // Load the home page if no items in the URL
    if (!this.urlItems[0]) {
      this.location.replaceState(this.headerMenuItems[0]?.url || "");
      this.urlItems = this.headerMenuItems[0]?.url?.slice(1).split("/") || [];
    }

    if (this.urlItems.length > 2) {
      this.currentUrl = `/${this.urlItems[0]}/${this.urlItems[1]}`;
    }

    this.pageToLoad = `assets/content/pages${this.currentUrl.toLowerCase()}/page.json`;

    this.http.get<any[]>(this.pageToLoad).subscribe({
      next: (response) => {
        this.htmlContent = response;
        this.setPageDetails();
      },
      error: () => {
        this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';
        this.pageContent = [this.htmlContent];
        this.returnData = [this.pageContent, ""];
      },
    });
  }

  private setPageDetails(): void {
    if (!this.htmlContent || this.htmlContent.length === 0) return;

    if (this.htmlContent.length === 1) {
      this.pageContent = this.htmlContent[0].content;
      this.showSideBar = false;
    } else {
      this.sideMenuToLoad = this.pageToLoad;
      this.showSideBar = true;

      if (this.urlItems.length < 3) {
        this.pageContent = this.htmlContent[0].content;
        this.location.replaceState(this.currentUrl + "/" + this.htmlContent[0].url);
      } else {
        const matchingItem = this.htmlContent.find(
          (item: any) => item.url === this.urlItems[2]
        );

        if (matchingItem) {
          this.pageContent = matchingItem.content;
        } else {
          //this.pageContent = '<p>Content not found.</p>';
        }
      }
    }

  }

}