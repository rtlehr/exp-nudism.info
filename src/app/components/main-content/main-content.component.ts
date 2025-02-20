import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  htmlContent!: SafeHtml;

  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private modalWindow: ModalWindowService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadContent(changes['fileToLoad'].currentValue);
    }
  }

  loadContent(fileName: string) {
    this.http.get(`assets/${fileName}`, { responseType: 'text' }).subscribe({
      next: (html) => {
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
  
        setTimeout(() => {
          this.attachClickEvents();
          this.highlightCode();
          this.checkForModalTrigger();
        }, 10);
      },
      error: (err) => {
        console.error('Failed to load content:', err);
        this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';
      }
    });
  }
  
  checkForModalTrigger() {
    if (!this.contentContainer) return;
  
    const modalTrigger = this.contentContainer.nativeElement.querySelector('trigger-modal');
    
    if (modalTrigger) {
      const jsonData = modalTrigger.getAttribute('data-content');
      
      if (jsonData) {
        try {
          const modalData = JSON.parse(jsonData); // Convert JSON string to object
          this.openModalWindow(modalData);
        } catch (error) {
          console.error("Invalid JSON in trigger-modal:", error);
        }
      }
  
      // Remove the trigger-modal tag to avoid duplicate triggers
      modalTrigger.remove();
    }
  }
  
  

  attachClickEvents() {
    if (!this.contentContainer) return;
  
    const elements = this.contentContainer.nativeElement.querySelectorAll('[data-click]');
  
    elements.forEach((element: HTMLElement) => {
      const functionName = element.getAttribute('data-click');
      const jsonData = element.getAttribute('data-content');
  
      if (functionName === 'openModalWindow' && jsonData) {
        try {
          const modalData = JSON.parse(jsonData); // Convert JSON string to object
  
          this.renderer.listen(element, 'click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            this.openModalWindow(modalData);
          });
  
        } catch (error) {
          console.error("Invalid JSON in data-content:", error);
        }
      }
    });
  }
  

  highlightCode() {
    if (this.contentContainer) {
      this.contentContainer.nativeElement.querySelectorAll('pre code').forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
    }
  }

  openModalWindow(modalContent: any) {
    console.log("Modal Content:", modalContent); // Should log: { content: "this is modal content from blog list" }
    this.modalWindow.openModalWindow(modalContent);
  }
  
}
