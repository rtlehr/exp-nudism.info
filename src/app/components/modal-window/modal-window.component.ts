import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ModalService } from '../modal-service/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.css'
})
export class ModalWindowComponent {

  @Input() title: string = 'Modal Title'; // Default modal title
  @Input() content: string = 'This is modal content'; // Default content

  isOpen: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // Subscribe to modal service to listen for open/close actions
    this.modalService.modalState.subscribe((state) => {
      this.isOpen = state.isOpen;
      this.title = state.title || this.title;
      this.content = state.content || this.content;
    });
  }

  closeModal() {
    this.modalService.close();
  }
  
}
