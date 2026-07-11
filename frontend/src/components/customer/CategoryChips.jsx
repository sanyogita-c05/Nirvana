function CategoryChips({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="category-chips">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${
            activeCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;