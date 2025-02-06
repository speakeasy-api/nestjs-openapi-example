import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Cat } from './entities/cat.entity';
import { Dog } from './entities/dog.entity';
import { CreatePetValidationPipe } from './create-pet-validation-pipe';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreateDogDto } from './dto/create-dog.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExtension,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create pet' })
  @ApiBody({
    schema: {
      oneOf: [{ $ref: getSchemaPath(Cat) }, { $ref: getSchemaPath(Dog) }],
    },
    description: 'Create a pet cat or dog',
  })
  @ApiExtension('x-speakeasy-retries', {
    strategy: 'backoff',
    backoff: {
      initialInterval: 1000,
      maxInterval: 80000,
      maxElapsedTime: 3600000,
      exponent: 1.5,
    },
    statusCodes: ['5XX'],
    retryConnectionErrors: true,
  })
  @ApiOkResponse({
    schema: {
      oneOf: [{ $ref: getSchemaPath(Cat) }, { $ref: getSchemaPath(Dog) }],
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(CreatePetValidationPipe)
  async create(@Body() dto: CreateCatDto | CreateDogDto): Promise<Cat | Dog> {
    return this.petsService.create(dto);
  }

  @Get('cats/:id')
  @ApiTags('cats')
  @ApiOperation({ summary: 'Get cat' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findOneCat(@Param('id') id: string): Cat {
    return this.petsService.findOneCat(+id);
  }

  @Get('dogs/:id')
  @ApiTags('dogs')
  @ApiOperation({ summary: 'Get dog' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Dog,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findOneDog(@Param('id') id: string): Dog {
    return this.petsService.findOneDog(+id);
  }
}
