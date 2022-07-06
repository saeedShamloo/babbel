import { generateRandomNumber } from "..";

describe("generateRandomNumber()", () => {
  it("Should generate random number between 0 and max parameter", () => {
    const randmoNumber = generateRandomNumber(10);
    expect(randmoNumber).toBeLessThanOrEqual(10);
  });

  it("Should return random number 1 when max parameter is not provided", () => {
    const randmoNumber = generateRandomNumber();
    expect(randmoNumber).toBe(1);
  });
});
