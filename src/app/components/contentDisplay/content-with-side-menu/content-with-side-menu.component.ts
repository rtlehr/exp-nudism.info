import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { pageContent } from '../../../models/page-content.model';

@Component({
  selector: 'app-content-with-side-menu',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './content-with-side-menu.component.html',
  styleUrl: './content-with-side-menu.component.scss'
})
export class ContentWithSideMenuComponent { 

  pageContent: pageContent [] = [];
 
  divId: String = "";

  parentPath: string = "";

  childrenPaths: any[] = [];

  childrenTitle: string[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit()
  {
      const parentRoute = this.activatedRoute;

      if (parentRoute && parentRoute.routeConfig) {

        this.parentPath = parentRoute.routeConfig?.path || "";

        // Safely access children of the parent route
        const parentRouteChildren = parentRoute.routeConfig?.children || [];

        parentRouteChildren.forEach((child) => {

          this.childrenPaths.push({
            title: child.title,
            path: child.path
          });

        });
      }
      
      this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 

      this.divId = "testdiv";
    
  }

}
