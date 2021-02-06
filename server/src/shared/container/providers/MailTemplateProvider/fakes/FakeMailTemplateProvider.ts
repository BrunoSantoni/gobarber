import IMailTemplateProvider from '../interfaces/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
