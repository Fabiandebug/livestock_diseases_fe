import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layouts/main/main.component';
import { DiseaseComponent } from './forms/disease/disease.component';
import { ImageComponent } from './forms/image/image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import{MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DiseaseComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    CKEditorModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
