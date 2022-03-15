import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import {HeroService} from "../hero.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {Hero} from "../model/hero";
import {of} from "rxjs";

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  const mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', [
    'getHero',
    'updateHero'
  ]);
  const mockLocation = jasmine.createSpyObj<Location>('Location', [
    'back',
  ]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                id: "11"
              }
            }
          }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const hero: Hero = {
      id: 11,
      name: "Healing Journey Man"
    }
    mockHeroService.getHero.withArgs(11).and.returnValue(of(hero))

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
