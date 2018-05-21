import { SummaryPipe } from './summary.pipe';
import { CoursesService } from './courses.services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoursesComponent }      from './courses.component';
import { CourseComponent } from './course/course.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PanelComponent } from './panel/panel.component';
import { DirectiveComponent } from './directive/directive.component';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    SummaryPipe,
    FavoriteComponent,
    PanelComponent,
    DirectiveComponent,
    InputFormatDirective,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    CoursesService              // creará un singleton del servicio, dando la misma instancia a todos los componentes del modulo que lo necesite
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
