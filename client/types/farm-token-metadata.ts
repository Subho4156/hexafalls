export type FarmTokenMetadata = {
  created: number | undefined;
  category: string | undefined;
  description: string | undefined;
  identifier: string | undefined;
  expectedReturnAmount: string | undefined;
  expectedReturnPeriod: string | undefined;
  records: { date: number; value: string }[] | undefined;
  passportUri: string;
};
