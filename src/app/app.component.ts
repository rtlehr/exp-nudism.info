import { Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { sideMenuComponent } from "./components/side-menu/side-menu.component";
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { ConfigService } from './services/config.service';
import { JsonLoaderComponent } from "./components/test/json-loader/json-loader.component";
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [sideMenuComponent,
    HeaderMenuComponent,
    PageGeneratorComponent,
    DisplayLogoComponent,
    DisplayContactInfoComponent,
    JsonLoaderComponent,
    BlogListComponent],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent { 
  
  constructor(private http: HttpClient, 
              private location: Location, 
              private configService: ConfigService,
              ) {}

  currentUrl: string = '';
  htmlContent!: any;
  showSideBar: boolean = true;
  sideMenuToLoad: String = '';
  pageContent: any [] = [];
  pageToLoad: string = "";
  urlItems: string[] = [];
  menuFile: string = "menus/header-menu.json";
  divId: string = "";

  config: any;

  ngOnInit() {
        
    this.configService.loadConfig().subscribe({
      next: (data) => {
        this.config = data; // Assign the loaded config data
        console.log(this.config); // Log the config data to verify
      },
      error: (err) => {
        console.error('Failed to load config', err); 
      },
    });

    this.initializePageState();

  }

  sideMenuFileToLoad(event: any)
  {
        
    this.initializePageState();

  }

  loadContent(event: any) { 

    this.initializePageState();
   
  }

  private initializePageState(): void {

    this.currentUrl = this.location.path();

    this.urlItems = this.currentUrl.slice(1).split("/");

    if (this.urlItems.length > 2) {
      this.currentUrl = `/${this.urlItems[0]}/${this.urlItems[1]}`;
    }

    this.pageToLoad = `assets/content/pages${this.currentUrl.toLowerCase()}/page.json`;

    this.loadPageContent();

  }

  private loadPageContent(): void {

    this.http.get<any[]>(this.pageToLoad).subscribe({
      next: (response) => {
        this.htmlContent = response;
        this.updatePageDetails();
      },
      error: () => {
        this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';
        this.pageContent = [this.htmlContent];
      },
    });

  }

  private updatePageDetails(): void {

    if (!this.htmlContent || this.htmlContent.length === 0) return;

    //If the page only has one content item, display it without the sidebar
    if (this.htmlContent.length === 1) {
      this.pageContent = this.htmlContent[0].content;
      this.divId = this.htmlContent[0].divId;
      this.showSideBar = false;
    } 
    else 
    //If the page has more than one content item, display the sidebar
    {
      this.sideMenuToLoad = this.pageToLoad;
      this.showSideBar = true;

      if (this.urlItems.length < 3) {
        this.pageContent = this.htmlContent[0].content; 
        this.divId = this.htmlContent[0].divId;
        this.location.replaceState(this.currentUrl + "/" + this.htmlContent[0].url);
      } else {
        const matchingItem = this.htmlContent.find(
          (item: any) => item.url === this.urlItems[2]
        );

        if (matchingItem) {
          this.pageContent = matchingItem.content;
          this.divId = matchingItem.divId;
        } else {
          //this.pageContent = '<p>Content not found.</p>';
        }
      }
    }

  }

}