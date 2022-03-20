import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeroSearchComponent} from './hero-search.component';
import {HeroService} from "../hero.service";

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>
  const mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['searchHeroes']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
