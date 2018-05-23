import { PostService } from './services/post.service';
import { SummaryPipe } from './summary.pipe';
import { CoursesService } from './courses.services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoursesComponent }      from './courses.component';
import { CourseComponent } from './course/course.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PanelComponent } from './panel/panel.component';
import { DirectiveComponent } from './directive/directive.component';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponentComponent } from './new-course-form-component/new-course-form-component.component';
import { PostsComponent } from './posts/posts.component';
import { PostsWithServiceComponent } from './posts-with-service/posts.component';
import { HttpModule } from '@angular/http';
import { AppErrorHandler } from './common/app-error-handler';

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
    ContactFormComponent,
    SignupFormComponent,
    NewCourseFormComponentComponent,
    PostsComponent,
    PostsWithServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule                  // el modulo ya tiene los servicios http de DI puestos, por eso no tenemos que ponerlo nosotros abajo
  ],
  providers: [
    CoursesService,              // creará un singleton del servicio, dando la misma instancia a todos los componentes del modulo que lo necesite
    PostService,
    { provide: ErrorHandler, useClass: AppErrorHandler} // le decimos a Angular que en cualquier uso de ErrorHandler, use mejor nuestra propia clase, AppErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
