import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { ResultsComponent } from './components/results/results.component';
import { SingleComponent} from './components/single/single.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'items', component: ResultsComponent },
    { path: 'items/:id', component: SingleComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}

export const ROUTES = RouterModule.forRoot(APP_ROUTES, {useHash:false});
