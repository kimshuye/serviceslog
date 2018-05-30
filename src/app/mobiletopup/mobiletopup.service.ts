import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';



export interface Phonenumbers{
  numberid: string;
  telnet?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MobiletopupService {
  
  pathPn = "phonenumbers";
  userId;

  phoneNums:Observable<Phonenumbers[]>;

  pNums:Phonenumbers[];

  constructor(private afs: AngularFirestore,
    public auth: AuthService,
    private db: AngularFireDatabase
  ) { 
    this.userId = this.auth.getuserId();
    this.getPnum();
  }

  getPnum(){
    this.phoneNums = this.db.list<Phonenumbers>(`${this.pathPn}/${this.userId}`)
      .snapshotChanges()
      .pipe(map(snap => {
        // console.log('list.subscribe snap');
        // console.log(snap);
        this.pNums = snap.map(c => ({  ...c.payload.val() }));
        return this.pNums;
      }))
    
    this.db.list<Phonenumbers>(`${this.pathPn}/${this.userId}`)
    .valueChanges().subscribe(snap =>{
      this.pNums = snap;
    })

      return this.phoneNums;
  }

  getPnums(){
    const data = this.pNums;
    return data;
  }

  addPhonenum(newPhone){
    var AddPhone = JSON.parse(JSON.stringify( newPhone )); //remotes the undefined fields
      var updates = {};
      updates[`/${this.pathPn}/${this.userId}/${newPhone.numberid}` ] = AddPhone;
      this.db.database.ref().update(updates);
  }

  // =================================================

  private pncusSoure = new BehaviorSubject<Phonenumbers>(null);
  curPncus = this.pncusSoure.asObservable();

  translatePn(data:Phonenumbers){
    this.pncusSoure.next(data);    
  }

  
}


export class Lbpncus {

  public numberid = "เบอร์";
  public name = "ชื่อเล่น";
  public telnet = "เครือข่าย โทรศัพท์";
  public addPn = "เพิ่ม/แก้ไข เบอร์";
  public cusList = "รายการเบอร์ ลูกค้า";
  public search = "ค้นหา";

  constructor(
    numid:string = "เบอร์",
    telnet:string = "เครือข่าย โทรศัพท์",
    name:string = "ชื่อเล่น",
    addpn:string = "เพิ่ม/แก้ไข เบอร์",
    cuslist:string = "รายการเบอร์ ลูกค้า",
    search:string = "ค้นหา"
  ){
    this.numberid = numid;
    this.name = name;
    this.telnet = telnet;
    this.addPn = addpn;
    this.cusList = cuslist;
    this.search = search;
  }
  
  setInti(){
    this.numberid = "เบอร์";
    this.name = "ชื่อเล่น";
    this.telnet = "เครือข่าย โทรศัพท์";
    this.addPn = "เพิ่ม/แก้ไข เบอร์";
    this.cusList = "รายการเบอร์ ลูกค้า";
    this.search = "ค้นหา";
  }

}