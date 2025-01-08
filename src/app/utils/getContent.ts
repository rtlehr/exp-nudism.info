import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GetContent
{
    currentUrl: string;
    
    urlItems: any[] = [];

    headerMenuItems: any[] = [];

    constructor(private http: HttpClient, currentUrl: string) {

      this.currentUrl = currentUrl;
        
      this.urlItems = this.currentUrl.split('/');

      if(this.currentUrl != "")
      {

        this.http.get<any[]>('assets/menus/header-menu.json').subscribe(
            (response) => {
      
              this.headerMenuItems = response;
            
              //Search for first URL item
              for(let i = 0; i < this.headerMenuItems.length; i++)
              {

                if(this.headerMenuItems[i].url == this.urlItems[1])
                {
                    
                    this.findURLItems(this.headerMenuItems[i]);

                    break;

                }
            }
                  
            },
            (error) => {
              console.error('Error fetching JSON file:', error); 
            }
      
          );
        

      }

    }
    
    findURLItems(item: any)
    {

        console.log("item: " + item.url);

        if(item.subMenu)
        {
            console.log("item has submenu");

            for(let i = 0; i < item.subMenu.length; i++)
            {
                console.log("item.subMenu[i].url: " + item.subMenu[i].url);

                if(item.subMenu[i].url == this.urlItems[2])
                {
                    console.log("found item.subMenu[i].url: " + item.subMenu[i].file);

                    let data: any = {'file':item.subMenu[i].file, 'component': item.subMenu[i].component};

                    return data;

                }
            }
        }

        return item.file;
        
    }

  }
  