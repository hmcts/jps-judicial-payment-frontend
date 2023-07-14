import { DeleteSuccessComponent } from './delete-success.component';
import { Router } from '@angular/router';

describe('DeleteSuccessComponent', () => {
  let component: DeleteSuccessComponent;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new DeleteSuccessComponent(router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to sittingRecords/view when navigateToView is called', () => {
    component.navigateToView();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

});
