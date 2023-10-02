"use client";

import { useAlloContract } from "../../hooks/useAlloContract";

const Vote = async () => {
  const votes = await useAlloContract({});

  console.log("Votes **************************", votes);

  return (
    <div>
      <h1>Vote</h1>
    </div>
  );
};

export default Vote;
