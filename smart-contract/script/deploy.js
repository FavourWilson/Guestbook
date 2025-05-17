const hre = require("hardhat");

async function main() {
  const Guestbook = await hre.ethers.getContractFactory("Guestbook");

  console.log("Deploying Guestbook contract...");

  const guestbook = await Guestbook.deploy(); // DO NOT add a semicolon after this line

  await guestbook.waitForDeployment(); // this waits for the contract to be mined

  console.log(`✅ Guestbook deployed to: ${guestbook.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
