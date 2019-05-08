import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tags-modal',
  templateUrl: './tags-modal.page.html',
  styleUrls: ['./tags-modal.page.scss'],
})
export class TagsModalPage {
  colorname: string;
  tags = [
    { name: 'Travel', icon: 'bookmark', color: 'primary' },
    { name: 'Personal', icon: 'bookmark', color: 'secondary' },
    { name: 'Life', icon: 'bookmark', color: 'tertiary' },
    { name: 'Work', icon: 'bookmark', color: 'success' },
    { name: 'Untagged', icon: 'bookmark', color: 'warning' },
  ];

  constructor(
    private modalCtrl: ModalController
  ) { }

  selectTag(e) {
    const result = this.tags.find(tag => tag.name === e.detail.value);
    this.modalCtrl.dismiss({tag: e.detail.value, color: result.color});
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
