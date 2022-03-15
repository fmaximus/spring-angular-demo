import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

import {Hero} from "../model/hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(  private route: ActivatedRoute,
                private heroService: HeroService,
                private location: Location) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params["id"]);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
