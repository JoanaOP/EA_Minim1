import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDenunciasComponent } from './list-denuncias.component';

describe('ListDenunciasComponent', () => {
  let component: ListDenunciasComponent;
  let fixture: ComponentFixture<ListDenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDenunciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
