import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {Component} from "@angular/core";

@Component({selector: 'app-hero-search', template: ''})
class HeroSearchStubComponent {
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['getHeroes']);
  const heroes = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, HeroSearchStubComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockHeroService.getHeroes.and.returnValue(of(heroes))

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
