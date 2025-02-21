import { Component } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';
import { MainContentComponent } from '../main-content/main-content.component';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [MainContentComponent],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {

  constructor(private modalWindow: ModalWindowService) {}

  fileToLoad: string = ""
  divId: string = "";
  modalTitle: string = "";
  modalHeight: Number = 500;
  modalWidth: Number = 700;

  isVisible = false;

  ngOnInit() {
  
    this.modalWindow.actionTriggered$.subscribe((windowInfo: any) => {

      console.log("openModalWindow from modal-window component subscribe");

      this.fileToLoad = windowInfo.contentFile;

      this.divId = windowInfo.divId;

      this.modalTitle = windowInfo.title;

      this.modalHeight = windowInfo.height;

      this.modalWidth = windowInfo.width;

      this.openModalWindow();

    });
  
  }

  openModalWindow(): void
  {

    console.log("openModalWindow from modal-window component");

    this.isVisible = true;

  }

  closeModalWindow(): void
  {
    console.log("closeModalWindow from modal-window component");

    this.isVisible = false;
  }

}
