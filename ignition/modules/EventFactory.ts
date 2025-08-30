import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EventFactoryModule = buildModule("EventFactoryModule", (m) => {
  // Deploy EventFactory contract
  const eventFactory = m.contract("EventFactory");

  return { eventFactory };
});

export default EventFactoryModule;
