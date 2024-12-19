import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sideMenuComponent } from "./components/side-menu/side-menu.component";
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [sideMenuComponent, 
            HeaderMenuComponent, 
            PageGeneratorComponent,
            ImageSliderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent { 

  constructor(private http: HttpClient) {} 

  htmlContent!: any;

  showSideBar: boolean = true;
  
  sideMenuToLoad: String = '';

  defaultPage: any [] = [];
  
  pageContent: any [] = [];

  ngOnInit() {
    
    
    this.http.get<any[]>('assets/JSON/header-menu.json').subscribe(
    
      (response) => {
        // Success callback: Assign the fetched JSON data to the `menuItems` property
        this.defaultPage = response;

        this.loadContent({'file':this.defaultPage[0].file, 'component': this.defaultPage[0].component}); 

      },
      (error) => {
        // Error callback: Log an error message if the JSON file cannot be loaded 
        console.error('Error fetching JSON file:', error);
      }
    
    );

  }
  
  sideMenuFileToLoad(fileObjectToLoad: any)
  {

    this.pageContent = fileObjectToLoad.content;

  }

  loadContent(fileObjectToLoad: any) { 

    this.http.get(`assets/JSON/${fileObjectToLoad.file}`).subscribe({

    next: (response) => {
      
      this.htmlContent = response;

      this.showSideBar = true;

      if(this.htmlContent.length == 1)
      {
        this.showSideBar = false;
      }

      //Side menu to load
      this.sideMenuToLoad = fileObjectToLoad.file;

      this.pageContent = this.htmlContent[0].content;

    },
    error: (err) => {

      this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';

    }

  });
  }

}