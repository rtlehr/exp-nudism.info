import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalService } from '../modal-service/modal.service';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  
  @Input() content: string = '';
  
  @Input() fileToLoad: String = '';

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != '')
      {
        this.loadContent({'file':changes['fileToLoad'].currentValue});
      }

    }

  }

  htmlContent!: string;

  constructor(private http: HttpClient, private modalService: ModalService) {} 

  openModalFromButton() {
    this.modalService.open('Button Triggered', 'This modal was opened from a button.');
  }

  openModalFromLink(event: Event) {
    event.preventDefault(); // Prevent link default behavior
    this.modalService.open('Link Triggered', 'This modal was opened from a link.');
  }
  
  ngOnInit() {

    //this.loadContent({'file':'basic-commands.html', 'type':'side'}); // Load default content
/*
    this.sharedService.event$.subscribe((message: any) => {

      
      if(message.type == "side")
      {
        this.loadContent(message);
      }

    });
*/
  }

  //Run code after the view has been changed
  ngAfterViewChecked() {

    //Once the content is loaded, highlite any code that might be present
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });

  }

  loadContent(fileName: any) {

      this.http.get(`assets/${fileName.file}`, { responseType: 'text' }).subscribe({
      next: (html) => {
        this.htmlContent = html
      },
      error: (err) => {
        console.error('Failed to load content:', err);
        this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';
      }

    });
  }

}

