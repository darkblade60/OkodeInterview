import { Component, OnInit } from '@angular/core';
import { OMDBService, SearchType } from './omdb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  films = []

  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  constructor(private omdbService: OMDBService) { }

  ngOnInit() {


  }

  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.omdbService.searchData(this.searchTerm, this.type);
  }

}
