import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController,
} from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoLogin() {
    this.navCtrl.pop();
  }

  doRegister() {
    if (this.password != this.confirmPassword) {
      super.showToast(this.toastCtrl, '密碼不一樣');
    } else {
      let loading = super.showLoading(this.loadingCtrl, "註冊中...");
      this.rest.register(this.mobile, this.nickname, this.password)
        .subscribe(f => {
          if (f['Status'] == 'OK') {
            super.showToast(this.toastCtrl, '註冊成功');
            loading.dismiss();
            this.dismiss();
          } else {
            loading.dismiss();
            super.showToast(this.toastCtrl, f['StatusContent']);
          }
        }, error => this.errorMessage = <any>error);
    }

  }
}
