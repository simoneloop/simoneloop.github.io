import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobusComponent } from './globus.component';

describe('GlobusComponent', () => {
  let component: GlobusComponent;
  let fixture: ComponentFixture<GlobusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
