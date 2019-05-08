import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  { path: 'notes', loadChildren: './pages/notes/notes.module#NotesPageModule' },
  { path: 'add-note/:tag', loadChildren: './pages/add-note/add-note.module#AddNotePageModule' },
  { path: 'tags-modal', loadChildren: './pages/tags-modal/tags-modal.module#TagsModalPageModule' },
  { path: 'edit-note/:id/:noteId', loadChildren: './pages/edit-note/edit-note.module#EditNotePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
