
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Booking, BookingFormData } from '@/types/booking';

interface BookingEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingBooking: Booking | null;
  form: UseFormReturn<BookingFormData>;
  onSubmit: (data: BookingFormData) => void;
  isRTL: boolean;
}

const BookingEditDialog: React.FC<BookingEditDialogProps> = ({
  isOpen,
  onOpenChange,
  editingBooking,
  form,
  onSubmit,
  isRTL,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isRTL ? 'تعديل تفاصيل الحجز' : 'Edit Booking Details'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isRTL ? 'اسم العميل' : 'Customer Name'}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isRTL ? 'تاريخ الحجز' : 'Booking Date'}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {editingBooking?.type === 'flight' && (isRTL ? 'سعر الطيران' : 'Flight Price')}
                    {editingBooking?.type === 'limousine' && (isRTL ? 'سعر الليموزين' : 'Limousine Price')}
                    {editingBooking?.type === 'hotel' && (isRTL ? 'سعر الفندق' : 'Hotel Price')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {editingBooking?.type === 'flight' && (
              <>
                <FormField
                  control={form.control}
                  name="flightCosts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isRTL ? 'تكاليف الطيران' : 'Flight Costs'}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {editingBooking?.linkedBooking && (
                  <FormField
                    control={form.control}
                    name="hotelAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isRTL ? 'سعر الفندق المرتبط' : 'Linked Hotel Price'}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button type="submit">
                {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingEditDialog;
