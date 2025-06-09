
import * as z from 'zod';

export const bookingFormSchema = z.object({
  customer: z.string().min(1, 'Customer name is required'),
  date: z.string().min(1, 'Date is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  flightCosts: z.number().min(0, 'Flight costs must be positive').optional(),
  hotelAmount: z.number().min(0, 'Hotel amount must be positive').optional(),
});
