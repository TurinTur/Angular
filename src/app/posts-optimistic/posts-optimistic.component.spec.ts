import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsOptimisticComponent } from './posts-optimistic.component';

describe('PostsOptimisticComponent', () => {
  let component: PostsOptimisticComponent;
  let fixture: ComponentFixture<PostsOptimisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsOptimisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsOptimisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
