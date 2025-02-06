import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class CreatePetValidationPipe implements PipeTransform {
  async transform(value: any) {
    if (!value.type) {
      throw new BadRequestException(`Pet type is required.`);
    }

    let dto: any;
    if (value.type === 'cat') {
      dto = plainToInstance(CreateCatDto, value);
    } else if (value.type === 'dog') {
      dto = plainToInstance(CreateDogDto, value);
    } else {
      throw new BadRequestException('Invalid pet type');
    }

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }
}
