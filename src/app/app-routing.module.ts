import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { DiseaseComponent } from './forms/disease/disease.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'disease/add', component: DiseaseComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
