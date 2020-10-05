import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { ActivatedRoute } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [
  {
    path: "",
    component: UsersComponent
  },
  {
    path: "users/:login",
    component: UserDetailsComponent
  }
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
