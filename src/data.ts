export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Villa' | 'Penthouse';
  status: 'Buy' | 'Rent';
  image: string;
  featured?: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Sunset Villa',
    price: 1250000,
    location: 'Malibu, CA',
    address: '123 Ocean Drive, Malibu',
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: 'Villa',
    status: 'Buy',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '2',
    title: 'Skyline Penthouse',
    price: 3500000,
    location: 'New York, NY',
    address: '725 5th Ave, Manhattan',
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    type: 'Penthouse',
    status: 'Buy',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '3',
    title: 'Contemporary Family Home',
    price: 850000,
    location: 'Austin, TX',
    address: '456 Oak Lane, Austin',
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: 'House',
    status: 'Buy',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Minimalist Urban Loft',
    price: 2500,
    location: 'Seattle, WA',
    address: '890 Pine St, Seattle',
    beds: 1,
    baths: 1,
    sqft: 950,
    type: 'Apartment',
    status: 'Rent',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Luxury Estate with Pool',
    price: 4200000,
    location: 'Beverly Hills, CA',
    address: '90210 Sunset Blvd',
    beds: 6,
    baths: 5,
    sqft: 5500,
    type: 'Villa',
    status: 'Buy',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '6',
    title: 'Cozy Mountain Cabin',
    price: 1800,
    location: 'Aspen, CO',
    address: '12 Snow Peak Rd',
    beds: 2,
    baths: 1,
    sqft: 1200,
    type: 'House',
    status: 'Rent',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800'
  }
];
