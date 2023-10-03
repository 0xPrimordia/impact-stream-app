import { alloContractDetails } from "../config/allo.config";
import { ViemClient } from "./client";

export type PoolData = {};

const client = ViemClient;
const alloContract = alloContractDetails();

export async function getAllo() {
  return alloContractDetails()[await client.getChainId()]?.proxy;
}

/**
 * Viem Helper function
 * @param param0
 * @returns () => Promise<unkown[]> fixme: unknown[]
 */
async function callReadContract({
  address,
  abi,
  functionName,
  args,
}: {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: (string[] | number[] | string | number | boolean | `0x${string}`)[];
}) {
  return await client.readContract({
    address,
    abi,
    functionName,
    args,
  });
}

/**
 * Get the strategy address for a pool
 * @param poolId
 * @param networkId
 * @returns Promise<`0x${string}`>
 */
async function getStrategy(
  poolId: number,
  networkId: number
): Promise<`0x${string}`> {
  const alloAddress = alloContract[networkId]?.proxy;
  const data = await callReadContract({
    address: alloAddress,
    abi: alloContract[networkId]?.abi,
    functionName: "getStrategy",
    args: [poolId],
  });

  return `0x${data.toString()}`;
}

function allocate(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;

  // allocate votes to a recipient
}

function setPayouts(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;
  // set the payouts for the pool
}

function distribute(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;
  // distribute the payouts
}

/********** Helper functions **********/

/**
 * Get the max voice credits per allocator for this strategy
 * @param networkId
 * @returns number
 */
async function getMaxVoiceCreditsPerAllocator(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;

  return await callReadContract({
    address: alloAddress,
    abi: alloContract[networkId]?.abi,
    functionName: "maxVoiceCreditsPerAllocator",
    args: [],
  });
}

/**
 * Check if an allocator is valid
 * @param networkId
 * @param allocatorId
 * @returns boolean
 */
async function isValidAllocator(networkId: number, allocatorId: string) {
  const alloAddress = alloContract[networkId]?.proxy;

  const isValid = await callReadContract({
    address: alloAddress,
    abi: alloContract[networkId]?.abi,
    functionName: "isValidAllocator",
    args: [allocatorId],
  });

  return isValid;
}

/**
 * Get the voice credits used by an allocator
 * @param networkId
 * @param allocatorId
 * @returns
 */
async function getUsedVoiceCreditsByAllocator(
  networkId: number,
  allocatorId: string
) {
  const alloAddress = alloContract[networkId]?.proxy;

  if (!isValidAllocator(networkId, allocatorId)) {
    return 0;
  }

  const voiceCredits = Number(
    await callReadContract({
      address: alloAddress,
      abi: alloContract[networkId]?.abi,
      functionName: "getUsedVoiceCreditsByAllocator", // fixme: this does not exist yet
      args: [allocatorId],
    })
  );

  const maxVoiceCreditsPerAllocator = Number(
    await getMaxVoiceCreditsPerAllocator(networkId)
  );
  const usedVoiceCredits = maxVoiceCreditsPerAllocator - voiceCredits;

  return usedVoiceCredits;
}

/**
 * Get the voice credits allocated to a recipient
 * @param networkId
 * @param allocatorId
 * @param recipientId
 * @returns number
 */
async function getVoiceCreditsAllocatedToRecipientId(
  networkId: number,
  allocatorId: string,
  recipientId: string
): Promise<number> {
  const alloAddress = alloContract[networkId]?.proxy;
  if (!isValidAllocator(networkId, allocatorId)) {
    return 0;
  }
  const creditsUsedForRecipient =
    (await callReadContract({
      address: alloAddress,
      abi: alloContract[networkId]?.abi,
      functionName: "getVoiceCreditsForRecipientFromAllocator",
      args: [allocatorId, recipientId],
    })) ?? 0;

  return creditsUsedForRecipient as unknown as number; // fixme: 🫠
}

/**
 * Get the available voice credits for an allocator
 * @param networkId
 * @param allocatorId
 * @returns number
 */
async function getAvailableVoiceCredits(
  networkId: number,
  allocatorId: string
) {
  if (!isValidAllocator(networkId, allocatorId)) {
    return 0;
  }

  const maxVoiceCredits = Number(
    await getMaxVoiceCreditsPerAllocator(networkId)
  );
  const usedVoiceCredits = await getUsedVoiceCreditsByAllocator(
    networkId,
    allocatorId
  );

  return maxVoiceCredits - usedVoiceCredits;
}

/**
 * Check if an allocator has enough voice credits left to allocate to a recipient
 * @param networkId
 * @param allocatorId
 * @param voiceCredits
 * @returns boolean
 */
async function hasVoiceCreditsLeft(
  networkId: number,
  allocatorId: string,
  voiceCredits: number
) {
  const usedVoiceCredits = Number(
    await getUsedVoiceCreditsByAllocator(networkId, allocatorId)
  );
  const maxVoiceCredits = Number(
    await getMaxVoiceCreditsPerAllocator(networkId)
  );

  return maxVoiceCredits >= usedVoiceCredits + voiceCredits;
}

/********** Main functions **********/

// In the UI -> there would be a number which the user would enter
// it would be the votes they enter
// and we would convert that behind the scenes to check if they have enough credits to purchase/cast that vote

/**
 * votes: the number of votes (not voice credits)
 * @param networkId
 * @param allocatorId the ID of the allocator
 * @param recipientId the ID of the recipient
 * @param votes
 * @returns
 */
