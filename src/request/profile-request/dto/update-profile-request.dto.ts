import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileRequestDto } from './create-profile-request.dto';

export class UpdateProfileRequestDto extends PartialType(CreateProfileRequestDto) {}
