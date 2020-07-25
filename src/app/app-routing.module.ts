import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'films',
    children: [
      {
        path: "",
        loadChildren: () => import('./films/films.module').then( m => m.FilmsPageModule)
      },
      {
        path: ":imdbID",
        loadChildren: () => import('./films/films-detail/films-detail.module').then( m => m.FilmsDetailPageModule)
      }
    ] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
