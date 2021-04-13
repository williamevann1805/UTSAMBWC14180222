import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FotoService } from '../foto.service';
import { GlobalVarService } from '../global-var.service';


interface data {
  judul : string,
  isi : string,
  nilai : string,
  tanggal : string,
  linkFoto : string
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  isiData : Observable<data[]>
  isiDataColl : AngularFirestoreCollection<data>;
  Judul : string;
  Isi : string;
  Nilai : string;
  Tanggal : string;
  LinkFoto : string;

  urlImageStorage  : string[] = [];

  constructor(
    afs : AngularFirestore,
    public fotoService : FotoService,
    public afStorage : AngularFireStorage,
    public router: Router,
    public globSer : GlobalVarService
  ) {
    this.isiDataColl = afs.collection('dataCoba');
    this.isiData = this.isiDataColl.valueChanges();
  }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }

  uploadFoto()
  {
    this.urlImageStorage = [];
    
    for (var index in this.fotoService.dataFoto)
    {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=> {
      
        });
      });
      this.LinkFoto = imgFilepath;
    }
    this.isiDataColl.doc(this.Judul).set({
      judul :this.Judul,
      isi : this.Isi,
      nilai : this.Nilai,
      tanggal : this.Tanggal,
      linkFoto : this.LinkFoto
    })
  }

  openDetail(TJ: string, TI: string, TN: string, TT: string, TL: string)
  {
    this.globSer.tempJudul = TJ;
    this.globSer.tempIsi = TI;
    this.globSer.tempNilai = TN;
    this.globSer.tempTanggal = TT;
    this.globSer.tempLink = TL;
    
    this.Judul = "";
    this.Isi = "";
    this.Nilai = "";
    this.Tanggal = "";
    this.LinkFoto = "";
    this.router.navigate(['tab2'])
  }

}
