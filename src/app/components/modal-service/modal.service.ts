import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSource = new BehaviorSubject<ModalState>({ isOpen: false });
  modalState = this.modalStateSource.asObservable();

  open(title: string, content: string) {
    this.modalStateSource.next({ isOpen: true, title, content });
  }

  close() {
    this.modalStateSource.next({ isOpen: false });
  }
}
