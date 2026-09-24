/** Completed jobs where the previous service was fixed wireless at that property. Not a town-wide nbn claim. */
export const FIXED_WIRELESS_JOBS = new Set(["nyora", "caldermeade", "red-hill"]);
export const LOCAL_NOTES: Record<string, string> = {
  cranbourne:
    "VINCONNECT is based in Cranbourne. The work is a mix of estate homes, clubs and larger blocks on the edge of town. At Cranbourne Cricket Club, Starlink and Ubiquiti Wi-Fi replaced a Telstra 4G connection, including FrogBox streaming into the existing data rack.",
  "cranbourne-east":
    "Cranbourne East is mostly newer estates and two-storey homes. A finished job here used a gable mount after the previous connection kept dropping out. The mount is chosen for the house, not from a standard kit.",
  "cranbourne-west":
    "Cranbourne West is the same newer-home pattern, often two storeys. A finished job used a pole mount on a concrete tile roof. The cable is planned so the router sits somewhere useful, not just at the first hole in the wall.",
  clyde:
    "A lot of Clyde is still being built. A finished VINCONNECT job connected a new estate home where NBN and OptiComm were not available yet. Starlink can be the working connection while the estate is finished. Builders can also have the home prepared during construction with VINREADY.",
  "clyde-north":
    "Clyde North is growing quickly. Before anyone marks the roof, we look at the sky, the neighbouring houses and where the cable should come inside. Wi-Fi through the house is a separate step from getting the dish on.",
  nyora:
    "Nyora has more than one finished VINCONNECT job: a new home connected to cameras that were already there, and a roof-mounted Starlink that replaced unreliable fixed wireless. Horse properties and new houses sit in the same postcode. House Wi-Fi will not cross a paddock to a shed. That needs its own link.",
  "lang-lang":
    "Lang Lang is on the road toward South Gippsland. Farms, the showgrounds and houses in town often come up in the same conversation. Koo Wee Rup, Nyora and Grantville are the neighbouring areas.",
  "koo-wee-rup":
    "Koo Wee Rup is flat country and market gardens. The house and the shed are often a long way apart, so a wireless link works better than another Wi-Fi unit in the house. Gate cameras are a common next step.",
  poowong:
    "Poowong is hills, dairy and horse properties. A wireless link across a gully has to be checked for a clear view. House Wi-Fi does not replace that link, and the link does not replace Wi-Fi inside the shed.",
  korumburra:
    "Korumburra is a South Gippsland town with farms around it. It is also a proposed stop on the Rural Connections roadshow, around the sheepdog trials and show. The roadshow is separate from booking an installation.",
  leongatha:
    "Leongatha is the South Gippsland hub: homes, farms and small businesses. Enter the address and the trip from Cranbourne is included in the quote. It is a longer trip than a Cranbourne estate.",
  wonthaggi:
    "Wonthaggi is the Bass Coast centre, with homes and shops in town and farms behind it. Wind and the rural edges both affect the mount. Inverloch and Grantville are the usual neighbouring pages.",
  inverloch:
    "Inverloch is a mix of holiday homes and houses people live in all year. Wind off the inlet is part of choosing the mount. A tripod is often the better option when drilling the roof is a poor fit.",
  cowes:
    "Cowes is the Phillip Island base. Holiday homes, businesses and the rural parts of the island are all in scope, and the quote includes getting there. Cameras and venue Wi-Fi come up as often as a straight home install.",
  "phillip-island":
    "Phillip Island jobs are quoted from Cranbourne, including the bridge. Cowes and San Remo have their own pages. Holiday homes and farms on the island are not treated like a suburban estate.",
  "san-remo":
    "San Remo is the gateway to Phillip Island. The work is coastal homes and small commercial sites, with short cable runs and mounts chosen for salt air.",
  pakenham:
    "Pakenham covers commercial roofs and homes on the Cardinia growth corridor. A finished VINCONNECT job was a factory rooftop Starlink installation, from the mount and cable through to it working.",
  drouin:
    "Drouin sits between Pakenham and Warragul, where newer estates meet dairy country. A house install and a link across acreage are different jobs, even in the same postcode.",
  warragul:
    "Warragul is the West Gippsland centre, and a proposed stop on the Rural Connections roadshow. Town installs and farm work are both quoted from the address. The roadshow is not the same as booking an installation.",
  frankston:
    "Frankston is the gateway to the Peninsula: homes, units and small commercial sites. The job is still a clear view of the sky, a tidy cable entry, and a cabinet someone can work on later.",
  langwarrin:
    "Langwarrin sits between Frankston and Somerville. Blocks get larger here, so Wi-Fi through the house and a small camera kit matter more than a single router in the hallway.",
  sorrento:
    "A finished VINCONNECT job in Sorrento replaced an unreliable copper connection at a coastal home. The dish still has to be mounted properly, and the cable route has to suit the house. Salt and how the install looks both matter.",
  "safety-beach":
    "A finished Safety Beach job was a tripod on a two-storey flat roof with concealed gutters. The usual question here is how the cable gets inside without spoiling the gutter line.",
  "red-hill":
    "A finished Red Hill job replaced unreliable fixed wireless at a large home looking over the bay. Hills, trees and the size of the house decide both where the dish goes and how the Wi-Fi is planned.",
};
