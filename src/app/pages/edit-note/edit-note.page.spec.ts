import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotePage } from './edit-note.page';

describe('EditNotePage', () => {
  let component: EditNotePage;
  let fixture: ComponentFixture<EditNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
