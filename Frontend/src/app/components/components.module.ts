import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { NocontentComponent } from './ui/nocontent/nocontent';
import { ErrorComponent } from './ui/error/error';
import { ProfileInfoComponent } from './authentication/profile-info/profile-info';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { ResetpasswordFormComponent } from './authentication/resetpassword-form/resetpassword-form.component';
import { CommonModule } from '@angular/common';
import { MoviesBoxesComponent } from './movies/movies-boxes/movies-boxes.component';
import { MoviesScrollComponent } from './movies/movies-scroll/movies-scroll.component';

export const component = [
	NocontentComponent, ErrorComponent,
	LoginFormComponent, RegisterFormComponent, ResetpasswordFormComponent,
	ProfileInfoComponent,
	MoviesBoxesComponent, MoviesScrollComponent
]

@NgModule({
	declarations: component,
	imports: [
		IonicImageLoader,
		FormsModule,
		ReactiveFormsModule,
		IonicImageLoader,
		CommonModule,
		IonicModule
	],
	exports: component
})
export class ComponentsModule {}
