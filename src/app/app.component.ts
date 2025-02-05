import { Component} from '@angular/core';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet } from '@angular/router';
import { BusinessCardComponent } from './components/cards/business-card/business-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderMenuComponent,
    DisplayLogoComponent,
    DisplayContactInfoComponent,
    RouterOutlet, BusinessCardComponent],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent { 
  
  constructor() {}

  config: any;

  ngOnInit() {}

}