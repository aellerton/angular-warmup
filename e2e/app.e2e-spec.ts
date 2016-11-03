import { AngularStormPage } from './app.po';

describe('angular-storm App', function() {
  let page: AngularStormPage;

  beforeEach(() => {
    page = new AngularStormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
