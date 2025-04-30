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
import { PaginationDto } from '../common/dto/pagination.dto';
import { OwnerGuard } from '../common/guards/owner.guard';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.transactionService.findAll(user.id);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  findAndPaginate(
    @CurrentUser() user: User,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.transactionService.findAllPaginated(user.id, paginationDto);
  }

  @Get('type/:type')
  @UseGuards(JwtAuthGuard)
  findByType(@CurrentUser() user: User, @Param('type') type: string) {
    return this.transactionService.findByType(user.id, type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
