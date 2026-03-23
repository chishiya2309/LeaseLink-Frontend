interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-orange-400 rounded-lg" />
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
        <p className="text-sm text-gray-400">
          {description || "Trang này đang được phát triển."}
        </p>
      </div>
    </div>
  );
}
