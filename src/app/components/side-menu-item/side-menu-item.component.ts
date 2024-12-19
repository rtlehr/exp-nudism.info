import { Component, Input, EventEmitter, Output} from '@angular/core';

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

  @Input({required: true}) menuItems!: MenuItems;

  @Output() sendToAppComponent = new EventEmitter();

  getMenuItemClicked()
  {

    this.sendToAppComponent.emit( this.menuItems );

  }

}
