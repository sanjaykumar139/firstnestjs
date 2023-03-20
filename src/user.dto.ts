import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  email: string;
  id: number;
  first_name: string;
}

export class Campaign {
  campaignNo: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
}

export class PotentialEarningDto {
  @ApiProperty()
  mobileNo: string;

  @ApiProperty()
  businessType: string;

  @ApiProperty()
  businessSubType: string;

  @ApiProperty()
  loyaltyType: string;

  @ApiProperty()
  storeCode: string;

  @ApiProperty()
  orderID: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty() grossAmount: number;

  @ApiProperty()
  txnId: string;

  @ApiProperty()
  txnDateTime: string;

  @ApiProperty()
  nonLoyaltyPaymentAmount: number;

  @ApiProperty()
  saleSKUSet: SaleSkuset[];

  @ApiProperty()
  isInternational: boolean;
}

export class SaleSkuset {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  voucherNo: string;
}
