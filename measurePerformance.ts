export async function measurePerformance(f: () => Promise<void>) {
  const startTime = performance.now();

  try {
    await f();
  } catch (error) {
    console.error("measurePerformance error:", error);
  }
  const endTime = performance.now();
  console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`);
}
