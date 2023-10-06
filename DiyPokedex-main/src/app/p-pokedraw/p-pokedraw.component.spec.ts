import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPokedrawComponent } from './p-pokedraw.component';

describe('PPokedrawComponent', () => {
  let component: PPokedrawComponent;
  let fixture: ComponentFixture<PPokedrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PPokedrawComponent]
    });
    fixture = TestBed.createComponent(PPokedrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
