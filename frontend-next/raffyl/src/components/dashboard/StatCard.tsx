interface StatCardProps {
  title: string;
  value: string | number;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#3d4352]">
      <p className="text-white text-base font-medium leading-normal">{title}</p>
      <p className="text-white tracking-light text-2xl font-bold leading-tight">
        {value}
      </p>
    </div>
  );
}