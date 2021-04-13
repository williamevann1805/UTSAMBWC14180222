import { Component } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

interface data {
  judul : string,
  isi : string,
  nilai : string,
  tanggal : string,
  linkFoto : string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  Judul : string = this.globSer.tempJudul;
  Isi : string = this.globSer.tempIsi;
  Nilai : string = this.globSer.tempNilai;
  Tanggal : string = this.globSer.tempTanggal;
  LinkFoto : string = this.globSer.tempLink;
  isiDataColl : AngularFirestoreCollection<data>;

  constructor(public router: Router, afs : AngularFirestore, public globSer : GlobalVarService) {
    this.isiDataColl = afs.collection('dataCoba');
  }

  async ionViewDidEnter(){
  }

  delete()
  {
    this.isiDataColl.doc(this.Judul).delete();
    this.router.navigate(['tab1'])
  }
}
