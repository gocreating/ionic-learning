import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage,
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  login() {
    let loading = super.showLoading(this.loadingCtrl, "登入中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(f => {
        if (f['Status'] == 'OK') {
          this.storage.set('UserId', f['UserId']);
          loading.dismiss();
          this.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, f['StatusContent']);
        }
      }, error => this.errorMessage = <any>error);
  }

  pushRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
