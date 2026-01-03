const GameSkeleton = ({ variant = "content" }) => {
  const parentBg =
    variant === "parent" ? "bg-yellow-800" : "bg-slate-800";

  const contentBg =
    variant === "parent" ? "bg-slate-800" : "bg-black";

  return (
    <div>
      <div
        className={`space-y-[17px] rounded-lg sm:rounded-2xl bg-[#293e3e] p-2 py-[10px] sm:p-[13px] w-full h-full object-cover min-h-[140px] max-h-[140px] md:w-[140px] md:min-h-[185px]`}
      >
        <div
          className={`h-8 sm:h-[70px] rounded-lg bg-slate-900 animate-pulse`}
        />

        <div className="space-y-2">
          <div className={`h-3 rounded-lg bg-slate-900 animate-pulse`} />
          <div className={`h-3 rounded-lg bg-slate-900 animate-pulse`} />
          <div className={`h-3 rounded-lg bg-slate-900 animate-pulse`} />
          <div className={`h-3 rounded-lg bg-slate-900 animate-pulse`} />
        </div>
      </div>
    </div>
  );
};

export default GameSkeleton;
