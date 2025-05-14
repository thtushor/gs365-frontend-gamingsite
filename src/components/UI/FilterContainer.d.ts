import { FC } from "react";

interface FilterContainerProps {
  onFilter?: (filters: string[]) => void;
  onSearch?: (searchTerm: string) => void;
}

declare const FilterContainer: FC<FilterContainerProps>;

export default FilterContainer;
