import { UserNotes } from './../../services/notes.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { TagsModalPage } from '../tags-modal/tags-modal.page';
import { Notes } from 'src/app/services/notes.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit, OnDestroy {
  tagColor = 'warning';
  tagName = 'Untagged';
  favorite = false;
  description: string;
  currentDate = new Date();
  note: Notes;
  userId: string;
  notes = [];

  private destroySusbcriptions = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap
      .pipe(takeWhile(() => !this.destroySusbcriptions))
      .subscribe((data: Params) => {
        if (data.params.tag === 'My favorites') {
          this.favorite = true;
        } else if (data.params.tag === 'All notes') {
          const tag = this.notesService.getTagName('Untagged');
          this.tagName = tag.name;
          this.tagColor = tag.color;
        } else {
          const tag = this.notesService.getTagName(data.params.tag);
          this.tagName = tag.name;
          this.tagColor = tag.color;
        }
      });
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('user_note_id');
    if (!this.userId) {
      return;
    }
    this.getNotes(this.userId);
  }

  ngOnDestroy() {
    this.destroySusbcriptions = true;
  }

  getNotes(id) {
    this.notesService.userNotes(id)
      .pipe(takeWhile(() => !this.destroySusbcriptions))
      .subscribe((data: UserNotes) => {
        this.notes = data.notes;
      });
  }

  async showTagsModal() {
    const modal = await this.modalCtrl.create({
      component: TagsModalPage
    });
    modal.onDidDismiss()
      .then((value) => {
        if (value.data) {
          this.tagColor = value.data.color;
          this.tagName = value.data.tag;
        }
      });

    return await modal.present();
  }

  favoriteNote() {
    this.favorite = !this.favorite;
  }

  addNote() {
    if (!this.description) {
      return;
    }

    this.note = {
      noteId: 1,
      description: this.description,
      tagName: this.tagName,
      tagColor: this.tagColor,
      date: new Date().toISOString(),
      favorite: this.favorite
    };

    if (!this.userId) {
      this.notesService.addUserNotes(this.note)
        .then((data) => {
          window.localStorage.setItem('user_note_id', data.id);
          this.router.navigate(['/notes'], { queryParams: {id: data.id}});
        })
        .catch(err => console.log(err));
    } else {
      this.notesService.addMoreNotes(this.userId, this.note, this.notes)
        .then(() => {
          this.router.navigate(['/notes']);
        })
        .catch(err => console.log(err));
    }
  }

}
