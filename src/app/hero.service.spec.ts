import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import { of } from 'rxjs';
import {Hero} from "./model/hero";

describe('HeroService', () => {
  let service: HeroService;
  const mockHttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put', 'delete']);
  const mockMessageService = jasmine.createSpyObj<MessageService>('MessageService', ['add', 'clear']);

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      { provide: HttpClient, useValue: mockHttpClient },
      { provide: MessageService, useValue: mockMessageService },
      ]});
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    mockHttpClient.get.calls.reset();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes should return heroes', (done) => {
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
    const spy = mockHttpClient.get.withArgs('api/heroes').and.returnValue(of(heroes));
    service.getHeroes().subscribe(data => {
      expect(data).toEqual(heroes);
      expect(spy.calls.count()).toEqual(1)
      done()
    })
  });

  it('getHero should return the hero', (done) => {
    const hero = { id: 11, name: 'Dr Nice' };

    const spy = mockHttpClient.get.withArgs('api/heroes/11').and.returnValue(of(hero))
    service.getHero(11).subscribe(data => {
      expect(data).toEqual(hero);
      expect(spy.calls.count()).toEqual(1)
      done()
    })
  });

  it('addHero should return the hero', (done) => {
    const hero = { name: 'Healing Journey Man' } as Hero;
    const createdHero = { id: 77, name: 'Healing Journey Man' };

    const spy = mockHttpClient.post.withArgs('api/heroes', hero, jasmine.anything()).and.returnValue(of(createdHero))
    service.addHero(hero).subscribe(data => {
      expect(data).toEqual(createdHero);
      expect(spy.calls.count()).toEqual(1)
      done()
    })
  });
});
