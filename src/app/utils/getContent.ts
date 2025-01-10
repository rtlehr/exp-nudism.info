import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GetContent
{
    currentUrl: string = "";
    
    pageToLoad: string = "";

    urlItems: any[] = [];

    headerMenuItems: any[] = [];

    menuFile: string = "menus/header-menu.json";

    htmlContent: any;

    showSideBar: boolean = true;

    sideMenuToLoad: String = '';

    pageContent: any [] = [];

    returnData: any [] = [];
    
    constructor(private http: HttpClient, private location: Location) {

      this.currentUrl = this.location.path();

      this.urlItems = this.currentUrl.slice(1).split("/");

      this.http.get<any[]>('assets/' + this.menuFile).subscribe(
        (response) => {
  
          this.headerMenuItems = response;
  
          this.getPage();
  
          //this.parentEvent.emit(data);
  
        },
        (error) => {
          console.error('Error fetching JSON file:', error); 
        }


      )};

      getPage()
      {

        //If there are no items in the url, load the home page
        //The HOME PAGE is the first page in the Header Menu File
        if(this.urlItems[0] == "")
        {
          
          this.location.replaceState(this.headerMenuItems[0].url);

          //let data: any = {'file':this.headerMenuItems[0].file, 'component': this.headerMenuItems[0].component};

        }
        else
        {

        }
        
        if(this.urlItems.length > 2)
        {
          this.currentUrl = "/" + this.urlItems[0] + "/" + this.urlItems[1];
        }

        this.pageToLoad = `assets/content/pages${this.currentUrl.toLowerCase()}/page.json`;

        this.http.get(this.pageToLoad).subscribe({

          next: (response) => {
            
            this.htmlContent = response;

            this.setPageDetails()

            /*
            this.showSideBar = true;

            if(this.htmlContent.length == 1)
            {
              this.showSideBar = false;
            }

            //Side menu to load
            this.sideMenuToLoad = this.pageToLoad;

            this.pageContent = this.htmlContent[0].content;
            */

          },
          error: (err) => {

            this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';

          }

        });

        //These two are the same
        //this.pageURL
        //this.sideMenuToLoad

        //this.pageContent = this comes from the pageURL file



        //return this.currentUrl
      }

      setPageDetails()
      {

        if(this.htmlContent.length == 1)
        {

          this.pageContent = this.htmlContent[0].content;

        }
        else
        {
          this.sideMenuToLoad = this.pageToLoad;

          if(this.urlItems.length < 3)
          {
            this.pageContent = this.htmlContent[0].content;
          }
          else
          {

            for (const item of this.htmlContent) {

              if (item.url === this.urlItems[2]) {

                console.log("Found:", item.title);
                this.pageContent = item.content;
                break;
              }
            }



          }
        }

        console.log("pageContent: ", this.pageContent);
        console.log("sideMenuToLoad: ", this.sideMenuToLoad);

        this.returnData.push(this.pageContent);
        this.returnData.push(this.sideMenuToLoad);

        return this.returnData

        //this.parentEvent.emit(this.returnData);
        
      }
    
    }
  