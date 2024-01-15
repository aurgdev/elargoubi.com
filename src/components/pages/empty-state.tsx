import Image from "next/image";

type stateType = {
  value: string;
  icon?: React.ReactNode;
};

export default function EmptyState({ value, icon }: stateType) {
  return (
    <div className="w-full flex flex-col items-center text-center bg-secondary border rounded-lg px-6 py-8">
      <div className="mb-6 text-4xl">
        {icon || (
          <Image
            width={100}
            height={100}
            src={"/where-you.gif"}
            alt="where ?"
          />
        )}
      </div>
      <h3 className="font-bold tracking-tight text-xl mb-3">
        No {value} Found
      </h3>
      <p className="text-sm opacity-70 mb-6 ml-4 max-w-xs">
        There are no {value.toLowerCase()} available at this time. Check back
        again.
      </p>
    </div>
  );
}
