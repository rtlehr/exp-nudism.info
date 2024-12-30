import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-logo',
  standalone: true,
  imports: [],
  templateUrl: './display-logo.component.html',
  styleUrl: './display-logo.component.css'
})
export class DisplayLogoComponent {

  @Input() src: string = '' 
  @Input() width: string = ''
  @Input() height: string = ''

}
