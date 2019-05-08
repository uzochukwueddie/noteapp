import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsModalPage } from './tags-modal.page';

describe('TagsModalPage', () => {
  let component: TagsModalPage;
  let fixture: ComponentFixture<TagsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
