import { Component, Input, Output, EventEmitter } from '@angular/core';

interface HeaderMenuItems
{
  id: string;
  title: string;
  file: string;
}

@Component({
  selector: 'app-header-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './header-menu-item.component.html',
  styleUrl: './header-menu-item.component.css',
})
export class HeaderMenuItemComponent {

  @Input({required: true}) headerMenuItems!: HeaderMenuItems;

  @Output() fileToLoad = new EventEmitter();

  //constructor(private headerMenuClickedEvent: SharedService) {}

  getHeaderMenuItemClicked()
  {

    this.fileToLoad.emit( this.headerMenuItems );

  }

}
