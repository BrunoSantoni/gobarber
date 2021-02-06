import IParseMailTemplateDto from '../dtos/IParseMailTemplateDto';

export default interface IMailTemplateProvider {
  parseTemplate(data: IParseMailTemplateDto): Promise<string>;
}
