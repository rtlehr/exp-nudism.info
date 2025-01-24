import { Component} from '@angular/core';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderMenuComponent,
    DisplayLogoComponent,
    DisplayContactInfoComponent,
    RouterOutlet],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent { 
  
  constructor() {}

  config: any;

  ngOnInit() {}

}