export type Region = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  image: string;
  lat: number;
  lng: number;
  zoom: number;
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  postcode: string;
  lat: number;
  lng: number;
  blurb: string;
  focus: string;
  nearby: string[];
};

export const REGIONS: Region[] = [
  {
    slug: "casey-south-east",
    name: "Casey & South East Melbourne",
    short: "Casey",
    blurb: "Home base around Cranbourne. New estates, double-storey homes and the first paddocks south of the freeway.",
    image: "/scenes-new/casey-estates.webp",
    lat: -38.11,
    lng: 145.29,
    zoom: 11,
  },
  {
    slug: "cardinia",
    name: "Cardinia",
    short: "Cardinia",
    blurb: "Pakenham through Officer, Bunyip and the Koo Wee Rup swamp country — commercial sheds and rural blocks.",
    image: "/scenes-new/cardinia-paddocks.webp",
    lat: -38.1,
    lng: 145.52,
    zoom: 10,
  },
  {
    slug: "mornington-peninsula",
    name: "Mornington Peninsula",
    short: "Peninsula",
    blurb: "Somerville to Sorrento. Coastal homes, tripod mounts and older copper connections.",
    image: "/scenes-new/peninsula-home.webp",
    lat: -38.28,
    lng: 145.05,
    zoom: 10,
  },
  {
    slug: "western-port-bass-coast",
    name: "Western Port & Bass Coast",
    short: "Bass Coast",
    blurb: "Tooradin, Wonthaggi, Inverloch and Phillip Island. Rural bay-side properties and coastal wind.",
    image: "/scenes-new/bass-coast-bay.webp",
    lat: -38.48,
    lng: 145.45,
    zoom: 9,
  },
  {
    slug: "south-gippsland",
    name: "South Gippsland",
    short: "South Gippsland",
    blurb: "Nyora, Poowong, Korumburra and Leongatha. Hills, dairy farms and horse properties.",
    image: "/scenes-new/gippsland-farm.webp",
    lat: -38.45,
    lng: 145.9,
    zoom: 10,
  },
  {
    slug: "west-gippsland-latrobe",
    name: "West Gippsland & Latrobe",
    short: "West Gippsland",
    blurb: "Warragul, Drouin, Traralgon and the valley towns. Town houses, farms, and travel included in the quote.",
    image: "/scenes-new/cattle-farm.webp",
    lat: -38.18,
    lng: 146.2,
    zoom: 9,
  },
  {
    slug: "inner-south-east",
    name: "Inner South East (travel)",
    short: "Inner SE",
    blurb: "Glen Waverley, Berwick, Narre Warren and Dandenong, when the job is Starlink, a cabinet or cameras.",
    image: "/scenes-new/inner-se-street.webp",
    lat: -37.99,
    lng: 145.25,
    zoom: 11,
  },
];

