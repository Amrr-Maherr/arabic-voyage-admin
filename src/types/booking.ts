
export interface Booking {
  id: string;
  customer: string;
  type: 'flight' | 'hotel' | 'limousine';
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  isPackage?: boolean;
  packagePrice?: number;
  linkedBookingId?: string;
  linkedBooking?: Booking;
  flightCosts?: number;
}

export type BookingFormData = {
  customer: string;
  date: string;
  amount: number;
  flightCosts?: number;
  hotelAmount?: number;
};
