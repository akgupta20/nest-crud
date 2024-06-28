import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRouteDto } from './dto/user-route.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UserRouteDto): any {
    const { id } = params;
    return this.usersService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param() params: UserRouteDto,
    @Body() updateUserDto: UpdateUserDto,
  ): any {
    const { id } = params;
    // console.log(updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: UserRouteDto): any {
    const { id } = params;
    return this.usersService.remove(Number(id));
  }
}
