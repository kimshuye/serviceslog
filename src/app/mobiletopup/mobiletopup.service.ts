import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';



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

  constructor(private afs: AngularFirestore,
    public auth: AuthService,
    private db: AngularFireDatabase
  ) { 
    this.userId = this.auth.getuserId();
  }

  addPhonenum(newPhone){
    var AddPhone = JSON.parse(JSON.stringify( newPhone )); //remotes the undefined fields
      var updates = {};
      updates[`/${this.pathPn}/${this.userId}/${newPhone.numberid}` ] = AddPhone;
      this.db.database.ref().update(updates);
  }

  
}
