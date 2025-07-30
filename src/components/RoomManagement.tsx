import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building, Bed, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';

interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  type: string;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
}

interface Hotel {
  id: string;
  name: string;
  totalRooms: number;
  availableRooms: number;
}

const RoomManagement = () => {
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [newRoomNumber, setNewRoomNumber] = useState<string>('');
  const [newRoomType, setNewRoomType] = useState<string>('');
  const [newRoomPrice, setNewRoomPrice] = useState<string>('');
  
  // Mock hotels data
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: '1', name: 'فندق النيل الأزرق', totalRooms: 50, availableRooms: 35 },
    { id: '2', name: 'فندق الهرم الذهبي', totalRooms: 30, availableRooms: 20 },
    { id: '3', name: 'فندق البحر الأحمر', totalRooms: 40, availableRooms: 25 },
    { id: '4', name: 'فندق الأقصر الفاخر', totalRooms: 60, availableRooms: 45 }
  ]);

  // Mock rooms data
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', hotelId: '1', roomNumber: '101', type: 'single', price: 150, status: 'available' },
    { id: '2', hotelId: '1', roomNumber: '102', type: 'double', price: 250, status: 'occupied' },
    { id: '3', hotelId: '1', roomNumber: '103', type: 'suite', price: 400, status: 'available' },
    { id: '4', hotelId: '2', roomNumber: '201', type: 'single', price: 180, status: 'maintenance' },
    { id: '5', hotelId: '2', roomNumber: '202', type: 'double', price: 280, status: 'available' }
  ]);

  const roomTypes = [
    { value: 'single', label: 'فردية' },
    { value: 'double', label: 'مزدوجة' },
    { value: 'suite', label: 'جناح' },
    { value: 'family', label: 'عائلية' }
  ];

  const statusOptions = [
    { value: 'available', label: 'متاحة', color: 'default' },
    { value: 'occupied', label: 'محجوزة', color: 'destructive' },
    { value: 'maintenance', label: 'صيانة', color: 'secondary' }
  ];

  const getFilteredRooms = () => {
    if (!selectedHotel) return [];
    return rooms.filter(room => room.hotelId === selectedHotel);
  };

  const getSelectedHotel = () => {
    return hotels.find(hotel => hotel.id === selectedHotel);
  };

  const handleAddRoom = () => {
    if (!selectedHotel || !newRoomNumber || !newRoomType || !newRoomPrice) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      hotelId: selectedHotel,
      roomNumber: newRoomNumber,
      type: newRoomType,
      price: parseFloat(newRoomPrice),
      status: 'available'
    };

    setRooms([...rooms, newRoom]);
    
    // Update hotel room count
    setHotels(hotels.map(hotel => 
      hotel.id === selectedHotel 
        ? { ...hotel, totalRooms: hotel.totalRooms + 1, availableRooms: hotel.availableRooms + 1 }
        : hotel
    ));

    // Reset form
    setNewRoomNumber('');
    setNewRoomType('');
    setNewRoomPrice('');
    
    alert('تم إضافة الغرفة بنجاح');
  };

  const handleDeleteRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    setRooms(rooms.filter(r => r.id !== roomId));
    
    // Update hotel room count
    setHotels(hotels.map(hotel => 
      hotel.id === room.hotelId 
        ? { 
            ...hotel, 
            totalRooms: hotel.totalRooms - 1,
            availableRooms: room.status === 'available' ? hotel.availableRooms - 1 : hotel.availableRooms
          }
        : hotel
    ));
    
    alert('تم حذف الغرفة بنجاح');
  };

  const handleUpdateRoomStatus = (roomId: string, newStatus: string) => {
    const oldRoom = rooms.find(r => r.id === roomId);
    if (!oldRoom) return;

    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus as any } : room
    ));

    // Update available rooms count
    setHotels(hotels.map(hotel => {
      if (hotel.id === oldRoom.hotelId) {
        let availableChange = 0;
        if (oldRoom.status === 'available' && newStatus !== 'available') {
          availableChange = -1;
        } else if (oldRoom.status !== 'available' && newStatus === 'available') {
          availableChange = 1;
        }
        return { ...hotel, availableRooms: hotel.availableRooms + availableChange };
      }
      return hotel;
    }));
  };

  const getRoomTypeLabel = (type: string) => {
    const roomType = roomTypes.find(rt => rt.value === type);
    return roomType ? roomType.label : type;
  };

  const getStatusBadgeVariant = (status: string) => {
    const statusOption = statusOptions.find(so => so.value === status);
    return statusOption ? statusOption.color as any : 'default';
  };

  const getStatusLabel = (status: string) => {
    const statusOption = statusOptions.find(so => so.value === status);
    return statusOption ? statusOption.label : status;
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center space-x-2 space-x-reverse">
        <Building className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">إدارة الغرف والأسعار</h1>
      </div>

      {/* Hotel Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            اختيار الفندق
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>اختر الفندق</Label>
              <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر فندق للإدارة" />
                </SelectTrigger>
                <SelectContent>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.id} value={hotel.id}>
                      {hotel.name} ({hotel.availableRooms}/{hotel.totalRooms} غرفة متاحة)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedHotel && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{getSelectedHotel()?.totalRooms}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الغرف</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{getSelectedHotel()?.availableRooms}</div>
                  <div className="text-sm text-muted-foreground">غرف متاحة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {(getSelectedHotel()?.totalRooms || 0) - (getSelectedHotel()?.availableRooms || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">غرف محجوزة</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedHotel && (
        <>
          {/* Add New Room */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                إضافة غرفة جديدة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>رقم الغرفة</Label>
                  <Input
                    value={newRoomNumber}
                    onChange={(e) => setNewRoomNumber(e.target.value)}
                    placeholder="مثال: 301"
                  />
                </div>
                <div className="space-y-2">
                  <Label>نوع الغرفة</Label>
                  <Select value={newRoomType} onValueChange={setNewRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>السعر (دولار)</Label>
                  <Input
                    type="number"
                    value={newRoomPrice}
                    onChange={(e) => setNewRoomPrice(e.target.value)}
                    placeholder="مثال: 200"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddRoom} className="w-full">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة غرفة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rooms List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                قائمة الغرف - {getSelectedHotel()?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredRooms().map((room) => (
                  <div key={room.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-semibold">غرفة رقم {room.roomNumber}</div>
                        <Badge variant="outline">{getRoomTypeLabel(room.type)}</Badge>
                        <Badge variant={getStatusBadgeVariant(room.status)}>
                          {getStatusLabel(room.status)}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">${room.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select 
                          value={room.status} 
                          onValueChange={(value) => handleUpdateRoomStatus(room.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {getFilteredRooms().length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    لا توجد غرف في هذا الفندق بعد
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RoomManagement;