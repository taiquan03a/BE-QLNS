import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationRequestDto } from './create-education-request.dto';

export class UpdateEducationRequestDto extends PartialType(CreateEducationRequestDto) {}
