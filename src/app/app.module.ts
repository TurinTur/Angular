import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
// import { PostService } from './services/post.service';
import { SummaryPipe } from './summary.pipe';
import { CoursesService } from './courses.services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
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
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppErrorHandler } from './common/app-error-handler';
import { PostDataService } from './services/post-with-data.service';
import { PostsOptimisticComponent } from './posts-optimistic/posts-optimistic.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { GithubFollowersService } from './services/github-followers.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { OrderService } from './services/order.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}
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
    PostsWithServiceComponent,
    PostsOptimisticComponent,
    NavbarComponent,
    HomeComponent,
    GithubProfileComponent,
    NotFoundComponent,
    GithubFollowersComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,                  // el modulo ya tiene los servicios http de DI puestos, por eso no tenemos que ponerlo nosotros abajo
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:4200'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    RouterModule.forRoot([  // metodo estático. Util para una pagina pequeña. Para un sitio grande, es mejor dividirlo en sub-Routes usando .forChild()
      {path: '', component: HomeComponent},    // array de par key/values. path sin / = default page
     // AuthGuard y adminAuthGuard son clases que implementa el interfaz canActivate. canActivate puede tener varias, por eso es un array. El orden importa.
      {path: 'admin', component: AdminComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'no-access', component: NoAccessComponent},

      {path: 'followers/:id/:username', component: GithubProfileComponent},  // con parametro username
      {path: 'followers', component: GithubFollowersComponent},          // tiene que ir debajo de followers/:username, porque si no, cualquier entrada que empieze por followers ira al primero que coincida
      {path: 'posts', component: PostsOptimisticComponent},
      {path: '**', component: NotFoundComponent}              // cualquier otra pagina, importa el orden, por eso va al final
    ])
  ],
  providers: [
    CoursesService,              // creará un singleton del servicio, dando la misma instancia a todos los componentes del modulo que lo necesite
    PostDataService,              // antes era PostService
    GithubFollowersService,
    OrderService,
    AuthService, AdminAuthGuard,
    // fakeBackendProvider,
    MockBackend, BaseRequestOptions,
    JwtHelperService,
    { provide: ErrorHandler, useClass: AppErrorHandler} // le decimos a Angular que en cualquier uso de ErrorHandler, use mejor nuestra propia clase, AppErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
