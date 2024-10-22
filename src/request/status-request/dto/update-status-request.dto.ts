import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusRequestDto } from './create-status-request.dto';

export class UpdateStatusRequestDto extends PartialType(CreateStatusRequestDto) {}
