export interface Restaurant {
  id: string;
  name: string;
  categories: string;
  photos: string;
  rating: number;
  price_range: number;
  is_open: boolean;
  address: string;
  reviews: string | string[];
}

export interface MainLayoutProps {
  loading: boolean;
  filtered: Restaurant[];
  visibleCount: number;
  showOpenOnly: boolean;
  selectedPrice: string;
  selectedCategory: string;
  setShowOpenOnly: (v: boolean) => void;
  setSelectedPrice: (v: string) => void;
  setSelectedCategory: (v: string) => void;
  handleClear: () => void;
  handleLoadMore: () => void;
}

export interface RestaurantGridProps {
  restaurants: Restaurant[];
  visibleCount: number;
  handleLoadMore: () => void;
}

export interface RestaurantCardProps {
  restaurant: Restaurant;
}

export interface FilterBarProps {
  showOpenOnly: boolean;
  selectedPrice: string;
  selectedCategory: string;
  setShowOpenOnly: (val: boolean) => void;
  setSelectedPrice: (val: string) => void;
  setSelectedCategory: (val: string) => void;
  handleClear: () => void;
}

export interface RestaurantInfoProps {
  address: string;
  price_range: number;
}

export interface RestaurantHeaderProps {
  name: string;
  categories: string;
  photos: string;
  is_open: boolean;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  text: string;
}