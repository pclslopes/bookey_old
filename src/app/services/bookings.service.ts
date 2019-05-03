import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BookingModel } from '../models/booking.model';

@Injectable()
export class BookingsService {

  constructor(private firestore: AngularFirestore) { }

  getBookings() {
      return this.firestore.collection('bookings').snapshotChanges();
  }

  createBooking(booking: BookingModel){
    return this.firestore.collection('bookings').add(booking);
  }

  updateBooking(booking: BookingModel){
    delete booking.id;
    this.firestore.doc('bookings/' + booking.id).update(booking);
  }

  deleteBooking(bookingId: string){
    this.firestore.doc('bookings/' + bookingId).delete();
  }
}