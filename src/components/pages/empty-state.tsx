import Image from "next/image";

type stateType = {
  value: string;
  icon?: React.ReactNode;
};

export default function EmptyState({ value, icon }: stateType) {
  return (
    <div className="w-full flex flex-col items-center text-center dark:bg-primary-bg bg-zinc-100 border border-dashed dark:border-zinc-700 border-zinc-200 rounded-md px-6 py-8">
      <div className="mb-6 text-4xl text-zinc-500">
        {icon || (
          <Image
            width={80}
            height={80}
            src={"/searching-duck.gif"}
            alt="Yellow duck searching"
          />
        )}
      </div>
      <h3 className="   font-bold tracking-tight text-xl mb-3">
        No {value} Found
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 ml-4 max-w-xs">
        There are no {value.toLowerCase()} available at this time. Check back
        again.
      </p>
    </div>
  );
}
