import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { filter, takeWhile } from 'rxjs/operators';

import { UserNotes } from './services/notes.interface';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  public notePages = [
    {
      title: 'All notes',
      url: '/notes',
      icon: 'list-box'
    },
    {
      title: 'My favorites',
      url: '/notes',
      icon: 'star-outline'
    }
  ];

  public tagsPages = [
    { title: 'Travel', url: '/notes', icon: 'bookmark', color: 'primary' },
    { title: 'Personal', url: '/notes', icon: 'bookmark', color: 'secondary' },
    { title: 'Life', url: '/notes', icon: 'bookmark', color: 'tertiary' },
    { title: 'Work', url: '/notes', icon: 'bookmark', color: 'success' },
    { title: 'Untagged', url: '/notes', icon: 'bookmark', color: 'warning' },
  ];

  userId: string;
  allNotes = 0;
  favorites = 0;
  tagsLength = {
    travel: 0,
    life: 0,
    personal: 0,
    work: 0,
    untagged: 0
  };

  private destroySusbcriptions = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notesService: NotesService,
    private router: Router
  ) {
    this.initializeApp();
    this.router.events
      .pipe(
        takeWhile(() => !this.destroySusbcriptions),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe((val: any) => {
        const id = val.url.split('=');
        if (id.length > 1) {
          this.userId = id[1];
          this.userNotes(this.userId);
        } else {
          this.userId = window.localStorage.getItem('user_note_id');
          if (!this.userId) {
            return;
          }
          this.userNotes(this.userId);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  userNotes(userId) {
    this.notesService.userNotes(userId)
      .pipe(takeWhile(() => !this.destroySusbcriptions))
      .subscribe((data: UserNotes) => {
        if (!data || !data.notes) {
          // window.localStorage.removeItem('user_note_id');
          return;
        }

        this.allNotes = data.notes.length;
        this.favorites = data.notes.filter(note => note.favorite === true).length;
        this.tagsLength.travel = data.notes.filter(note => note.tagName === 'Travel').length;
        this.tagsLength.life = data.notes.filter(note => note.tagName === 'Life').length;
        this.tagsLength.personal = data.notes.filter(note => note.tagName === 'Personal').length;
        this.tagsLength.work = data.notes.filter(note => note.tagName === 'Work').length;
        this.tagsLength.untagged = data.notes.filter(note => note.tagName === 'Untagged').length;

      });
  }

  ngOnDestroy() {
    this.destroySusbcriptions = true;
  }
}
