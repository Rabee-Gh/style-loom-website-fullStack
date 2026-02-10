interface CategoriesBarProps {
  categories: string[];
  speed?: number;
}

export default function CategoriesBarSection({
  categories,
  speed = 25,
}: CategoriesBarProps) {
  return (
    <div className="relative overflow-hidden custom-dashed-t custom-dashed-b border-dark-15">
      <div
        className="flex py-[30px] lg:py-10 2xl:py-[50px] w-max animate-scroll"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {[...categories, ...categories].map((cat, index) => (
          <div
            key={index}
            className="flex items-center text-[20px] 2xl:text-3xl text-gray-40"
          >
            <span>{cat}</span>
            <img
              src="/assets/icons/abstract-design/abstract-design-6.svg"
              alt="abstract design"
              className="w-10 lg:w-[50px] 2xl:w-[60px] mx-3 2xl:mx-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
