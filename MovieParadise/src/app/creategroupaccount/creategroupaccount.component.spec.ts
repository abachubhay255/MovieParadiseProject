import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategroupaccountComponent } from './creategroupaccount.component';

describe('CreategroupaccountComponent', () => {
  let component: CreategroupaccountComponent;
  let fixture: ComponentFixture<CreategroupaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreategroupaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategroupaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
