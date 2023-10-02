"use client";

import { useAlloContract } from "../../hooks/useAlloContract";

const Vote = () => {
  const votes = useAlloContract();

  return (
    <div>
      <h1>Vote</h1>
    </div>
  );
};

export default Vote;
