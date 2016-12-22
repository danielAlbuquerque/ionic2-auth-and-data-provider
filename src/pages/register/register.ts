import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthService]
})
export class RegisterPage {
	createSuccess = false;
	registerCredentials = {email: '', password: ''}

  	constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

  	register() {
  		this.auth.register(this.registerCredentials).subscribe(resp => {
  			if(resp) {
          console.log(resp);
  				this.createSuccess = true;
  				this.showPopup('Success', 'Account Created');
  			} else {
  				this.showPopup('Error', 'Erro ao criar conta');
  			}
  		}, error => {
  			this.showPopup('Error', error);
  		});
  	}

  	showPopup(title, text) {
  		let alert = this.alertCtrl.create({
  			title: title,
  			subTitle: text,
  			buttons: [
  				{
  					text: 'OK',
  					handler: data => {
  						if(this.createSuccess) {
  							this.nav.popToRoot;
  						}
  					}
  				}
  			]
  		});
  		alert.present();
  	}

}
