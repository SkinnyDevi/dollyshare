import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import NavbarVariant from './components/navbar/navbar-variant';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
	{ path: '', 
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
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];