import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be store messages added', () => {
    service.add("test")
    expect(service.messages).toEqual(["test"]);

    service.add("test2")
    expect(service.messages).toEqual(["test", "test2"]);

    service.clear()
    expect(service.messages).toEqual([]);
  });
});
