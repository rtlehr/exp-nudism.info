import { Component, Input, EventEmitter, Output} from '@angular/core';
import { Location } from '@angular/common';

interface MenuItems
{
  id: string;
  title: string;
  file: string;
}

@Component({ 
  selector: 'app-side-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './side-menu-item.component.html', 
  styleUrl: './side-menu-item.component.css'
})
export class sideMenuItemComponent {

  constructor(private location: Location) {}

  @Input({required: true}) menuItems!: MenuItems;

  @Output() sendToAppComponent = new EventEmitter();

  getMenuItemClicked()
  {

    this.location.replaceState('');

    this.sendToAppComponent.emit( this.menuItems );

  }

}
