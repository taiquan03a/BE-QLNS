import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyRequestDto } from './create-family-request.dto';

export class UpdateFamilyRequestDto extends PartialType(CreateFamilyRequestDto) {}
