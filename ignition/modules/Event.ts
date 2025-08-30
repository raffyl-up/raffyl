import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EventModule = buildModule("EventModule", (m) => {
  // Define constructor parameters
  const organizer = m.getParameter("organizer", "0x599C6a481c707317EDE2D4B7ab81d0AB49dC747c"); // Replace with actual organizer address
  const name = m.getParameter("name", "Sample Event");
  const tokenAddress = m.getParameter("tokenAddress", "0x6033F7f88332B8db6ad452B7C6D5bB643990aE3f"); //LSK
  const prizeAmount = m.getParameter("prizeAmount", 1000); // Example prize amount
  const winnerCount = m.getParameter("winnerCount", 3); // 3 winners

  // Deploy the Event contract with constructor arguments
  const event = m.contract("Event", [organizer, name, tokenAddress, prizeAmount, winnerCount]);

  return {
    event
  };
});

export default EventModule;