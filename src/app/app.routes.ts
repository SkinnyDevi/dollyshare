import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import NavbarVariant from './components/navbar/navbar-variant';
import { RegisterComponent } from './views/register/register.component';
import { ShareFileComponent } from './views/share-file/share-file.component';
import { ShareTextComponent } from './views/share-text/share-text.component';
import { UserLayoutComponent } from './views/user/user-layout/user-layout.component';
import { FinishCreationComponent } from './views/finish-creation/finish-creation.component';
import { RegisterSuccessfulComponent } from './views/register-successful/register-successful.component';
import { DownloadTextComponent } from './views/download-text/download-text.component';
import { DownloadFileComponent } from './views/download-file/download-file.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "DollyShare"
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
  {
    path: 'finish/:link_id',
    component: FinishCreationComponent,
    title: "Finish Creation - DollyShare"
  },
  {
    path: 'user/account',
    component: UserLayoutComponent,
    title: "Account - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  {
    path: 'user/change-password',
    component: UserLayoutComponent,
    title: "Change Password - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  {
    path: 'user/active-links',
    component: UserLayoutComponent,
    title: "Active Links - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  { path: 'user', redirectTo: 'user/account', pathMatch: 'full' },
  {
    path: 'register-successful',
    component: RegisterSuccessfulComponent,
    title: "Register Successful - DollyShare"
  },
  {
    path: "user/manage-link/files/:link_id",
    component: UserLayoutComponent,
    title: "Manage Link - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  {
    path: "user/manage-link/text/:link_id",
    component: UserLayoutComponent,
    title: "Manage Link - DollyShare",
    data: { navbarVariant: NavbarVariant.EMPTY }
  },
  {
    path: "download/text/:link_id",
    component: DownloadTextComponent,
    title: "Download - DollyShare"
  },
  {
    path: "download/files/:link_id",
    component: DownloadFileComponent,
    title: "Download - DollyShare"
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
