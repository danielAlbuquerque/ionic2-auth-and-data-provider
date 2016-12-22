import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AuthProviders, AuthMethods, FirebaseAuth, AngularFire} from 'angularfire2';

import { NativeStorage } from 'ionic-native';

import {DataProvider} from './data-provider';



@Injectable()
export class AuthService {
	  currentUser: any;

	  constructor(public auth: FirebaseAuth, public af: AngularFire, public data: DataProvider) {

  	}

  	login(credentials) {
      if (credentials.email === null || credentials.password == null) {
        return Observable.throw("Please insert credentials");
      } else {
        return Observable.create(observer => {
          // Firebase Authentication
          this.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
          }).then((authData) => {
            observer.next(true);
            observer.complete();
          }).catch((error) => {
            observer.error(error);
          });
        });
      }
  	}

  	register(credentials) {
  		if (credentials.email === null || credentials.password == null) {
  			return Observable.throw("Please insert credentials");
  		} else {
  			return Observable.create(observer => {
          // create user in users exclusive table
  				this.auth.createUser(credentials).then((authData) => {
            console.log("Criou o usuário:", authData);

            // Save in firebase new item in users node
            this.af.database.list('users').update(authData.uid, {
              name: authData.auth.email,
              email: authData.auth.email,
              emailVerified: false,
              provider: 'email',
              image: 'https://freeiconshop.com/files/edd/person-solid.png'
            });

  					observer.next(true);
  					observer.complete();
  				}).catch((error) => {
            console.log(error);
  					observer.error(error);
  				});
  				
  			});
  		}
  	}

  	getUserData() {
      return Observable.create(observer => {
        this.af.auth.subscribe(authData => {
          if(authData) {
            console.log('UID: ',authData.uid);
            this.data.object('users/' + authData.uid).subscribe(userData => {
              console.log(userData);
              this.currentUser = userData;
              observer.next(userData);
              observer.complete();
            });
          } else {
            observer.error();
          }
        })
      });
  	}

  	logout() {
  		return Observable.create(observer => {
  			this.af.auth.logout();

  			observer.next(true);
  			observer.complete();
  		})
  	}

}