export const AREAS: Area[] = [
  { slug: "cranbourne", name: "Cranbourne", region: "casey-south-east", postcode: "3977", lat: -38.106, lng: 145.283, blurb: "VINCONNECT is based in Cranbourne. Starlink, Wi-Fi, wireless links and CCTV across the town, the estates and nearby acreage.", focus: "Local installs, clubs and cabinet work with short travel.", nearby: ["cranbourne-east", "cranbourne-west", "lyndhurst", "botanic-ridge", "clyde"] },
  { slug: "cranbourne-east", name: "Cranbourne East", region: "casey-south-east", postcode: "3977", lat: -38.106, lng: 145.307, blurb: "New estates and double-storey homes. Fascia, tripod and roof mounts chosen for how the house is built.", focus: "Estate homes, dropouts on existing services, tidy cable entry.", nearby: ["cranbourne", "clyde", "clyde-north", "junction-village"] },
  { slug: "cranbourne-west", name: "Cranbourne West", region: "casey-south-east", postcode: "3977", lat: -38.106, lng: 145.255, blurb: "Newer two-storey homes. A finished job used a pole mount on a concrete tile roof.", focus: "Pole and roof mounts, with the cable brought to a useful wall.", nearby: ["cranbourne", "lyndhurst", "cranbourne-north"] },
  { slug: "cranbourne-north", name: "Cranbourne North", region: "casey-south-east", postcode: "3977", lat: -38.083, lng: 145.279, blurb: "Family homes north of the Cranbourne centre needing reliable Wi-Fi and a considered dish position.", focus: "Sky view, mesh placement and existing NBN handover.", nearby: ["cranbourne", "lyndhurst", "cranbourne-west", "narre-warren", "narre-warren-south"] },
  { slug: "cranbourne-south", name: "Cranbourne South", region: "casey-south-east", postcode: "3977", lat: -38.146, lng: 145.281, blurb: "Larger blocks on the south side of town, heading toward Botanic Ridge and the rural fringe.", focus: "House-plus-shed links and camera views down long drives.", nearby: ["botanic-ridge", "cranbourne", "devon-meadows", "pearcedale"] },
  { slug: "lyndhurst", name: "Lyndhurst", region: "casey-south-east", postcode: "3975", lat: -38.046, lng: 145.249, blurb: "Rental-friendly mounts and cabinet integrations, including Hills Home Hub style entries.", focus: "Landlord-friendly Starlink and tidy data cabinets.", nearby: ["cranbourne-west", "cranbourne-north", "hallam"] },
  { slug: "botanic-ridge", name: "Botanic Ridge", region: "casey-south-east", postcode: "3977", lat: -38.139, lng: 145.268, blurb: "Double-storey fascia work and UPS-aware installs on newer estate homes.", focus: "Fascia mounts, UPS and existing switchgear.", nearby: ["cranbourne-south", "clyde", "junction-village"] },
  { slug: "clyde", name: "Clyde", region: "casey-south-east", postcode: "3978", lat: -38.133, lng: 145.333, blurb: "New homes waiting on NBN or OptiComm. Starlink is often the working connection while the street catches up.", focus: "New-build mounting, temporary-to-permanent paths.", nearby: ["clyde-north", "cranbourne-east", "tooradin", "officer"] },
  { slug: "clyde-north", name: "Clyde North", region: "casey-south-east", postcode: "3978", lat: -38.11, lng: 145.339, blurb: "Rapid growth estates. Sky view, neighbour shielding and cable routes planned before the roof is marked.", focus: "Estate Starlink and whole-home Wi-Fi.", nearby: ["clyde", "cranbourne-east", "officer", "berwick"] },
  { slug: "junction-village", name: "Junction Village", region: "casey-south-east", postcode: "3977", lat: -38.136, lng: 145.297, blurb: "Smaller Casey pocket between Cranbourne East and Clyde, typical of new-build Starlink and camera jobs.", focus: "Compact lots, fascia mounts, four-camera homes.", nearby: ["cranbourne-east", "clyde", "botanic-ridge"] },
  { slug: "devon-meadows", name: "Devon Meadows", region: "casey-south-east", postcode: "3977", lat: -38.166, lng: 145.31, blurb: "Semi-rural lots where the house Wi-Fi dies at the shed. Wireless links earn their place here.", focus: "Acreage Wi-Fi, sheds and driveway cameras.", nearby: ["cranbourne-south", "tooradin", "pearcedale"] },

  { slug: "pakenham", name: "Pakenham", region: "cardinia", postcode: "3810", lat: -38.077, lng: 145.484, blurb: "Commercial rooftops and residential installs on the Cardinia growth corridor.", focus: "Factory rooftops, cabinets and home Starlink.", nearby: ["officer", "nar-nar-goon", "clyde-north"] },
  { slug: "officer", name: "Officer", region: "cardinia", postcode: "3809", lat: -38.059, lng: 145.411, blurb: "New estates meeting older Cardinia blocks. Sky view and street trees decide the mount.", focus: "Estate homes and early-stage NBN gaps.", nearby: ["pakenham", "beaconsfield", "clyde-north", "berwick"] },
  { slug: "beaconsfield", name: "Beaconsfield", region: "cardinia", postcode: "3807", lat: -38.05, lng: 145.37, blurb: "Hills, trees and mixed housing. A dish position that looks after the sky view matters more than a default roof centre.", focus: "Tree-aware mounts and multi-level homes.", nearby: ["officer", "berwick", "narre-warren"] },
  { slug: "bunyip", name: "Bunyip", region: "cardinia", postcode: "3815", lat: -38.098, lng: 145.717, blurb: "Township and surrounding farms. A natural stop on the Rural Connections roadshow pathway.", focus: "Rural Starlink, farm Wi-Fi and community venues.", nearby: ["garfield", "nar-nar-goon", "drouin"] },
  { slug: "koo-wee-rup", name: "Koo Wee Rup", region: "cardinia", postcode: "3981", lat: -38.198, lng: 145.49, blurb: "Swamp country and market gardens. Long, flat properties with sheds a long way from the house.", focus: "Point-to-point links and gate cameras.", nearby: ["tooradin", "lang-lang", "caldermeade", "pakenham"] },
  { slug: "lang-lang", name: "Lang Lang", region: "cardinia", postcode: "3984", lat: -38.266, lng: 145.563, blurb: "Rural township on the way to South Gippsland. Showgrounds and farms sit in the same conversation.", focus: "Farm connectivity and event Wi-Fi conversations.", nearby: ["koo-wee-rup", "nyora", "grantville", "caldermeade"] },
  { slug: "garfield", name: "Garfield", region: "cardinia", postcode: "3814", lat: -38.09, lng: 145.675, blurb: "Small Cardinia town with surrounding acreage and poor fixed-wireless stories we hear often.", focus: "Starlink upgrades and shed coverage.", nearby: ["bunyip", "nar-nar-goon", "tonimbuk"] },
  { slug: "nar-nar-goon", name: "Nar Nar Goon", region: "cardinia", postcode: "3812", lat: -38.082, lng: 145.571, blurb: "Between Pakenham and Garfield. Horse properties and rural homes off the highway.", focus: "Horse-property Wi-Fi and stable cameras.", nearby: ["pakenham", "garfield", "bunyip"] },
  { slug: "caldermeade", name: "Caldermeade", region: "cardinia", postcode: "3984", lat: -38.244, lng: 145.548, blurb: "Rural Starlink after slow, dropout-prone fixed wireless. Large lots, real distances.", focus: "Roof-mounted Starlink and building links.", nearby: ["lang-lang", "koo-wee-rup", "nyora"] },
  { slug: "tonimbuk", name: "Tonimbuk", region: "cardinia", postcode: "3815", lat: -38.016, lng: 145.73, blurb: "Hills behind Bunyip and Garfield. Trees, terrain and horse properties where a default roof-centre dish rarely works.", focus: "Tree-aware Starlink and paddock Wi-Fi.", nearby: ["garfield", "bunyip"] },

  { slug: "frankston", name: "Frankston", region: "mornington-peninsula", postcode: "3199", lat: -38.144, lng: 145.123, blurb: "Peninsula gateway. Homes, units and small commercial sites that still need a sky view and a tidy cabinet.", focus: "Urban Starlink, CCTV and rack work.", nearby: ["langwarrin", "mount-eliza", "cranbourne"] },
  { slug: "langwarrin", name: "Langwarrin", region: "mornington-peninsula", postcode: "3910", lat: -38.154, lng: 145.187, blurb: "Between Frankston and Somerville. Larger suburban blocks and the start of Peninsula acreage.", focus: "Whole-home Wi-Fi and four-camera kits.", nearby: ["frankston", "somerville", "pearcedale", "cranbourne"] },
  { slug: "somerville", name: "Somerville", region: "mornington-peninsula", postcode: "3912", lat: -38.226, lng: 145.176, blurb: "Tripod and standard Starlink installs. A regular VINCONNECT work area with completed jobs on the books.", focus: "Non-penetrating mounts and rural-fringe Wi-Fi.", nearby: ["pearcedale", "tyabb", "hastings", "langwarrin"] },
  { slug: "pearcedale", name: "Pearcedale", region: "mornington-peninsula", postcode: "3912", lat: -38.203, lng: 145.231, blurb: "Five-acre properties, sheds and workshops. The house Wi-Fi is rarely enough on its own.", focus: "Whole-property links and stable/shed coverage.", nearby: ["somerville", "devon-meadows", "tooradin", "hastings"] },
  { slug: "hastings", name: "Hastings", region: "mornington-peninsula", postcode: "3915", lat: -38.306, lng: 145.189, blurb: "Western Port town with mixed residential and industrial edges. Wind and salt are part of the mount choice.", focus: "Coastal mounts and workshop links.", nearby: ["bittern", "tyabb", "somerville", "crib-point"] },
  { slug: "bittern", name: "Bittern", region: "mornington-peninsula", postcode: "3918", lat: -38.337, lng: 145.178, blurb: "Copper NBN upgrades to mounted Starlink. A completed VINCONNECT job sits on this page.", focus: "Copper replacement and roof mounts.", nearby: ["hastings", "crib-point", "tyabb"] },
  { slug: "crib-point", name: "Crib Point", region: "mornington-peninsula", postcode: "3919", lat: -38.366, lng: 145.204, blurb: "Small Western Port township. Trees, tanks and modest roofs decide whether a tripod or fascia wins.", focus: "Compact roofs and coastal weatherproofing.", nearby: ["bittern", "hastings"] },
  { slug: "tyabb", name: "Tyabb", region: "mornington-peninsula", postcode: "3913", lat: -38.259, lng: 145.186, blurb: "Rural-residential between Somerville and Hastings. Horse paddocks start appearing here.", focus: "Acreage Wi-Fi and driveway cameras.", nearby: ["somerville", "hastings", "bittern"] },
  { slug: "mornington", name: "Mornington", region: "mornington-peninsula", postcode: "3931", lat: -38.218, lng: 145.038, blurb: "Peninsula town centre and surrounding hills. Architectural homes want the dish unseen.", focus: "Concealed routes and premium presentation.", nearby: ["mount-martha", "safety-beach", "frankston"] },
  { slug: "mount-martha", name: "Mount Martha", region: "mornington-peninsula", postcode: "3934", lat: -38.267, lng: 145.018, blurb: "Sloping blocks and bay views. Line-of-sight for wireless links is a survey, not a guess.", focus: "Multi-level homes and sky-view planning.", nearby: ["mornington", "safety-beach", "dromana"] },
  { slug: "dromana", name: "Dromana", region: "mornington-peninsula", postcode: "3936", lat: -38.338, lng: 144.965, blurb: "Coastal town under Arthurs Seat. Trees and terrain fight both sky view and Wi-Fi.", focus: "Mount choice and internal coverage.", nearby: ["safety-beach", "red-hill", "rosebud"] },
  { slug: "safety-beach", name: "Safety Beach", region: "mornington-peninsula", postcode: "3936", lat: -38.315, lng: 144.996, blurb: "Concealed-gutter and flat-roof tripod work. A completed double-storey job is on the projects list.", focus: "Tripods on flat roofs, hidden cable paths.", nearby: ["dromana", "mount-martha", "red-hill"] },
  { slug: "red-hill", name: "Red Hill", region: "mornington-peninsula", postcode: "3937", lat: -38.311, lng: 145.016, blurb: "Multi-level homes and unreliable fixed wireless replacements looking over the bay.", focus: "Large homes, weak fixed wireless, whole-house Wi-Fi.", nearby: ["safety-beach", "dromana", "main-ridge"] },
  { slug: "rosebud", name: "Rosebud", region: "mornington-peninsula", postcode: "3939", lat: -38.366, lng: 144.907, blurb: "Coastal strip and hinterland. Holiday homes and permanent residences both need a sky view that survives tea-tree.", focus: "Coastal Starlink and holiday-home CCTV.", nearby: ["dromana", "sorrento", "red-hill"] },
  { slug: "sorrento", name: "Sorrento", region: "mornington-peninsula", postcode: "3943", lat: -38.338, lng: 144.741, blurb: "Coastal architectural homes replacing copper. Presentation is part of the job.", focus: "Architectural mounts and concealed entry.", nearby: ["rosebud", "blairgowrie"] },
  { slug: "blairgowrie", name: "Blairgowrie", region: "mornington-peninsula", postcode: "3942", lat: -38.361, lng: 144.773, blurb: "Tea-tree, limestone and coastal wind. A tripod often beats a penetrating roof mount.", focus: "Non-penetrating coastal installs.", nearby: ["sorrento", "rosebud"] },
  { slug: "mount-eliza", name: "Mount Eliza", region: "mornington-peninsula", postcode: "3930", lat: -38.187, lng: 145.091, blurb: "Established Peninsula suburb between Frankston and Mornington. Trees, slopes and presentation-sensitive mounts.", focus: "Discreet fascia work and whole-home Wi-Fi.", nearby: ["frankston", "mornington", "langwarrin"] },
  { slug: "main-ridge", name: "Main Ridge", region: "mornington-peninsula", postcode: "3928", lat: -38.4, lng: 145.014, blurb: "Hinterland behind Red Hill. Vineyards, trees and rural homes where fixed wireless is often the complaint.", focus: "Hill-country Starlink and acreage links.", nearby: ["red-hill", "dromana", "flinders"] },
  { slug: "flinders", name: "Flinders", region: "mornington-peninsula", postcode: "3929", lat: -38.474, lng: 145.02, blurb: "Southern Peninsula township. Coastal wind, modest roofs and holiday plus permanent homes.", focus: "Coastal tripods and holiday-home cameras.", nearby: ["main-ridge", "red-hill", "balnarring"] },
  { slug: "balnarring", name: "Balnarring", region: "mornington-peninsula", postcode: "3926", lat: -38.373, lng: 145.127, blurb: "Western Port side of the Peninsula. Rural-residential lots, horse paddocks and coastal weather.", focus: "Acreage Wi-Fi and gate cameras.", nearby: ["hastings", "red-hill", "flinders"] },

  { slug: "tooradin", name: "Tooradin", region: "western-port-bass-coast", postcode: "3980", lat: -38.215, lng: 145.38, blurb: "Large rural properties on the bay side. Roof-mounted Starlink and long driveway cameras.", focus: "Rural installs, sheds and gate views.", nearby: ["clyde", "koo-wee-rup", "devon-meadows", "pearcedale"] },
  { slug: "grantville", name: "Grantville", region: "western-port-bass-coast", postcode: "3984", lat: -38.409, lng: 145.535, blurb: "Bass Highway township. Farms and coastal blocks with mixed mobile coverage.", focus: "Starlink as the primary service, not a backup.", nearby: ["corinella", "lang-lang", "bass"] },
  { slug: "corinella", name: "Corinella", region: "western-port-bass-coast", postcode: "3984", lat: -38.4, lng: 145.456, blurb: "Western Port village. Wind, salt and modest roofs. Mount hardware is specified for the coast.", focus: "Coastal weatherproofing and compact kits.", nearby: ["grantville", "coronet-bay", "san-remo"] },
  { slug: "wonthaggi", name: "Wonthaggi", region: "western-port-bass-coast", postcode: "3995", lat: -38.605, lng: 145.591, blurb: "Bass Coast regional centre. Homes, shops and the farms in behind.", focus: "Town Starlink, CCTV and travel-quoted rural jobs.", nearby: ["inverloch", "dalyston", "grantville"] },
  { slug: "inverloch", name: "Inverloch", region: "western-port-bass-coast", postcode: "3996", lat: -38.633, lng: 145.727, blurb: "Coastal town with holiday and permanent homes. Inlet wind is part of every mount conversation.", focus: "Coastal tripods and holiday-home cameras.", nearby: ["wonthaggi", "cape-paterson"] },
  { slug: "cowes", name: "Cowes", region: "western-port-bass-coast", postcode: "3922", lat: -38.451, lng: 145.239, blurb: "Phillip Island. Travel is quoted from Cranbourne. Holiday homes, businesses and rural corners of the island.", focus: "Island installs, cameras and visitor Wi-Fi for venues.", nearby: ["san-remo", "phillip-island"] },
  { slug: "san-remo", name: "San Remo", region: "western-port-bass-coast", postcode: "3925", lat: -38.527, lng: 145.366, blurb: "Gateway to the island. Coastal homes and small commercial sites.", focus: "Coastal mounts and short-run Wi-Fi.", nearby: ["cowes", "corinella", "grantville"] },
  { slug: "phillip-island", name: "Phillip Island", region: "western-port-bass-coast", postcode: "3922", lat: -38.483, lng: 145.231, blurb: "Island-wide coverage from Cowes through the rural west. Travel and ferry/bridge timing sit in the quote.", focus: "Holiday homes, farms and venue connectivity.", nearby: ["cowes", "san-remo"] },
  { slug: "bass", name: "Bass", region: "western-port-bass-coast", postcode: "3991", lat: -38.483, lng: 145.57, blurb: "Small Bass Coast locality between Grantville and Wonthaggi. Farms, wind and the highway.", focus: "Rural Starlink and farm cameras.", nearby: ["grantville", "corinella", "wonthaggi"] },
  { slug: "cape-paterson", name: "Cape Paterson", region: "western-port-bass-coast", postcode: "3995", lat: -38.675, lng: 145.618, blurb: "Coastal village south of Wonthaggi. Holiday homes, salt and a sky view that has to survive the Bass Strait wind.", focus: "Coastal tripods and holiday CCTV.", nearby: ["inverloch", "wonthaggi"] },
  { slug: "dalyston", name: "Dalyston", region: "western-port-bass-coast", postcode: "3992", lat: -38.551, lng: 145.55, blurb: "Between Grantville and Wonthaggi. Rural homes and the farmland behind the highway.", focus: "Farm Starlink and shed links.", nearby: ["wonthaggi", "grantville"] },
  { slug: "coronet-bay", name: "Coronet Bay", region: "western-port-bass-coast", postcode: "3984", lat: -38.43, lng: 145.44, blurb: "Western Port coastal pocket next to Corinella. Compact lots, tea-tree and salt.", focus: "Weatherproof mounts and compact kits.", nearby: ["corinella", "grantville"] },

  { slug: "nyora", name: "Nyora", region: "south-gippsland", postcode: "3987", lat: -38.336, lng: 145.672, blurb: "New homes, CCTV tie-ins and fixed-wireless upgrades. Several completed VINCONNECT jobs.", focus: "Rural Starlink and new-home CCTV.", nearby: ["poowong", "lang-lang", "caldermeade", "korumburra"] },
  { slug: "poowong", name: "Poowong", region: "south-gippsland", postcode: "3988", lat: -38.344, lng: 145.758, blurb: "Hills, dairy and horse properties. A link to the shed is checked on site for a clear view.", focus: "Farm Wi-Fi and links between buildings.", nearby: ["nyora", "korumburra", "leongatha"] },
  { slug: "korumburra", name: "Korumburra", region: "south-gippsland", postcode: "3950", lat: -38.432, lng: 145.823, blurb: "Proposed Rural Connections roadshow stop (Sheepdog Trials / Show). Town plus surrounding farms.", focus: "Community Wi-Fi conversations and farm installs.", nearby: ["poowong", "leongatha", "nyora"] },
  { slug: "leongatha", name: "Leongatha", region: "south-gippsland", postcode: "3953", lat: -38.477, lng: 145.947, blurb: "South Gippsland hub. Homes, farms and businesses. Travel from Cranbourne is always in the estimate.", focus: "Regional Starlink, CCTV and multi-building farms.", nearby: ["korumburra", "mirboo-north", "meeniyan"] },
  { slug: "mirboo-north", name: "Mirboo North", region: "south-gippsland", postcode: "3871", lat: -38.401, lng: 146.158, blurb: "Strzelecki foothills. Trees and terrain. Sky view and wireless paths need a site look.", focus: "Hill-country Starlink and long Wi-Fi runs.", nearby: ["leongatha", "morwell", "warragul"] },
  { slug: "foster", name: "Foster", region: "south-gippsland", postcode: "3960", lat: -38.653, lng: 146.201, blurb: "Further down the South Gippsland highway. The trip from Cranbourne is included in the quote.", focus: "Rural homes and properties toward the coast.", nearby: ["meeniyan", "leongatha"] },
  { slug: "meeniyan", name: "Meeniyan", region: "south-gippsland", postcode: "3956", lat: -38.578, lng: 146.014, blurb: "A small town with large properties around it. Homes and farms.", focus: "Farm connectivity and home installs.", nearby: ["leongatha", "foster", "korumburra"] },

  { slug: "warragul", name: "Warragul", region: "west-gippsland-latrobe", postcode: "3820", lat: -38.159, lng: 145.931, blurb: "West Gippsland centre and a proposed Rural Connections show activation. Town and farm work.", focus: "Regional installs and event connectivity talks.", nearby: ["drouin", "lardner", "bunyip"] },
  { slug: "drouin", name: "Drouin", region: "west-gippsland-latrobe", postcode: "3818", lat: -38.136, lng: 145.858, blurb: "Between Pakenham and Warragul. Growth estates meeting dairy country.", focus: "Estate Starlink and acreage links.", nearby: ["warragul", "bunyip", "longwarry"] },
  { slug: "traralgon", name: "Traralgon", region: "west-gippsland-latrobe", postcode: "3844", lat: -38.196, lng: 146.54, blurb: "Latrobe Valley city. Travel is longer; the estimator still includes it from the address you enter.", focus: "Homes, small commercial and valley farms.", nearby: ["morwell", "moe"] },
  { slug: "morwell", name: "Morwell", region: "west-gippsland-latrobe", postcode: "3840", lat: -38.234, lng: 146.395, blurb: "A Latrobe Valley town with houses and industrial edges. Cameras, cabinets and Starlink.", focus: "CCTV, data cabinets and Starlink.", nearby: ["traralgon", "moe", "mirboo-north"] },
  { slug: "moe", name: "Moe", region: "west-gippsland-latrobe", postcode: "3825", lat: -38.177, lng: 146.261, blurb: "Latrobe Valley. Quoted as a travel-inclusive job from Cranbourne.", focus: "Residential Starlink and small business cameras.", nearby: ["morwell", "traralgon", "warragul"] },
  { slug: "longwarry", name: "Longwarry", region: "west-gippsland-latrobe", postcode: "3816", lat: -38.112, lng: 145.768, blurb: "Between Bunyip and Drouin. Township plus surrounding dairy and horse properties.", focus: "Rural Starlink and shed coverage.", nearby: ["drouin", "bunyip"] },
  { slug: "lardner", name: "Lardner", region: "west-gippsland-latrobe", postcode: "3821", lat: -38.2, lng: 145.86, blurb: "Home of Farm World at Lardner Park — a proposed Rural Connections field-day stop — plus the farms around it.", focus: "Event connectivity conversations and farm installs.", nearby: ["warragul", "drouin"] },
  { slug: "trafalgar", name: "Trafalgar", region: "west-gippsland-latrobe", postcode: "3824", lat: -38.209, lng: 146.154, blurb: "Highway town between Warragul and Moe. Mixed residential and surrounding farms.", focus: "Town Starlink and acreage links.", nearby: ["yarragon", "moe", "warragul"] },
  { slug: "yarragon", name: "Yarragon", region: "west-gippsland-latrobe", postcode: "3823", lat: -38.204, lng: 146.061, blurb: "Small West Gippsland town on the highway. Cafes, homes and the dairy country behind.", focus: "Residential installs and farm Wi-Fi.", nearby: ["trafalgar", "warragul"] },

  { slug: "glen-waverley", name: "Glen Waverley", region: "inner-south-east", postcode: "3150", lat: -37.88, lng: 145.165, blurb: "Inner south-east travel job. Clean Starlink, cabinet and camera work when the property is a fit.", focus: "Presentation, cabinets and four-camera homes.", nearby: ["dandenong", "berwick"] },
  { slug: "berwick", name: "Berwick", region: "inner-south-east", postcode: "3806", lat: -38.033, lng: 145.348, blurb: "Between Casey and the hills. Larger homes, established trees, double-storey cable paths.", focus: "Multi-level Wi-Fi and discreet cameras.", nearby: ["officer", "narre-warren", "clyde-north", "beaconsfield"] },
  { slug: "narre-warren", name: "Narre Warren", region: "inner-south-east", postcode: "3805", lat: -38.028, lng: 145.309, blurb: "Established south-east suburb. Family homes, tiled and Colorbond roofs, and the occasional tired copper run.", focus: "Roof mounts, internal cable routes and whole-home Wi-Fi.", nearby: ["narre-warren-south", "berwick", "hallam", "cranbourne-north", "beaconsfield"] },
  { slug: "narre-warren-south", name: "Narre Warren South", region: "inner-south-east", postcode: "3805", lat: -38.055, lng: 145.295, blurb: "The southern side of Narre Warren, toward Cranbourne North. Established family homes with a mix of tile and later Colorbond roofs.", focus: "Double-storey cable paths and tidy roof mounts.", nearby: ["narre-warren", "cranbourne-north", "hallam", "lyndhurst", "cranbourne"] },
  { slug: "hallam", name: "Hallam", region: "inner-south-east", postcode: "3803", lat: -38.016, lng: 145.27, blurb: "Residential and light-industrial mix. Workshop cameras and home Starlink in the same week.", focus: "Small commercial CCTV and home installs.", nearby: ["dandenong", "narre-warren", "lyndhurst"] },
  { slug: "dandenong", name: "Dandenong", region: "inner-south-east", postcode: "3175", lat: -37.987, lng: 145.215, blurb: "City of Dandenong. Commercial CCTV, racks and the occasional Starlink on a warehouse roof.", focus: "Business cameras, cabinets and rooftop dishes.", nearby: ["hallam", "glen-waverley", "lyndhurst"] },
];

