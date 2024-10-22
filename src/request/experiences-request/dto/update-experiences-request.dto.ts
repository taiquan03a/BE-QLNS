import { PartialType } from '@nestjs/mapped-types';
import { CreateExperiencesRequestDto } from './create-experiences-request.dto';

export class UpdateExperiencesRequestDto extends PartialType(CreateExperiencesRequestDto) {}
