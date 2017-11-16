import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealListComponent } from '../+deal-list/deal-list.component';
import { ListResolver } from './home.resolvers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list/:from/:to/:type',
        component: DealListComponent,
        resolve: {
          list: ListResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ListResolver]
})
export class HomeRoutingModule {}
