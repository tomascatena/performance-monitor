import { networkInterfaces } from 'os';

/**
 * Get the list of internet facing MAC addresses of the device.
 * @returns {string[]} - Array of MAC addresses.
 */
const getDeviceMacAddress = () => {
  const netInterfaces = networkInterfaces();

  const internetFacingMacAddresses = Object
    .keys(netInterfaces)
    .map((netInterfaceName) => {
      const isInternetFacing = netInterfaces[netInterfaceName]!.some((interfaceData) => interfaceData.family === 'IPv4' && !interfaceData.internal);

      if (isInternetFacing) {
        return netInterfaces[netInterfaceName]![0].mac.toUpperCase();
      }

      return null;
    })
    .filter((mac) => mac && mac !== '00:00:00:00:00:00');

  return internetFacingMacAddresses;
};

export default getDeviceMacAddress;
