export interface Order {
    _id: string;
    phone: string;
    products: Array<{
      productId: string;
      quantity: number;
      name?: string; // Optional: Include product details if populated in the frontend
      price?: number; // Optional: For frontend purposes
    }>;
    totalPrice: number;
    shippingDetails: {
      address: string;
    };
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: string; // ISO string format for date
  }
  