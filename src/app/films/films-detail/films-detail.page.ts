import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { OMDBService, SearchType } from '../omdb.service';


@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.page.html',
  styleUrls: ['./films-detail.page.scss'],
})
export class FilmsDetailPage implements OnInit {
  information = null;

  constructor(private activatedRoute: ActivatedRoute, private omdbService: OMDBService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('imdbID');
 
    this.omdbService.getDetails(id).subscribe(result => {
      this.information = result;
    });

  }
}
