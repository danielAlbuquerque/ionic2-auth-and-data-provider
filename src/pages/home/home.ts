import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {
	username = '';
	email = '';

	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
		this.auth.getUserData().subscribe((response) => {
			console.log(response);
			this.username = response.email;
			this.email = response.email;
		}, err => {
			console.log(err);
		})
		
		
	}

	logout() {
		this.auth.logout().subscribe(succ => {
			this.navCtrl.setRoot(LoginPage);
		})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
	}

}
