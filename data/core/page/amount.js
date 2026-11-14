/**
 * SOL amount setter on the wallet-modal controller (original method
 * setSolAmount, flattened in the bundle).
 *
 * Recovered by tracing the generator state machine by hand:
 *   entry sum -121 -> validation clause (餢.length forced to 1)
 *   invalid        -> default -> throw TypeError("invalid amount")
 *   valid          -> sum -120 -> case 杍-203 -> store
 *
 * Bounds from the constants table: lower 囉[885] = 0.001, upper literal
 * 1000000.
 */

// ["setSolAmount"](amount) on the modal controller:
function setSolAmount(amount) {
  if (typeof amount != "number" || amount < 0.001 || amount > 1000000) {
    throw new TypeError("invalid amount");
  }
  this.Ne.tt = amount;
}

