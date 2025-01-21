import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface pageContent {
  contentType: string;
  contentFile: string;
}

@Component({
  selector: 'app-routetesttwo',
  standalone: true,
  imports: [],
  templateUrl: './routetesttwo.component.html',
  styleUrl: './routetesttwo.component.scss'
})
export class RoutetesttwoComponent  implements OnInit{ 

  pageContent: pageContent [] = [];
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      console.log("ngOnInit()");

      this.pageContent = this.route.snapshot.data['pageContent']; 

      console.log("pageContent: " + this.pageContent.length);

    }

}
