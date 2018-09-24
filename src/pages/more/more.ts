import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: Boolean = true;
  public logined: Boolean = false;
  headface: string;
  userinfo: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
  ) {
    super();
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
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
            this.userinfo = userinfo;
            this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          });
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    })
  }
}
