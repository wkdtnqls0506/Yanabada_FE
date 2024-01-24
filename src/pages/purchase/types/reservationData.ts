interface ReservationData {
  productId: number;
  reservationPersonName: string;
  reservationPersonPhoneNumber: string;
  userPersonName: string | null;
  userPersonPhoneNumber: string | null;
  point: number;
  paymentType: string;
  simplePassword?: string;
}

export default ReservationData;
