import { Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { sideMenuComponent } from "./components/side-menu/side-menu.component";
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet} from '@angular/router';
import { GetContent } from './utils/getContent';

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

    let getContent = new GetContent(this.http, this.location);

  }

  @Input() menuFile: string = "";

  htmlContent!: any;

  showSideBar: boolean = true;
  
  sideMenuToLoad: String = '';

  defaultPage: any [] = [];
  
  pageContent: any [] = [];
  
  sideMenuFileToLoad(fileObjectToLoad: any)
  {
    
    this.pageContent = fileObjectToLoad.content;

  }

  pageURL: string = '';

  loadContent(fileObjectToLoad: any) { 

    this.pageURL = `assets/content/pages${fileObjectToLoad}/page.json`;

    this.http.get(this.pageURL).subscribe({

    next: (response) => {
      
      this.htmlContent = response;

      this.showSideBar = true;

      if(this.htmlContent.length == 1)
      {
        this.showSideBar = false;
      }

      //Side menu to load
      this.sideMenuToLoad = `assets/content/pages${fileObjectToLoad}/page.json`;

      
      this.pageContent = this.htmlContent[0].content;

    },
    error: (err) => {

      this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';

    }

  });
  }

}