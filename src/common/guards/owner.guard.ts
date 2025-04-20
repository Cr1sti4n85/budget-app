import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { CategoryService } from '../../category/category.service';
import { TransactionService } from '../../transaction/transaction.service';
import { Category } from '../../category/entities/category.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { User } from '../../types/user.types';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly transactionService: TransactionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const { id } = request.params;
    let entity: Partial<Category | Transaction> = {};

    if (request.url.includes('category')) {
      entity = await this.categoryService.findOne(+id);
    } else if (request.url.includes('transaction')) {
      entity = await this.transactionService.findOne(+id);
    }

    if (entity && user && entity.users?.id === user.id) {
      return true;
    }
    throw new ForbiddenException(
      'No estás autorizado para acceder a este recurso',
    );
  }
}
