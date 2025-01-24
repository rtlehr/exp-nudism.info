import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  headerMenuItems: any[] = [];

  config: any;

  menuItems: any[] = [];

  constructor(private http: HttpClient, private router: Router) {} 

  @Output() parentEvent = new EventEmitter<string>();

  ngOnInit(): void {

    const routes = this.router.config; 

    this.menuItems = this.extractMenuItems(routes);

  }

  private extractMenuItems(routes: any[]): any[] {

    return routes
      .filter((route) => route.data?.menu) // Include only routes with `menu: true`
      .map((route) => ({
        title: route.title,
        path: route.path,
        children: route.children ? this.extractMenuItems(route.children) : null,
      }));

  }

  get getHeaderMenuItems() {
   
    return this.menuItems;
  }

}


