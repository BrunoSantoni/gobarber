import ISendMailDto from '../dtos/ISendMailDto';
import IMailProvider from '../interfaces/IMailProvider';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDto[] = [];

  public async sendMail(message: ISendMailDto): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
