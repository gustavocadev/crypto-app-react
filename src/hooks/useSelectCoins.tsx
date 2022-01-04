import styled from "@emotion/styled";
import { useState } from "react";
import type { Coin } from "../data/coins";

const Label = styled.label`
  color: #fff;
  font-size: 20px;
  margin-bottom: 8px;
  display: block;
  text-transform: capitalize;
`;

const Input = styled.input`
  padding: 4px;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  display: block;
  width: 100%;
  margin-bottom: 20px;
`;

const useSelectCoins = (name: string, options: Coin[]) => {
  const [state, setState] = useState("");
  const SelectCoins = () => {
    return (
      <>
        <Label htmlFor="">{name}</Label>
        <Select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Seleccione</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </>
    );
  };

  return [state, SelectCoins];
};

export default useSelectCoins;
