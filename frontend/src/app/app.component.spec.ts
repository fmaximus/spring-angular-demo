import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component, Directive, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}


@Component({selector: 'app-messages', template: ''})
class MessagesStubComponent {
}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, RouterLinkDirectiveStub, MessagesStubComponent, RouterOutletStubComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tour of Heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Tour of Heroes');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main.content h1')?.textContent).toContain('Tour of Heroes');
  });
});
