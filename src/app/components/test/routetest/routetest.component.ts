import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface pageContent {
  contentType: string;
  contentFile: string;
}

@Component({
  selector: 'app-routetest',
  standalone: true,
  imports: [],
  templateUrl: './routetest.component.html',
  styleUrl: './routetest.component.scss'
})
export class RoutetestComponent implements OnInit{ 

  pageContent: pageContent [] = [];
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      console.log("ngOnInit()");

      this.pageContent = this.route.snapshot.data['pageContent']; 

      console.log("pageContent: " + this.pageContent.length);

    }
}