async function canAllocateVotesToRecipient(
  networkId: number,
  allocatorId: string,
  recipientId: string,
  votes: number
) {
  // get the max voice credits per allocator
  // ==> assume: 10
  const maxVoiceCreditsPerAllocator =
    Number(await getMaxVoiceCreditsPerAllocator(networkId)) * 10 ** 18;

  // ==> assume 1 vote is to be cast to recipient
  // ==> allocator has already cast 2 votes to this recipient and 1 vote to another

  if (!(await isValidAllocator(networkId, allocatorId))) {
    return false;
  }

  // get the voice credits already allocated to the recipient
  // ==> assume 4 credits has already been allocated
  const voiceCreditsAlreadyAllocatedToRecipient =
    await getVoiceCreditsAllocatedToRecipientId(
      networkId,
      allocatorId,
      recipientId
    );
  // get the actual votes allocated to the recipient
  // ==> Math.sqrt(4) => 2
  const votesAlreadyAllocatedToRecipient = Math.sqrt(
    voiceCreditsAlreadyAllocatedToRecipient ?? 0
  );

  // get total votes to recipient with the votes the user wants to cast
  // ==> 1 + 2 => 3
  const totalVotesToRecipient = votes + votesAlreadyAllocatedToRecipient;

  // ==> 3^2 => 9
  const totalVoiceCreditsToRecipient = Math.pow(totalVotesToRecipient, 2);

  // get total voice credits used
  // ==> 4 + 1 => 5
  const voiceCreditsUsedByAllocator = await getUsedVoiceCreditsByAllocator(
    networkId,
    allocatorId
  );

  // ==> 5 - 4 = 1
  const voiceCreditsAllocatedToOtherRecipients =
    voiceCreditsUsedByAllocator - voiceCreditsAlreadyAllocatedToRecipient!;

  // ==> 1 + 9 == 10
  const totalVoiceCredits =
    voiceCreditsAllocatedToOtherRecipients + totalVoiceCreditsToRecipient;

  if (totalVoiceCredits > maxVoiceCreditsPerAllocator) {
    return false;
  }
  return true;
}

/**
 * Can allocator allocate vote(s) to recipient(s)
 * @param networkId
 * @param allocatorId
 * @param recipientIds
 * @param votes
 * @returns
 */
async function canAllocateVotesToRecipients(
  networkId: number,
  allocatorId: string,
  recipientIds: string[],
  votes: number[]
) {
  // ==> assume 1 vote for recipient1 and 2 votes for recipient2
  // ==> allocator has already cast 1 votes to recipient1 and 1 vote to recipient3 (not in the list)

  if (!(await isValidAllocator(networkId, allocatorId))) {
    return false;
  }

  if (recipientIds.length !== votes.length) {
    return false;
  }

  // get the max voice credits per allocator
  // ==> assume: 10
  const maxVoiceCreditsPerAllocator =
    Number(await getMaxVoiceCreditsPerAllocator(networkId)) * 10 ** 18;

  // get total voice credits used
  // ==>  1 (recipient1) + 0 (recipient2) + 1 (recipient3) => 2
  const voiceCreditsUsedByAllocator = await getUsedVoiceCreditsByAllocator(
    networkId,
    allocatorId
  );

  // 🤔 const voiceCreditsAlreadyAllocatedToRecipients = [];

  let totalVoiceCreditsUsedByAllocatorToRecipientsInCart = 0;
  let voiceCreditsAlreadyAllocatedToRecipientsInCart = 0;

  for (let i = 0; i <= recipientIds.length; i++) {
    // get the voice credits already allocated to the recipient
    // recipient1 => 1
    // recipient2 => 0
    const voiceCreditsAlreadyAllocatedToRecipient = Number(
      getVoiceCreditsAllocatedToRecipientId(
        networkId,
        allocatorId,
        recipientIds[i]
      )
    );

    // get the actual votes allocated to the recipient
    // ==> (recipient1) Math.sqrt(1) => 1
    // ==> (recipient2) Math.sqrt(0) => 0
    const votesAlreadyAllocatedToRecipient = Math.sqrt(
      voiceCreditsAlreadyAllocatedToRecipient ?? 0
    );

    // get total votes to recipient with the votes the user wants to cast
    // ==> (recipient1) 1 + 1 => 2
    // ==> (recipient2) 2 + 0 => 2
    const totalVotesToRecipient = votes[i] + votesAlreadyAllocatedToRecipient;

    // ==> (recipient1) 2^2 => 4
    // ==> (recipient2) 2^2 => 4
    const totalVoiceCreditsToRecipient = Math.pow(totalVotesToRecipient, 2);

    // ==> 0 => 4 => 8
    totalVoiceCreditsUsedByAllocatorToRecipientsInCart +=
      totalVoiceCreditsToRecipient;
    // ==> 0 => 1 => 1
    voiceCreditsAlreadyAllocatedToRecipientsInCart +=
      voiceCreditsAlreadyAllocatedToRecipient!;
  }

  // 2 - 1 = 1
  const voiceCreditsAllocatedToOtherRecipients =
    voiceCreditsUsedByAllocator -
    voiceCreditsAlreadyAllocatedToRecipientsInCart;

  // 8 + 1 = 9
  const totalVoiceCredits =
    totalVoiceCreditsUsedByAllocatorToRecipientsInCart +
    voiceCreditsAllocatedToOtherRecipients;

  if (totalVoiceCredits > maxVoiceCreditsPerAllocator) {
    return false;
  }

  return true;
}
