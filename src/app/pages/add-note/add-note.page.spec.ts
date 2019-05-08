import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotePage } from './add-note.page';

describe('AddNotePage', () => {
  let component: AddNotePage;
  let fixture: ComponentFixture<AddNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
