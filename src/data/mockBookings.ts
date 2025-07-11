
import { Booking } from '@/types/booking';

export const initialBookings: Booking[] = [
  {
    id: 'BKG001',
    customer: 'Ahmed Zaki',
    type: 'flight',
    date: '2024-03-15',
    amount: 750,
    status: 'confirmed',
    linkedBookingId: 'BKG001H',
    flightCosts: 100,
  },
  {
    id: 'BKG001H',
    customer: 'Ahmed Zaki',
    type: 'hotel',
    date: '2024-03-15',
    amount: 500,
    status: 'confirmed',
    linkedBookingId: 'BKG001',
  },
  {
    id: 'BKG002',
    customer: 'Lama Ahmed',
    type: 'flight',
    date: '2024-03-20',
    amount: 800,
    status: 'pending',
    linkedBookingId: 'BKG002H',
    flightCosts: 120,
  },
  {
    id: 'BKG002H',
    customer: 'Lama Ahmed',
    type: 'hotel',
    date: '2024-03-20',
    amount: 600,
    status: 'pending',
    linkedBookingId: 'BKG002',
  },
  {
    id: 'BKG003',
    customer: 'Youssef Ali',
    type: 'limousine',
    date: '2024-03-25',
    amount: 200,
    status: 'confirmed',
  },
  {
    id: 'BKG004',
    customer: 'Sara Omar',
    type: 'flight',
    date: '2024-03-28',
    amount: 900,
    status: 'cancelled',
    linkedBookingId: 'BKG004H',
    flightCosts: 150,
  },
  {
    id: 'BKG004H',
    customer: 'Sara Omar',
    type: 'hotel',
    date: '2024-03-28',
    amount: 700,
    status: 'cancelled',
    linkedBookingId: 'BKG004',
  },
  {
    id: 'BKG005',
    customer: 'Khaled Tamer',
    type: 'flight',
    date: '2024-04-01',
    amount: 1000,
    status: 'confirmed',
    linkedBookingId: 'BKG005H',
    flightCosts: 200,
  },
  {
    id: 'BKG005H',
    customer: 'Khaled Tamer',
    type: 'hotel',
    date: '2024-04-01',
    amount: 800,
    status: 'confirmed',
    linkedBookingId: 'BKG005',
  },
  {
    id: 'BKG006',
    customer: 'Noha Salem',
    type: 'limousine',
    date: '2024-04-05',
    amount: 250,
    status: 'pending',
  },
  {
    id: 'BKG007',
    customer: 'محمد عبدالله',
    type: 'flight',
    date: '2024-04-10',
    amount: 850,
    status: 'confirmed',
    linkedBookingId: 'BKG007H',
    flightCosts: 130,
  },
  {
    id: 'BKG007H',
    customer: 'محمد عبدالله',
    type: 'hotel',
    date: '2024-04-10',
    amount: 650,
    status: 'confirmed',
    linkedBookingId: 'BKG007',
  },
  {
    id: 'BKG008',
    customer: 'فاطمة أحمد',
    type: 'flight',
    date: '2024-04-12',
    amount: 920,
    status: 'pending',
    linkedBookingId: 'BKG008H',
    flightCosts: 180,
  },
  {
    id: 'BKG008H',
    customer: 'فاطمة أحمد',
    type: 'hotel',
    date: '2024-04-12',
    amount: 720,
    status: 'pending',
    linkedBookingId: 'BKG008',
  },
  {
    id: 'BKG009',
    customer: 'علي حسن',
    type: 'flight',
    date: '2024-04-15',
    amount: 780,
    status: 'confirmed',
    linkedBookingId: 'BKG009H',
    flightCosts: 110,
  },
  {
    id: 'BKG009H',
    customer: 'علي حسن',
    type: 'hotel',
    date: '2024-04-15',
    amount: 580,
    status: 'confirmed',
    linkedBookingId: 'BKG009',
  },
  {
    id: 'BKG010',
    customer: 'مريم خالد',
    type: 'flight',
    date: '2024-04-18',
    amount: 1200,
    status: 'confirmed',
    linkedBookingId: 'BKG010H',
    flightCosts: 250,
  },
  {
    id: 'BKG010H',
    customer: 'مريم خالد',
    type: 'hotel',
    date: '2024-04-18',
    amount: 950,
    status: 'confirmed',
    linkedBookingId: 'BKG010',
  },
  {
    id: 'BKG010L',
    customer: 'مريم خالد',
    type: 'limousine',
    date: '2024-04-18',
    amount: 300,
    status: 'confirmed',
  },
  {
    id: 'BKG011',
    customer: 'أحمد سالم',
    type: 'flight',
    date: '2024-04-20',
    amount: 1100,
    status: 'pending',
    linkedBookingId: 'BKG011H',
    flightCosts: 220,
  },
  {
    id: 'BKG011H',
    customer: 'أحمد سالم',
    type: 'hotel',
    date: '2024-04-20',
    amount: 850,
    status: 'pending',
    linkedBookingId: 'BKG011',
  },
  {
    id: 'BKG011L',
    customer: 'أحمد سالم',
    type: 'limousine',
    date: '2024-04-20',
    amount: 280,
    status: 'pending',
  },
  {
    id: 'BKG012',
    customer: 'ليلى محمود',
    type: 'flight',
    date: '2024-04-22',
    amount: 950,
    status: 'confirmed',
    linkedBookingId: 'BKG012H',
    flightCosts: 170,
  },
  {
    id: 'BKG012H',
    customer: 'ليلى محمود',
    type: 'hotel',
    date: '2024-04-22',
    amount: 750,
    status: 'confirmed',
    linkedBookingId: 'BKG012',
  },
  {
    id: 'BKG012L',
    customer: 'ليلى محمود',
    type: 'limousine',
    date: '2024-04-22',
    amount: 320,
    status: 'confirmed',
  },
  {
    id: 'BKG013',
    customer: 'حسام عادل',
    type: 'flight',
    date: '2024-04-25',
    amount: 880,
    status: 'cancelled',
    linkedBookingId: 'BKG013H',
    flightCosts: 140,
  },
  {
    id: 'BKG013H',
    customer: 'حسام عادل',
    type: 'hotel',
    date: '2024-04-25',
    amount: 680,
    status: 'cancelled',
    linkedBookingId: 'BKG013',
  },
  {
    id: 'BKG014',
    customer: 'رانيا يوسف',
    type: 'flight',
    date: '2024-04-28',
    amount: 1050,
    status: 'confirmed',
    linkedBookingId: 'BKG014H',
    flightCosts: 190,
  },
  {
    id: 'BKG014H',
    customer: 'رانيا يوسف',
    type: 'hotel',
    date: '2024-04-28',
    amount: 820,
    status: 'confirmed',
    linkedBookingId: 'BKG014',
  },
];
