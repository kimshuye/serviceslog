import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NotesService {

  notesCollection: AngularFirestoreCollection<any>;
  noteDocument:   AngularFirestoreDocument<any>;

  path:string = "notes";

  userId:string;

  notesDb:Observable<any>;

  constructor(private afs: AngularFirestore,
    public auth: AuthService,
    private db: AngularFireDatabase
  ) {
    this.userId = this.auth.getuserId();
    
    this.notesCollection = this.afs.doc(`menbers/${this.userId}`).collection(`notes`, (ref) => ref.orderBy('time', 'desc').limit(5));
    // console.log(`menbers/${this.userId}/notes`);
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.notesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getNote(id: string) {
    return this.afs.doc<any>(`menbers/${this.userId}/notes/${id}`);
  }

  createNote(content: string) {
    const note = {
      content,
      hearts: 0,
      time: new Date().getTime(),
    };
    return this.notesCollection.add(note)
    .then( docRef => {
      console.log("Document written with ID: ", docRef.id);
      const note = {
        noteid:docRef.id
      };
      var AddNote = JSON.parse(JSON.stringify( note )); //remotes the undefined fields
      // var updates = {};
      // updates['/notes/' + this.userId + '/' + docRef.id ] = AddNote;
      this.db.database.ref('/notes/' + this.userId).push(AddNote);

    });
    
  }

  updateNote(id: string, data: any) {
    return this.getNote(id).update(data);
  }

  deleteNote(id: string) {
    return this.getNote(id).delete()
    .then(docRef => {

      this.notesDb = this.db.list<any>('/notes/' + this.userId )
      .snapshotChanges().pipe(map(snap => {
        // console.log('list.subscribe snap');
        // console.log(snap);
        const data = snap.map(c => ({ id: c.payload.key, ...c.payload.val() }));
        return data.filter(note => note.noteid == id );
      }))

      this.notesDb.subscribe(snap => {
        // console.log('this.notesDb.subscribe snap');
        // console.log(snap[0].id);
        this.db.list('/notes/' + this.userId).remove(snap[0].id);
      })

    });
  }

}
