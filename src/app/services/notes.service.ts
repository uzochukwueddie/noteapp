import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { UserNotes, Notes } from './notes.interface';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesCollection: AngularFirestoreCollection<UserNotes>;
  notesDoc: AngularFirestoreDocument<UserNotes>;
  notes: UserNotes;

  constructor(
    private afs: AngularFirestore
  ) {
    this.notesCollection = this.afs.collection<UserNotes>('notes');
  }

  getNotes() {
    return this.notesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  userNotes(id) {
    return this.notesCollection.doc<UserNotes>(id).snapshotChanges().pipe(
      map(actions => {
        return actions.payload.data();
      })
    );
  }

  addUserNotes(note: Notes) {
    this.notes = {
      notes: [note]
    };
    return this.notesCollection.add(this.notes);
  }

  addMoreNotes(id: string, note: Notes, notes: Notes[]) {
    this.notesDoc = this.notesCollection.doc<UserNotes>(`${id}`);

    if (notes.length === 1) {
      note.noteId = notes[0].noteId + 1;
    } else if (notes.length > 1) {
      note.noteId = notes[notes.length - 1].noteId + 1;
    }

    notes.push(note);
    this.notes = {
      notes
    };
    return this.notesDoc.set(this.notes);
  }

  updateUserNote(userId: string, notes: Notes[]) {
    this.notesCollection.doc<UserNotes>(`${userId}`).update({
      notes
    });
  }

  deleteUserNote(userId: string, notes: Notes[]) {
    this.notesCollection.doc<UserNotes>(`${userId}`).update({
      notes
    });
  }

  getTagName(tagName) {
    const tags = [
      { name: 'Travel', icon: 'bookmark', color: 'primary' },
      { name: 'Personal', icon: 'bookmark', color: 'secondary' },
      { name: 'Life', icon: 'bookmark', color: 'tertiary' },
      { name: 'Work', icon: 'bookmark', color: 'success' },
      { name: 'Untagged', icon: 'bookmark', color: 'warning' },
    ];

    return tags.find(tag => tag.name === tagName);
  }

}
