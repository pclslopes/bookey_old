export interface BookingModel {
    id: string;
    property: {
      id: string,
      name: string
    };
    checkInDate: Date;
    checkOutDate: Date;
    checkInTime: string;
    customer: string;
    propertyId: string;
}