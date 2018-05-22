import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseFormComponentComponent } from './new-course-form-component.component';

describe('NewCourseFormComponentComponent', () => {
  let component: NewCourseFormComponentComponent;
  let fixture: ComponentFixture<NewCourseFormComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCourseFormComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
