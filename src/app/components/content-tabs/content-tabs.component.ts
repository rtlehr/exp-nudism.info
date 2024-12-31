import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-tabs.component.html',
  styleUrl: './content-tabs.component.css'
})
export class ContentTabsComponent { 

  tabsData: any[] = [];
  activeTabIndex: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTabsData();
  }

  loadTabsData(): void {
    this.http.get<any[]>('./assets/JSON/content-tabs.json').subscribe(data => {
      this.tabsData = data;
    });
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

}
