import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

export interface User {
  uid?: string;
  username?: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

export interface UsernameDb {
  $username:string;
  uid?:string;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  currentUser:UsernameDb;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private db:AngularFireDatabase
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        // user.username = username;
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      username: user.username || null,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    
    const data1 = {
      email: user.email ,
      username: user.username 
    };
    
    var update1 = {};
    update1[`/users/${user.uid}`] = data1;
    this.db.database.ref().update(update1);

    const data2 = {
      uid: user.uid
    };
    
    var update2 = {};
    update2[`/usernames/${user.username}`] = data2;
    this.db.database.ref().update(update2);

    return userRef.set(data);
  }

  get hasUsername() {
    return this.currentUser.$username ? true : false
  }

  checkUsername(username:string){
    username = username.toLowerCase();
    return this.db.object(`usernames/${username}` )
      .snapshotChanges().pipe(
      map(c => ({ $username: c.payload.key, ...c.payload.val() })));
  }
}
