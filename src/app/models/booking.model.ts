export interface BookingModel {
    id: string;
    propertyId: string;
    propertyName: string;
    checkinDate: Date;
    checkoutDate: Date;
    customerId: string;
    customerName: string;
}