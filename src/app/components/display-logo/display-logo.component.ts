import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

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

  @Output() parentEvent = new EventEmitter<string>();

  headerMenuItems: any[] = [];

  config: any;

  constructor(private http: HttpClient, private location: Location, private configService: ConfigService) {} 

  ngOnInit(): void {

    this.config = this.configService.getConfig();
    
  }

  goHome(event: Event)
  {

    this.http.get<any[]>('assets/' + this.config.headerMenuPath).subscribe(
      
      (response) => {

        this.headerMenuItems = response;
        
        this.location.replaceState(this.headerMenuItems[0]?.url || "");

        this.parentEvent.emit();

      },
      (error) => {
        console.error('Error fetching JSON file:', error); 
      });
    }


}
