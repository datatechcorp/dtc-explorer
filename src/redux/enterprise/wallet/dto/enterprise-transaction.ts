import { IsEnum, IsOptional } from 'class-validator';
import {
  TransactionType,
  TransactionStatus,
  TransactionSubType,
} from '../../../../models/transaction';
import { Currency } from '../../../../models/balance';

export class EnterpriseTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  public type?: string;

  @IsEnum(TransactionSubType)
  @IsOptional()
  public sub_type?: TransactionSubType;

  @IsEnum(TransactionStatus)
  @IsOptional()
  public status?: string;

  @IsEnum(Currency)
  @IsOptional()
  public currency?: string;
}
