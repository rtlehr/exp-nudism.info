import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-content-blank-page',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './content-blank-page.component.html',
  styleUrl: './content-blank-page.component.scss'
})
export class ContentBlankPageComponent {

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private router: Router) {}


  ngOnInit()
  {
    
    const currentLocation = location.pathname;

    console.log("location: " + currentLocation);

    //this.router.navigate(["/cms-information/cms-components/news"]);

  }

}
