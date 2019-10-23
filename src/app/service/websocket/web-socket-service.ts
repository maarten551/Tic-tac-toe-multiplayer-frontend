import {RxStompService} from '@stomp/ng2-stompjs';

export abstract class WebSocketService<T> {
  protected subscribers: Map<any, (result: T) => void> = new Map<any, (result: T) => void>();
  private isInitialized = false;

  protected constructor(protected rxStompService: RxStompService) {
  }

  public addSubscriber(source: any, runnable: (result: T) => void): void {
    if (!this.subscribers.has(source)) {
      this.subscribers.set(source, runnable);
    }
  }

  public removeSubscriber(source: any): void {
    // Don't know if this check is needed
    if (!this.subscribers.has(source)) {
      this.subscribers.delete(source);
    }
  }

  protected abstract connectToWebSocket(): void;

  protected initializeConnection(): void {
    if (!this.isInitialized) {
      this.connectToWebSocket();
      this.isInitialized = true;
    }
  }
}
