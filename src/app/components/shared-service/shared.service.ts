import { Injectable } from '@angular/core'; // Import Injectable to make this service available for dependency injection
import { Subject } from 'rxjs'; // Import Subject from RxJS to create an observable stream

/**
 * SharedService is a singleton service that acts as a bridge for communication
 * between components in Angular. It enables one component to emit events
 * and others to listen to those events without a direct parent-child relationship.
 */

@Injectable({
  providedIn: 'root', // Ensures this service is a singleton and available application-wide
})

export class SharedService {

  /**
   * A private Subject instance that acts as both an observable (to emit events)
   * and an observer (to listen for events).
   * 
   * Subject is a special type of observable provided by RxJS that allows
   * multicasting to multiple observers.
   */

  private eventSource = new Subject<string>(); 

  /**
   * An observable stream derived from `eventSource`. 
   * Components subscribe to this observable to listen for emitted events.
   */

  event$ = this.eventSource.asObservable(); 

  /**
   * Emits a new event through the `eventSource`.
   * Components subscribing to `event$` will receive the emitted value.
   *
   * @param message - The string message or data to broadcast to subscribers.
   */

  emitEvent(message: any) {
    this.eventSource.next(message); // Emits the provided message to all subscribers
  }
}
