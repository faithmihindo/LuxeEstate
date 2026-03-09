import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Heart, 
  Filter, 
  ChevronRight,
  Home,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { PROPERTIES, Property } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Home' | 'For Buy' | 'For Rent' | 'About Us'>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || p.type === selectedType;
      
      let matchesTab = true;
      if (activeTab === 'For Buy') matchesTab = p.status === 'Buy';
      if (activeTab === 'For Rent') matchesTab = p.status === 'Rent';
      
      return matchesSearch && matchesType && matchesTab;
    });
  }, [searchQuery, selectedType, activeTab]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const propertyTypes = ['All', 'House', 'Apartment', 'Villa', 'Penthouse'];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const tabs: ('Home' | 'For Buy' | 'For Rent' | 'About Us')[] = ['Home', 'For Buy', 'For Rent', 'About Us'];
    
    return (
      <>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (mobile) setIsMenuOpen(false);
            }}
            className={`${
              mobile 
                ? 'block w-full text-left text-lg font-medium py-2' 
                : 'text-sm font-medium transition-colors'
            } ${
              activeTab === tab 
                ? 'text-emerald-600' 
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveTab('Home')}
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Home size={24} />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">LuxeEstate</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLinks />
              <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all">
                Sign In
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <NavLinks mobile />
                <button className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-xl">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {activeTab === 'About Us' ? (
          <AboutUsSection />
        ) : (
          <>
            {/* Hero Section - Only show on Home */}
            {activeTab === 'Home' && (
              <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920" 
                    alt="Luxury Home"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl text-white font-serif font-bold mb-6 leading-tight"
                  >
                    Find Your Dream <br /> <span className="italic text-emerald-400">Sanctuary</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-white/90 mb-10 max-w-2xl mx-auto"
                  >
                    Discover the most exclusive properties in the world's most desirable locations. 
                    Luxury living, redefined for you.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2"
                  >
                    <div className="flex-grow flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
                      <Search className="text-slate-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search by city, neighborhood, or ZIP..."
                        className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center px-4 gap-3 py-3 md:py-0">
                      <Filter className="text-slate-400" size={20} />
                      <select 
                        className="bg-transparent outline-none text-slate-700 cursor-pointer"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                      Search Properties
                    </button>
                  </motion.div>
                </div>
              </section>
            )}

            {/* Properties Section */}
            <section className={`py-24 bg-white ${activeTab !== 'Home' ? 'pt-32' : ''}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
                      {activeTab === 'Home' ? 'Featured Properties' : 
                       activeTab === 'For Buy' ? 'Properties For Sale' : 'Properties For Rent'}
                    </h2>
                    <p className="text-slate-500 max-w-xl">
                      {activeTab === 'Home' 
                        ? 'Hand-picked luxury residences that represent the pinnacle of modern architecture and design.'
                        : `Explore our exclusive collection of properties available ${activeTab === 'For Buy' ? 'for purchase' : 'for rent'}.`}
                    </p>
                  </div>
                  
                  {activeTab !== 'Home' && (
                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                      <div className="bg-slate-50 p-2 rounded-xl flex items-center px-4 gap-3 border border-slate-200">
                        <Search className="text-slate-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search..."
                          className="bg-transparent outline-none text-slate-700 text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl flex items-center px-4 gap-3 border border-slate-200">
                        <Filter className="text-slate-400" size={18} />
                        <select 
                          className="bg-transparent outline-none text-slate-700 text-sm cursor-pointer"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Home' && (
                    <button 
                      onClick={() => setActiveTab('For Buy')}
                      className="hidden md:flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all"
                    >
                      View All Properties <ChevronRight size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property, index) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      index={index}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={() => toggleFavorite(property.id)}
                    />
                  ))}
                </div>

                {filteredProperties.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                      <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
                      className="mt-6 text-emerald-600 font-medium hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Stats Section - Only show on Home */}
            {activeTab === 'Home' && (
              <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                      <div className="text-4xl md:text-5xl font-serif font-bold mb-2">12k+</div>
                      <div className="text-slate-400 text-sm uppercase tracking-widest">Properties Sold</div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-serif font-bold mb-2">98%</div>
                      <div className="text-slate-400 text-sm uppercase tracking-widest">Happy Clients</div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-serif font-bold mb-2">150+</div>
                      <div className="text-slate-400 text-sm uppercase tracking-widest">Expert Agents</div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-serif font-bold mb-2">25</div>
                      <div className="text-slate-400 text-sm uppercase tracking-widest">Years Experience</div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Newsletter - Only show on Home */}
            {activeTab === 'Home' && (
              <section className="py-24 bg-emerald-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Stay Ahead of the Market</h2>
                  <p className="text-slate-600 mb-10 text-lg">
                    Subscribe to our newsletter and be the first to know about new luxury listings 
                    and exclusive market insights.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      className="flex-grow px-6 py-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                    <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                  <Home size={18} />
                </div>
                <span className="text-xl font-serif font-bold tracking-tight">LuxeEstate</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Elevating the real estate experience through exceptional service, 
                unparalleled expertise, and a commitment to finding the perfect home for every client.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Buy Properties</a></li>
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Rent Properties</a></li>
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Sell Your Home</a></li>
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Find an Agent</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-500 text-sm">
                  <MapPin size={18} className="text-emerald-600" />
                  123 Luxury Way, Beverly Hills, CA
                </li>
                <li className="flex items-center gap-3 text-slate-500 text-sm">
                  <Phone size={18} className="text-emerald-600" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3 text-slate-500 text-sm">
                  <Mail size={18} className="text-emerald-600" />
                  contact@luxeestate.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs">
              © 2024 LuxeEstate Real Estate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AboutUsSection() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
              alt="Our Office" 
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-600 rounded-3xl flex items-center justify-center text-white p-6 shadow-xl hidden md:flex">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">25+</div>
                <div className="text-xs uppercase tracking-widest font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              We Help You Find Your <br /> <span className="italic text-emerald-600">Perfect Place</span>
            </h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              At LuxeEstate, we believe that a home is more than just a physical space—it's a sanctuary where memories are made and futures are built. 
            </p>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Founded in 1999, our agency has grown from a small boutique firm to a global leader in luxury real estate. Our mission is to provide an unparalleled level of service, combining deep market knowledge with a personalized approach that puts our clients' needs first.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Home size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Exclusive Listings</h4>
                  <p className="text-slate-500 text-sm">Access to properties not found anywhere else.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">24/7 Support</h4>
                  <p className="text-slate-500 text-sm">Our dedicated team is always here to help you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to start your journey?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            Whether you're looking to buy your first home or invest in a luxury estate, 
            our team of experts is ready to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
              Contact an Agent
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-medium hover:bg-white/20 transition-colors">
              Explore Properties
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface PropertyCardProps {
  property: Property;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  index, 
  isFavorite, 
  onToggleFavorite 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
              Featured
            </span>
          )}
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
            {property.type}
          </span>
        </div>
        <button 
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-rose-500 hover:text-white'
          }`}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
          <div className="text-xl font-serif font-bold text-emerald-600">
            ${property.price.toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-slate-400 text-sm mb-6">
          <MapPin size={14} />
          {property.address}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <BedDouble size={16} className="text-emerald-600" />
              {property.beds}
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Beds</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Bath size={16} className="text-emerald-600" />
              {property.baths}
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Baths</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Maximize size={16} className="text-emerald-600" />
              {property.sqft}
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
