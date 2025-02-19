import { Component, ViewChild } from '@angular/core';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet } from '@angular/router';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderMenuComponent,
    DisplayLogoComponent,
    DisplayContactInfoComponent,
    RouterOutlet,
  ModalWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent { 
  
  @ViewChild(ModalWindowComponent) modal!: ModalWindowComponent;

  openMyModal() {
    this.modal.openModal();
  }

  constructor() {}

  config: any;

  ngOnInit() {}

}