import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { AuthGuard } from './core/auth.guard';
import { TopupListComponent } from './mobiletopup/topup-list/topup-list.component';

const routes: Routes = [
  {path: '' , redirectTo: '/', pathMatch: 'full'},
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'mobiletopup', component:TopupListComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
