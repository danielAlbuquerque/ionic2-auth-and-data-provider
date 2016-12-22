import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';


import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage {
	loading: Loading;
	registerCredentials = {email: '', password: ''};

	constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

	createAccount() {
		this.nav.push(RegisterPage);
	}

	login() {
		this.showLoading();
		this.auth.login(this.registerCredentials).subscribe(result => {
			console.log(result);
			if(result) {
				setTimeout(() => {
					this.loading.dismiss();
					this.nav.setRoot(HomePage);
				});
			} else {
				this.showError("Error creating account.");
			}
		}, error => {
			this.showError(error);
		});
	}

	
	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait'
		});
		this.loading.present();
	}

	showError(text) {
		setTimeout(() => {
			this.loading.dismiss();
		});

		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});

		alert.present(prompt);
	}

}
