/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostPlistUserComponent } from './PostPlistUser.component';

describe('PostPlistUserComponent', () => {
  let component: PostPlistUserComponent;
  let fixture: ComponentFixture<PostPlistUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPlistUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPlistUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
