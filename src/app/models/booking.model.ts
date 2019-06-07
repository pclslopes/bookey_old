export interface BookingModel {
    id: string;
    property: string;
    checkInDate: Date;
    checkOutDate: Date;
    checkInTime: string;
    customer: string;
    propertyId: string;
}