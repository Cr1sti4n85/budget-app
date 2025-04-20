import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';
import { instanceToPlain } from 'class-transformer';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const transaction = this.transactionRepo.create({
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      users: { id: userId },
      category: { id: +createTransactionDto.category },
    });

    if (!transaction)
      throw new BadRequestException('Hubo un problema, inténtalo más tarde.');

    return await this.transactionRepo.save(transaction);
  }

  async findAll(id: number) {
    const transactions: Transaction[] = await this.transactionRepo.find({
      where: { users: { id } },
      order: { createdAt: 'DESC' },
      relations: {
        category: true,
        users: true,
      },
    });

    return transactions;
  }

  async findAllPaginated(userId: number, paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const transactions = await this.transactionRepo.find({
      where: { users: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: {
        category: true,
        users: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return instanceToPlain(transactions);
  }

  async findByType(userId: number, type: string) {
    const transactions = await this.transactionRepo.find({
      where: { users: { id: userId }, type },
      order: { createdAt: 'DESC' },
      relations: {
        category: true,
        users: true,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new NotFoundException(
        'No se encontraron transacciones de este tipo.',
      );
    }

    const total = transactions.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0,
    );
    return total;
  }

  async findOne(id: number) {
    const foundTransaction = await this.transactionRepo.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
        users: true,
      },
    });

    if (!foundTransaction) {
      throw new NotFoundException('No se encontró la transacción');
    }
    return instanceToPlain(foundTransaction);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const foundTransaction = await this.transactionRepo.findOne({
      where: { id },
    });

    if (!foundTransaction) {
      throw new NotFoundException('No se encontró esta transacción.');
    }
    const updatedTransaction = Object.assign(foundTransaction, {
      ...updateTransactionDto,
    });
    return await this.transactionRepo.save(updatedTransaction);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException('User not found');
    }

    return this.transactionRepo.remove(transaction);
  }
}
