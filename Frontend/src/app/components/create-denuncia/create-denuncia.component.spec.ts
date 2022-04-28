import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDenunciaComponent } from './create-denuncia.component';

describe('CreateDenunciaComponent', () => {
  let component: CreateDenunciaComponent;
  let fixture: ComponentFixture<CreateDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDenunciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
