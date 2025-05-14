import { FC } from "react";

interface HeroFilterBarProps {
  onFilter?: (filters: string[]) => void;
}

declare const HeroFilterBar: FC<HeroFilterBarProps>;

export default HeroFilterBar;
