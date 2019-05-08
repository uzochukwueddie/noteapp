import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditNotePage } from './edit-note.page';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: EditNotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditNotePage]
})
export class EditNotePageModule {}
