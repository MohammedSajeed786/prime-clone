import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail.component';

const routes: Routes = [
  {
    path: ':movie',
    pathMatch:'full',
    component: MovieDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailRoutingModule {}
