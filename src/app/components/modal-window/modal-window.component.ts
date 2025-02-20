import { Component } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {

  constructor(private modalWindow: ModalWindowService) {}

  modalTitle: String = "THIS IS THE MODAL TITLE"
  modalContent: String = "THIS IS A TEST";
  modalHeight: Number = 500;
  modalWidth: Number = 700;

  isVisible = false;

  ngOnInit() {
  
    this.modalWindow.actionTriggered$.subscribe((windowInfo: any) => {

      console.log("openModalWindow from modal-window component subscribe");

      this.modalContent = windowInfo.content;

      this.openModalWindow();

    });
  
  }

  openModalWindow(): void
  {

    console.log("openModalWindow from modal-window component");

    this.isVisible = true;

  }

}
