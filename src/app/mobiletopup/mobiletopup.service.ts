import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  pathMotop = "mobiletopup";

  userId;

  phoneNums:Observable<Phonenumbers[]>;

  pNums:Phonenumbers[];

  motopsCollection: AngularFirestoreCollection<any>;
  motopDocument:   AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore,
    public auth: AuthService,
    private db: AngularFireDatabase
  ) { 
    this.userId = this.auth.getuserId();
    this.getPnum();
    this.motopsCollection = this.afs.doc(`menbers/${this.userId}`).collection(`${this.pathMotop}`, (ref) => ref.orderBy('datetimeat', 'desc') );
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

  saveMobileTopup(newMotop){

    var pncus = {
      numberid: newMotop.numberid,
      telnet: newMotop.telnet,
      name: newMotop.name
    };
    this.addPhonenum(pncus);
    this.addMotop(newMotop);
    
  }

  // =================================================

  // private pncusSoure = new BehaviorSubject<any>(null);
  // curPncus = this.pncusSoure.asObservable();

  @Output() translate: EventEmitter<MobileTopup> = new EventEmitter();

  translatePn(data:any){
    // this.pncusSoure.next(data);  
    this.translate.emit(data);  
  }

  // =================================================

  getMotopsData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.motopsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getMotop(id: string) {
    return this.afs.doc<any>(`menbers/${this.userId}/${this.pathMotop}/${id}`);
  }

  addMotop(newMotop: any) {
    
    return this.motopsCollection.add(newMotop)
    .then( docRef => {
      console.log("Document written with ID: ", docRef.id);
      // const motop = {
      //   motopid:docRef.id
      // };
      // var AddMotop = JSON.parse(JSON.stringify( motop )); //remotes the undefined fields
      // var updates = {};
      // updates['/notes/' + this.userId + '/' + docRef.id ] = AddNote;
      // this.db.database.ref(`/${this.pathMotop}/` + this.userId).push(AddMotop);

    });
    
  }

  updateMotop(id: string, data: any) {
    return this.getMotop(id).update(data);
  }

  deleMotop(id:string){
    return this.getMotop(id).delete();
  }
  
}

export interface MobileTopup{
  id:string;
  datetimeat:Date;
  numberid: string;
  telnet: string;
  name?: string;
  topup:number;
  charge:number;
  primalfee:number;
  status:string;
}

export class LbMobilePn {

  public numberid = "เบอร์";
  public name = "ชื่อเล่น";
  public telnet = "เครือข่าย โทรศัพท์";
  public addPn = "เพิ่ม/แก้ไข เบอร์";
  public cusList = "รายการเบอร์ ลูกค้า";
  public search = "ค้นหา";
  public datetimeat = "วัน เวลา";
  public topup = "ยอดเติม";
  public primalfee = "ค่าธรรมเนียม ขั้นต้น";
  public charge = "ค่าบริการ";
  public save = "บันทึก";
  public status = "สถานะการชำระ";
  public delete = "ลบ";

  constructor(){  }
  
  setInti(){
    this.numberid = "เบอร์";
    this.name = "ชื่อเล่น";
    this.telnet = "เครือข่าย โทรศัพท์";
    this.addPn = "เพิ่ม/แก้ไข เบอร์";
    this.cusList = "รายการเบอร์ ลูกค้า";
    this.search = "ค้นหา";
    this.topup = "ยอดเติม";    
    this.primalfee = "ค่าธรรมเนียม ขั้นต้น";
    this.charge = "ค่าบริการ";
    this.save = "บันทึก";
    this.status = "สถานะการชำระ";
    this.delete = "ลบ";
  }

}