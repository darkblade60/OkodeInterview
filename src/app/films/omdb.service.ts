import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from "rxjs";
import { from } from "rxjs";

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
 
@Injectable({
  providedIn: 'root'
})

export class OMDBService {
  url = 'https://www.omdbapi.com/';
  //apiKey = 'ff761019';
    apiKey = 'bfe4716a';

  
  randomObservable: Observable<any>

  constructor(private http: HttpClient) { }

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      map(results => results['Search'])
    );
  }

  getDetails(id) {
    const getMovies = this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
    console.log("getMovies", typeof getMovies, getMovies)
    return getMovies
  }

  pad(number, length) {
    var str = '' + number;
    while(str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  getRandomMovies() {
    
      const imdbRandom = this.pad(Math.floor((Math.random() * 2155529) + 1), 7);
      return this.http.get(`${this.url}?i=tt${imdbRandom}&apikey=${this.apiKey}`);
    
  }


}
