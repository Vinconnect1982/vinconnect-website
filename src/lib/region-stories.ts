export const REGION_STORIES: Record<string, string[]> = {
  "casey-south-east": [
    "VINCONNECT is based in Cranbourne. Nearby work is mostly new estates, two-storey homes, clubs, and the first larger blocks on the edge of town. Finished jobs include the Cranbourne Cricket Club, plus homes in Cranbourne East, Cranbourne West, Clyde and Botanic Ridge.",
    "The usual problems are a roof that cannot see enough sky, a cable that needs to reach a useful place for the router, and a shed the house Wi-Fi does not cover. A wireless link is for that second building. It is not a fix for poor Wi-Fi inside the house.",
  ],
  cardinia: [
    "Cardinia runs from Officer and Pakenham through Koo Wee Rup and Lang Lang, then out to Bunyip. There is a finished factory rooftop job in Pakenham, and a rural job at Caldermeade where fixed wireless was slow and kept dropping out.",
    "On market gardens and horse properties the shed is often a long way from the house. A trench is usually the expensive option. A wireless link works when the two buildings can see each other and the trees are not in the way.",
  ],
  "mornington-peninsula": [
    "The Peninsula is coastal houses, hidden gutters, and the hills behind Red Hill. Finished jobs include a tripod at Somerville, a flat-roof install at Safety Beach, a Red Hill home that had been on unreliable fixed wireless, a coastal house at Sorrento, and a copper NBN replacement at Bittern.",
    "Salt, wind and the look of the house decide the mount. A tripod is often used so the roof does not need a hole. Properties in the hills also have sheds and trees. We check the address before assuming what internet is already there.",
  ],
  "western-port-bass-coast": [
    "This stretch runs from Tooradin around the bay to Grantville, Bass, San Remo, Phillip Island, Wonthaggi and Inverloch. Tooradin has a finished rural Starlink install. Island and coastal jobs are quoted from Cranbourne, and the trip is included.",
    "Holiday homes, wind and salt are the usual limits. Cameras for a gate, or for a house that sits empty part of the year, come up often. If the internet is for a caravan, that is a separate job.",
  ],
  "south-gippsland": [
    "Nyora, Poowong, Korumburra and Leongatha are hills, dairy farms and horse properties. Nyora has two finished jobs: a new home connected to cameras that were already there, and a roof-mounted Starlink that replaced unreliable fixed wireless at that house. Korumburra is a proposed stop on the Rural Connections roadshow. That is a community event, not an installation booking.",
    "Gullies and trees get in the way of the dish, and they also stop ordinary house Wi-Fi from reaching a shed. If a second building needs internet, we check whether a wireless link can see across. Fixed wireless only applies to the addresses that actually have it. It is not the same at every house in town.",
  ],
  "west-gippsland-latrobe": [
    "Warragul, Drouin and the highway towns through Trafalgar sit between dairy country and the Latrobe Valley. Warragul is a proposed stop on the Rural Connections roadshow. A house in town and a farm with several buildings are both work we do, and they are priced differently.",
    "Once you enter the address, the quote includes the trip from Cranbourne. A link across a long paddock needs a clear view between the buildings. Another Wi-Fi unit in the hallway will not cover that distance.",
  ],
  "inner-south-east": [
    "Berwick, Narre Warren, Hallam, Dandenong and Glen Waverley are trips from Cranbourne when the job is Starlink, a data cabinet or cameras. Established trees and two-storey cable runs are the usual constraint.",
    "This is different work from a Gippsland farm. If Starlink is not the right fit for the property, we say so before anyone drives out.",
  ],
};

export const REGION_LINKS: Record<string, { href: string; label: string }[]> = {
  "casey-south-east": [
    { href: "/vinready", label: "VINREADY for new homes" },
    { href: "/projects/cranbourne-cricket-club", label: "Cranbourne Cricket Club" },
    { href: "/services/starlink-installation", label: "Starlink installation" },
    { href: "/resources/new-home-starlink-ready", label: "New-home guide" },
  ],
  cardinia: [
    { href: "/projects/pakenham-commercial-factory", label: "Pakenham factory" },
    { href: "/vinready", label: "VINREADY for new estates" },
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
    { href: "/solutions/businesses-and-clubs", label: "Businesses and clubs" },
  ],
  "mornington-peninsula": [
    { href: "/projects/somerville-tripod-install", label: "Somerville tripod" },
    { href: "/projects/safety-beach-concealed-install", label: "Safety Beach" },
    { href: "/resources/choosing-a-starlink-mount", label: "Choosing a mount" },
    { href: "/services/starlink-installation", label: "Starlink installation" },
  ],
  "western-port-bass-coast": [
    { href: "/services/starlink-caravan-installation", label: "Caravan Starlink" },
    { href: "/resources/rural-cctv", label: "Rural cameras" },
    { href: "/resources/caravan-internet-guide", label: "Caravan internet guide" },
    { href: "/estimate", label: "Check My Install Price" },
  ],
  "south-gippsland": [
    { href: "/projects/nyora-fixed-wireless-upgrade", label: "Nyora roof mount" },
    { href: "/resources/fixed-wireless-vs-starlink", label: "Starlink or fixed wireless" },
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
    { href: "/resources/connected-horse-property", label: "Horse properties" },
  ],
  "west-gippsland-latrobe": [
    { href: "/rural-connections", label: "Rural Connections roadshow" },
    { href: "/resources/starlink-for-acreage", label: "Starlink for farms" },
    { href: "/resources/point-to-point-wireless", label: "Linking a second building" },
    { href: "/estimate", label: "Check My Install Price" },
  ],
  "inner-south-east": [
    { href: "/vinready", label: "VINREADY for new homes" },
    { href: "/services/whole-property-wifi", label: "Whole-home Wi-Fi" },
    { href: "/security", label: "CCTV" },
    { href: "/estimate", label: "Check My Install Price" },
  ],
};
