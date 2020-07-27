import { Component, OnInit } from '@angular/core';
import { OMDBService, SearchType } from './omdb.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})

export class FilmsPage implements OnInit {
  results: Observable<any>;
  movie: Object;
  randomFilms: Object[];
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  view: string = "cards";
  respuesta: string = "ini";
  arrayString: string[];
  errorBusqueda: Object = '{Response: "False", Error: "Error getting data."}';

  constructor(private omdbService: OMDBService) { }

  ngOnInit() {


    this.randomFilms = []
    let numberOfMovies = 0;
    for (numberOfMovies = 0; numberOfMovies <= 9; numberOfMovies++) {      
      this.omdbService.getRandomMovies().subscribe(value => { if (value) {  

        this.randomFilms.push(value) 
        if(JSON.stringify(this.randomFilms[this.randomFilms.length-1]).substring(2,3) === 'R'){
           this.randomFilms.pop();
        }
  
     
      
      }});

        
    }
  }


  searchChanged() {
    if (!this.searchTerm) { 
        this.respuesta = "default"
    } else {
        this.results = this.omdbService.searchData(this.searchTerm, this.type);
        this.results.subscribe(comprobar => {
          if (!comprobar) {  this.respuesta = "ko"  }
          else {     
            this.respuesta = "ok"
            this.results = this.results.pipe(map(results => {
            return results.filter( results => results.Type !== "game");}))            
          }
        })
      }
    }
  }
