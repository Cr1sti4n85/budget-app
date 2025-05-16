import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';
import { instanceToPlain } from 'class-transformer';
import { PaginationDto } from '../common/dto/pagination.dto';
import { TransactionsByDate } from '../types/transaction.types';

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

  async findWeeklyTransactions(userId: number) {
    const currentDay = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDay.getDate() - 7);

    const transactions = await this.transactionRepo.find({
      where: {
        users: { id: userId },
        createdAt: Between(sevenDaysAgo, currentDay),
      },
    });

    // Count transactions by date
    const transactionsByDate: TransactionsByDate = transactions.reduce(
      (accum, transaction) => {
        const date = transaction.createdAt.toDateString().split('T')[0];

        if (!accum[date]) {
          // initialize date
          accum[date] = {
            date,
            total: 0,
            ganancias: 0,
            gastos: 0,
          };
        }

        accum[date].total++;

        // Increment counter by type
        if (transaction.type === 'ganancias') {
          accum[date].ganancias++;
        } else if (transaction.type === 'gastos') {
          accum[date].gastos++;
        }

        return accum;
      },
      {} as TransactionsByDate,
    );

    const daysArray = Object.values(transactionsByDate);

    daysArray.sort((a, b) => b.total - a.total);

    // first element is the one with more transactions
    const dayWithMostTransactions = daysArray[0];

    //filter the max income amount
    const maxIncome = transactions
      .filter((t) => t.type === 'ganancias')
      .sort((a, b) => {
        return b.amount - a.amount;
      })[0];

    //filter the max expense amount
    const maxExpense = transactions
      .filter((t) => t.type === 'gastos')
      .sort((a, b) => {
        return b.amount - a.amount;
      })[0];

    return {
      maxIncome,
      maxExpense,
      dayWithMostTransactions,
    };
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
