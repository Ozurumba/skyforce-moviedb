import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoviesListingsPage } from './movies-listings.page';

describe('MoviesListingsPage', () => {
  let component: MoviesListingsPage;
  let fixture: ComponentFixture<MoviesListingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
