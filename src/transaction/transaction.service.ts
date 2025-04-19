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
      },
    });

    return transactions;
  }

  async findOne(id: number, userId: number) {
    const foundTransaction = await this.transactionRepo.findOne({
      where: {
        id,
        users: { id: userId },
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

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
