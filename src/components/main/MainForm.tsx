import FilterBar from "@/components/FilterBar";
import Loading from "@/components/Loading";
import RestaurantGrid from "@/components/RestaurantGrid";
import type { 
    MainLayoutProps 
} from "@/types/main";
// import { Restaurant } from "@/types/restaurant";

export default function MainForm({
  loading,
  filtered,
  visibleCount,
  showOpenOnly,
  selectedPrice,
  selectedCategory,
  setShowOpenOnly,
  setSelectedPrice,
  setSelectedCategory,
  handleClear,
  handleLoadMore,
}: MainLayoutProps) {
  return (
    <div className="px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Restaurants</h1>
        <p className="text-gray-500 mt-2">
          Temukan berbagai restoran lezat di sekitar Anda 🍽️
        </p>
      </div>

      <FilterBar
        showOpenOnly={showOpenOnly}
        selectedPrice={selectedPrice}
        selectedCategory={selectedCategory}
        setShowOpenOnly={setShowOpenOnly}
        setSelectedPrice={setSelectedPrice}
        setSelectedCategory={setSelectedCategory}
        handleClear={handleClear}
      />

      {loading ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No restaurants found.</p>
      ) : (
        <RestaurantGrid
          restaurants={filtered}
          visibleCount={visibleCount}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
