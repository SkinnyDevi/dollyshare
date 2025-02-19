import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import NavbarVariant from './components/navbar/navbar-variant';
import { RegisterComponent } from './views/register/register.component';
import { ShareFileComponent } from './views/share-file/share-file.component';
import { ShareTextComponent } from './views/share-text/share-text.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "DollyShare",
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: "Register - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  {
    path: 'share-files',
    component: ShareFileComponent,
    title: "Share Files - DollyShare"
  },
  {
    path: 'share-text',
    component: ShareTextComponent,
    title: "Share Text - DollyShare"
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
