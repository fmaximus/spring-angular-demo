import {Injectable} from '@angular/core';
import {Hero} from "./model/hero";
import {catchError, Observable, of, tap} from 'rxjs';
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http"

function plural(value: number, options: {[key: number]: string} & {other: string}) {
  // Handle 0, 1, ... cases
  const directResult = options[value];
  if (directResult !== undefined) { return directResult; }
  // handle zero, one, two, few, many
  // ...
  return options.other;
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private static readonly heroesUrl = 'http://localhost:8080/api/heroes/';  // URL to web api
  private readonly httpOptions = Object.freeze({
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(HeroService.heroesUrl)
      .pipe(
        tap(_ => this.log($localize`fetched heroes`)),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${HeroService.heroesUrl}${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log($localize`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${HeroService.heroesUrl}?name=${term}`).pipe(
      tap(x =>
        this.log($localize`found ${plural(x.length, {
          0: $localize`no heroes`,
          1: $localize`one hero`,
          other: $localize`${x.length} heroes`,
        })} matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(HeroService.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log($localize`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero) {
    return this.http.put(HeroService.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log($localize`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${HeroService.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log($localize`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log($localize`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