export const FOOTER_AREAS = [
  "Cranbourne",
  "Clyde",
  "Pakenham",
  "Frankston",
  "Somerville",
  "Sorrento",
  "Wonthaggi",
  "Cowes",
  "Nyora",
  "Leongatha",
  "Warragul",
  "Traralgon",
];

export function areaBySlug(slug: string) {
  return AREAS.find((a) => a.slug === slug);
}

export function regionBySlug(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}

export function areasInRegion(regionSlug: string) {
  return AREAS.filter((a) => a.region === regionSlug);
}

export function nearbyAreas(area: Area) {
  return area.nearby.map(areaBySlug).filter((a): a is Area => Boolean(a));
}

export function areaFaqs(area: Area) {
  return [
    {
      q: `Do you install Starlink in ${area.name}?`,
      a: `Yes. ${area.blurb} Enter the street address in the estimator and the quote includes travel.`,
    },
    {
      q: `How much is Starlink installation in ${area.name} ${area.postcode}?`,
      a: `The estimator prices the installation for that address, including travel. The Starlink dish, router and monthly plan stay on your Starlink account. Send photos if the roof or the cable route looks unusual.`,
    },
    {
      q: `Can you add Wi-Fi or cameras in ${area.name} later?`,
      a: `Yes. Whole-property Wi-Fi, Omada wireless links to sheds and HiLook CCTV packages are specified around the same network. You do not have to do everything on day one.`,
    },
  ];
}
