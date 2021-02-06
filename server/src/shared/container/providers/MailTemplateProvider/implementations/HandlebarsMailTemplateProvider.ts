import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDto from '../dtos/IParseMailTemplateDto';
import IMailTemplateProvider from '../interfaces/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate({
    file,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseHandlebarsTemplate = handlebars.compile(templateFileContent);

    return parseHandlebarsTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
