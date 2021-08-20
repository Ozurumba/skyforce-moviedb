import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenuPage } from './tab-menu.page';

describe('TabMenuPage', () => {
  let component: TabMenuPage;
  let fixture: ComponentFixture<TabMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
