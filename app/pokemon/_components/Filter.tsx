"use client";

import Select from "react-select";
import { useRouter } from "next/navigation";

interface Option {
  value: string;
  label: string;
}

interface Props {
  types: any[];
  abilities: any[];
  selectedType: string;
  selectedAbility: string;
}

export const Filter = ({
  types,
  abilities,
  selectedType,
  selectedAbility,
}: Props) => {
  const router = useRouter();

  // Convert types and abilities to options format for react-select
  const typeOptions: Option[] = types.map((type: any) => ({
    value: type.name,
    label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
  }));

  const abilityOptions: Option[] = abilities.map((ability: any) => ({
    value: ability.name,
    label: ability.name.charAt(0).toUpperCase() + ability.name.slice(1),
  }));

  // Handler for type change
  const handleTypeChange = (selectedOption: Option | null) => {
    const typeValue = selectedOption ? selectedOption.value : "";
    router.push(`/pokemon?type=${typeValue}&ability=${selectedAbility}`);
  };

  // Handler for ability change
  const handleAbilityChange = (selectedOption: Option | null) => {
    const abilityValue = selectedOption ? selectedOption.value : "";
    router.push(`/pokemon?type=${selectedType}&ability=${abilityValue}`);
  };

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div className="w-full">
        <label
          htmlFor="type-filter"
          id="type-filters"
          className="block text-sm font-medium"
        >
          Select Pokemon Type
        </label>
        <Select
          key="select-instanc-1"
          instanceId="select-instanc-1"
          id="type-filter"
          options={typeOptions}
          value={typeOptions.find((option) => option.value === selectedType)}
          onChange={handleTypeChange}
          className="mt-1"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="ability-filter"
          id="ability-filters"
          className="block text-sm font-medium"
        >
          Select Pokemon Ability
        </label>
        <Select
          key="select-instanc-2"
          instanceId="select-instanc-2"
          id="ability-filter"
          options={abilityOptions}
          value={abilityOptions.find(
            (option) => option.value === selectedAbility
          )}
          onChange={handleAbilityChange}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default Filter;
