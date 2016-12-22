import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';

// Providers
import { DataProvider } from '../providers/data-provider';


export const firebaseConfig = {
  apiKey: "AIzaSyBtfeUNoIA4WoM54c_Wx3huOh9T4N7xVHA",
  authDomain: "todo-17b62.firebaseapp.com",
  databaseURL: "https://todo-17b62.firebaseio.com",
  storageBucket: "todo-17b62.appspot.com",
  messagingSenderId: "112904404965"
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    RegisterPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    RegisterPage,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
