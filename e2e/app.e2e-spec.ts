import { AngularTestingPage } from './app.po';

describe('angular-testing App', () => {
  let page: AngularTestingPage;

  beforeEach(() => {
    page = new AngularTestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
