import { Component, OnInit } from '@angular/core';
import { OMDBService, SearchType } from './omdb.service';
import { Observable, Subscriber } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {


  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  view: string = "cards";

  constructor(private omdbService: OMDBService) { }

  ngOnInit() {


  }

  searchChanged() {
 
    this.results = this.omdbService.searchData(this.searchTerm, this.type);
    this.results = this.results.pipe(map(results => {
      return results.filter( results => results.Type !== "game");

    }))
  }

}
