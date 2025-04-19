import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../types/user.types';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: User,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(createTransactionDto, user.id);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  findAndPaginate(
    @CurrentUser() user: User,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.transactionService.findAllPaginated(user.id, paginationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.transactionService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.transactionService.findOne(+id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
