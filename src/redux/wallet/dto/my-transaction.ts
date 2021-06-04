import { IsEnum, IsOptional } from 'class-validator';
import {
  TransactionType,
  TransactionStatus,
} from '../../../models/transaction';
import { Currency } from '../../../models/balance';

export class MyTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  public type?: string;

  @IsEnum(TransactionStatus)
  @IsOptional()
  public status?: string;

  @IsEnum(Currency)
  @IsOptional()
  public currency?: string;
}
