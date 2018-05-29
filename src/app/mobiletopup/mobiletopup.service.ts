import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



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

  public pNums:Phonenumbers[];

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

  addPhonenum(newPhone){
    var AddPhone = JSON.parse(JSON.stringify( newPhone )); //remotes the undefined fields
      var updates = {};
      updates[`/${this.pathPn}/${this.userId}/${newPhone.numberid}` ] = AddPhone;
      this.db.database.ref().update(updates);
  }

  
}
