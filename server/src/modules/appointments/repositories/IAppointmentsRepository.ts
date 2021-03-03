import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromSpecificProviderDTO from '../dtos/IFindAllInMonthFromSpecificProviderDTO';
import IFindAllInDayFromSpecificProviderDTO from '../dtos/IFindAllInDayFromSpecificProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, providerId: string): Promise<Appointment | undefined>;
  findAllInMonthFromSpecificProvider(
    data: IFindAllInMonthFromSpecificProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromSpecificProvider(
    data: IFindAllInDayFromSpecificProviderDTO,
  ): Promise<Appointment[]>;
}
