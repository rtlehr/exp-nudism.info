import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {

  @Input() modalId!: string;
  @Input() title!: string;
  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';
  @Input() content!: string;
  @Input() showOnLoad = false;

  private modalInstance!: Modal;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const modalElement = this.el.nativeElement.querySelector(`#${this.modalId}`);
    this.modalInstance = new Modal(modalElement);
    if (this.showOnLoad) {
      this.openModal();
    }
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }

}
