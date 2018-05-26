import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsWithServiceComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsWithServiceComponent;
  let fixture: ComponentFixture<PostsWithServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsWithServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsWithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
