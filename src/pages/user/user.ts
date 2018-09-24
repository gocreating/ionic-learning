import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ViewController,
} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  headface: string = 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg';
  nickname: string = '載入中...';
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
  ) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "載入中...");
        this.rest.getUserInfo(val)
          .subscribe(userinfo => {
            this.nickname = userinfo['UserNickName'];
            this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();

            loading.dismiss();
          }, error => this.errorMessage = <any>error);
      }
    });
  }

  updateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "載入中...");
        this.rest.updateNickName(val, this.nickname)
          .subscribe(f => {
            if (f['Status'] == 'OK') {
              loading.dismiss();
              super.showToast(this.toastCtrl, '暱稱修改成功。');
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f['StatusContent']);
            }
          }, error => this.errorMessage = <any>error);
      }
    });
  }

  logout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }
}
