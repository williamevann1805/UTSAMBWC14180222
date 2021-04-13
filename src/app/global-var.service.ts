import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  public tempJudul : string;
  public tempIsi : string;
  public tempNilai : string;
  public tempTanggal : string;
  public tempLink : string;

  constructor() { }

  setGlobal(TJ : string, TI : string, TN : string, TT : string, TL : string)
  {
    this.tempJudul = TJ;
    this.tempIsi = TI;
    this.tempNilai = TN;
    this.tempTanggal = TT;
    this.tempLink = TL;
  }
}
