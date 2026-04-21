import Link from 'next/link';

interface CategoryNavProps {
  categories: Array<{ id: string; slug: string; name: string }>;
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 pb-1 sm:flex-wrap">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop/${category.slug}`}
            className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
