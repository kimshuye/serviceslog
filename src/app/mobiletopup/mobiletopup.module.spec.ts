import { MobiletopupModule } from './mobiletopup.module';

describe('MobiletopupModule', () => {
  let mobiletopupModule: MobiletopupModule;

  beforeEach(() => {
    mobiletopupModule = new MobiletopupModule();
  });

  it('should create an instance', () => {
    expect(mobiletopupModule).toBeTruthy();
  });
});
