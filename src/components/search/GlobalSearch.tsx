import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'booking' | 'hotel' | 'limousine' | 'flight';
  data: any;
}

interface GlobalSearchProps {
  bookings?: any[];
  hotels?: any[];
  limousines?: any[];
  flights?: any[];
  onResultClick?: (result: SearchResult) => void;
  className?: string;
  isLoading?: boolean;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  bookings = [],
  hotels = [],
  limousines = [],
  flights = [],
  onResultClick,
  className = "",
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = document.dir === 'rtl';

  const allResults = useMemo((): SearchResult[] => {
    if (!searchTerm.trim()) return [];

    const results: SearchResult[] = [];
    const lowercaseSearch = searchTerm.toLowerCase();

    // Search in bookings
    bookings.forEach(booking => {
      if (
        booking.customer?.toLowerCase().includes(lowercaseSearch) ||
        booking.id?.toLowerCase().includes(lowercaseSearch)
      ) {
        results.push({
          id: `booking-${booking.id}`,
          title: `حجز #${booking.id}`,
          subtitle: `${booking.customer} - ${booking.type}`,
          type: 'booking',
          data: booking
        });
      }
    });

    // Search in hotels
    hotels.forEach(hotel => {
      if (
        hotel.name?.toLowerCase().includes(lowercaseSearch) ||
        hotel.location?.toLowerCase().includes(lowercaseSearch)
      ) {
        results.push({
          id: `hotel-${hotel.id}`,
          title: hotel.name,
          subtitle: hotel.location,
          type: 'hotel',
          data: hotel
        });
      }
    });

    // Search in limousines
    limousines.forEach(limo => {
      if (
        limo.carType?.toLowerCase().includes(lowercaseSearch) ||
        limo.driverName?.toLowerCase().includes(lowercaseSearch) ||
        limo.route?.toLowerCase().includes(lowercaseSearch)
      ) {
        results.push({
          id: `limousine-${limo.id}`,
          title: limo.carType,
          subtitle: `السائق: ${limo.driverName} - ${limo.route}`,
          type: 'limousine',
          data: limo
        });
      }
    });

    // Search in flights
    flights.forEach(flight => {
      if (
        flight.airline?.toLowerCase().includes(lowercaseSearch) ||
        flight.flightNumber?.toLowerCase().includes(lowercaseSearch) ||
        flight.route?.toLowerCase().includes(lowercaseSearch)
      ) {
        results.push({
          id: `flight-${flight.id}`,
          title: `${flight.airline} ${flight.flightNumber}`,
          subtitle: flight.route,
          type: 'flight',
          data: flight
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [searchTerm, bookings, hotels, limousines, flights]);

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'booking': return 'حجز';
      case 'hotel': return 'فندق';
      case 'limousine': return 'ليموزين';
      case 'flight': return 'رحلة';
      default: return '';
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'booking': return 'bg-blue-100 text-blue-800';
      case 'hotel': return 'bg-green-100 text-green-800';
      case 'limousine': return 'bg-purple-100 text-purple-800';
      case 'flight': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
        <Input
          type="text"
          placeholder="البحث في جميع البيانات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            className={`absolute top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${isRTL ? 'left-2' : 'right-2'}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && searchTerm && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg border animate-fade-in">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">جاري البحث...</p>
              </div>
            ) : allResults.length > 0 ? (
              <div className="divide-y max-h-80 overflow-y-auto">
                <div className="p-2 bg-muted/50 text-xs text-muted-foreground text-center">
                  تم العثور على {allResults.length} نتيجة
                </div>
                {allResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`p-3 hover:bg-muted cursor-pointer transition-all duration-200 hover:scale-[1.02] group ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex-1">
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2 mb-1`}>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{result.title}</h4>
                          <Badge variant="secondary" className={`text-xs transition-colors ${getTypeColor(result.type)}`}>
                            {getTypeLabel(result.type)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">{result.subtitle}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-xs text-primary">انقر للعرض</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <h3 className="font-medium mb-1">لا توجد نتائج</h3>
                <p className="text-sm">لم نتمكن من العثور على نتائج للبحث "{searchTerm}"</p>
                <p className="text-xs mt-2 text-muted-foreground/60">جرب كلمات مختلفة أو تأكد من الإملاء</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Backdrop to close search */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default GlobalSearch;