import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GetContent {
  currentUrl: string = "";
  pageToLoad: string = "";
  urlItems: string[] = [];
  headerMenuItems: any[] = [];
  menuFile: string = "menus/header-menu.json";
  htmlContent: any;
  showSideBar: boolean = true;
  sideMenuToLoad: string = "";
  pageContent: any[] = [];
  returnData: any[] = [];

  constructor(private http: HttpClient, private location: Location) {
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

    console.log("pageContent:", this.pageContent);
    console.log("sideMenuToLoad:", this.sideMenuToLoad);

    this.returnData = [this.pageContent, this.sideMenuToLoad];
  }
}
