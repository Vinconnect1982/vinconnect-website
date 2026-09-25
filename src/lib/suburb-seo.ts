export type SuburbSection = {
  heading: string;
  copy: string[];
};

export type SuburbFaq = { q: string; a: string };

export type SuburbSeo = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  vinready: boolean;
  alsoNear?: string[];
  sections: SuburbSection[];
  faqs: SuburbFaq[];
};

const mount = "/resources/choosing-a-starlink-mount";
const router = "/resources/where-should-the-router-go";
const shed = "/resources/wifi-into-a-shed";
const bridge = "/resources/point-to-point-wireless";
const cable = "/resources/external-or-concealed-cabling";
const horse = "/resources/connected-horse-property";
const newHome = "/resources/new-home-starlink-ready";

export const SUBURB_SEO: Record<string, SuburbSeo> = {
  "narre-warren": {
    title: "Starlink Installation Narre Warren 3805 | VINCONNECT",
    description:
      "Professional Starlink installation in Narre Warren 3805 for homes, new builds and small businesses. Roof mounts, clean cable routes, router setup and Wi-Fi. Based in Cranbourne.",
    h1: "Starlink Installation Narre Warren",
    intro:
      "Professional Starlink installation for homes, newer builds, small businesses and larger blocks across Narre Warren and the surrounding south-east. VINCONNECT mounts the dish properly, runs the cable cleanly, and sets the router up so the rooms you actually use have a signal.",
    image: "/scenes-new/inner-se-street.webp",
    imageAlt: "Established suburban street in Melbourne's south-east, typical of the homes VINCONNECT installs for around Narre Warren.",
    vinready: true,
    alsoNear: ["cranbourne-east", "cranbourne-west", "lyndhurst"],
    sections: [
      {
        heading: "Starlink installation in Narre Warren",
        copy: [
          "Narre Warren is an established Casey suburb, not a greenfield estate. Most jobs are finished houses: two-storey family homes, single-storey brick, and the occasional renovation with a new Colorbond section on an older tile roof. Postcode 3805 also covers Narre Warren South, which has its own page.",
          "A standard install brings the cable down an external wall to a wall plate, on a weekday. Double storey, an internal route, a data cabinet or a Saturday are quoted as extras. The dish, router and Starlink plan stay on your account.",
        ],
      },
      {
        heading: "Tiled roofs, Colorbond, fascia and poles",
        copy: [
          "Older Narre Warren streets are mostly tile. Newer infill and renovated roofs are often Colorbond. We do not use the same mount for both. A tile roof takes a hockey-stick mount. A metal roof takes a tripod. Fascia and wall mounts are used when the roof is the wrong place for the sky view.",
          "A pole is for the properties where the house roof is shaded by a neighbour or a large tree and a short mast in the yard sees more sky. We only specify that after looking at the site, not from the suburb name.",
        ],
      },
      {
        heading: "Cable routes and the wall plate",
        copy: [
          "The included route is visible, clipped, and finished on a wall plate on the inside of the entry wall. That suits a lot of Narre Warren houses because the router can sit near the centre of the ground floor.",
          "Internal walls are a different job. Two-storey homes often need the cable to reach a first-floor study or a cupboard that was never designed as a comms point. That price starts at a set figure and can change once we see the plaster, the stairs and what is already in the wall.",
        ],
      },
      {
        heading: "Router placement and data cabinets",
        copy: [
          "A router hidden in a metal meter box or at the far end of a garage will not cover a double-storey Narre Warren house. We place it where the rooms are, or we extend into an existing data cabinet if the house already has one.",
          "Cabinet work is quoted separately. It is common on renovations where a previous installer left a tangle of unused copper and a single power point.",
        ],
      },
      {
        heading: "Wi-Fi, sheds and the building out the back",
        copy: [
          "Suburban blocks in Narre Warren are not farms, but detached garages, bungalows and small sheds still lose the house Wi-Fi. A mesh node works across a normal backyard. It does not work across a long drive or through several brick walls. That is a wireless link, not another extender.",
          "If the block is closer to acreage, toward Hallam or the south side of the suburb, say so when you ask for a quote. A mesh kit will not cover a paddock.",
        ],
      },
      {
        heading: "New homes and VINREADY",
        copy: [
          "Narre Warren is mostly established housing, with pockets of new building rather than whole estates like Clyde North. Where a house is still at framing or lock-up, VINREADY lets the builder include a Starlink-ready path during construction instead of cutting the finished walls later.",
          "VINREADY is another option beside NBN. It does not replace NBN, and not every new address in 3805 needs Starlink.",
        ],
      },
      {
        heading: "Small business sites",
        copy: [
          "Shops, offices and workshops in Narre Warren are quoted as commercial work. There is no online price for those jobs. Access, the roof, and where the cable can land without crossing a public area all change the visit. Send the address and we will contact you.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you install Starlink on tiled roofs in Narre Warren?",
        a: "Yes. Tile roofs use a hockey-stick mount and pole adaptor. Colorbond and other metal roofs use a tripod. If you already have a mount, we still need the roof type and we do not add a mount to the quote.",
      },
      {
        q: "Can you install Starlink on a double-storey home in Narre Warren?",
        a: "Yes. Two storeys is a separate line on the quote because the ladder, the time and the cable path are different. Book it as two storeys.",
      },
      {
        q: "Is there a completed VINCONNECT job published for Narre Warren?",
        a: "Not on this page yet. Nearby completed work includes Cranbourne East, Cranbourne West, Lyndhurst and a commercial rooftop in Pakenham. Those are labelled with the suburb they were actually in.",
      },
    ],
  },
  "narre-warren-south": {
    title: "Starlink Installation Narre Warren South 3805 | VINCONNECT",
    description:
      "Starlink installation in Narre Warren South for established family homes. Roof mounts, double-storey cable routes and Wi-Fi. VINCONNECT, based in Cranbourne.",
    h1: "Starlink Installation Narre Warren South",
    intro:
      "Narre Warren South is the family-housing side of 3805, south of the main centre and closer to Cranbourne North. Installations here are usually finished homes: tile roofs, some Colorbond, and two storeys more often than a new estate.",
    image: "/scenes-new/inner-se-street.webp",
    imageAlt: "Suburban family homes typical of Melbourne's south-east, the setting for Starlink installation around Narre Warren South.",
    vinready: true,
    alsoNear: ["cranbourne-east", "cranbourne", "lyndhurst"],
    sections: [
      {
        heading: "What a Narre Warren South install looks like",
        copy: [
          "The streets are established rather than under construction. Sky view is usually the roof, unless a neighbour's second storey or a mature tree blocks the north. We check that before choosing a tile mount, a tripod or a short fascia mount.",
          "The standard visit is a weekday cable run down an external wall to a wall plate. Travel is included from the address you enter.",
        ],
      },
      {
        heading: "Roofs and double storeys",
        copy: [
          "Concrete tile is the common older roof. Steel roofs show up on extensions and knockdown rebuilds. Double-storey cable paths are the usual extra, because the study or the main bedroom is upstairs and a ground-floor wall plate does not always suit the household.",
        ],
      },
      {
        heading: "Wi-Fi through brick and to the garage",
        copy: [
          "These are suburban blocks. Wi-Fi through the house is a better router position or a mesh system, not a farm link. A detached garage on a battle-axe block, or a long driveway, is where a wireless bridge is the right answer.",
        ],
      },
      {
        heading: "New builds in the south",
        copy: [
          "Knockdown rebuilds and small infill pockets can be prepared during construction with VINREADY. Most of Narre Warren South is already built, so the usual job is still a retrofit on a finished house.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Narre Warren South the same job as Narre Warren?",
        a: "Same postcode, different streets. South is closer to Cranbourne North and is mostly established family housing. Use the address in the quote either way.",
      },
      {
        q: "Do you come from Cranbourne?",
        a: "Yes. VINCONNECT is based in Cranbourne. Travel is calculated from the address and shown on the quote.",
      },
    ],
  },
  cranbourne: {
    title: "Starlink Installation Cranbourne 3977 | VINCONNECT",
    description:
      "Cranbourne Starlink installation from the local VINCONNECT base. Homes, clubs, cabinets and acreage on the edge of town. Quote includes travel.",
    h1: "Starlink Installation Cranbourne",
    intro:
      "VINCONNECT is based in Cranbourne. The local work is estate homes, older parts of town, club sites and the acreage toward the south. A completed job at Cranbourne Cricket Club replaced a Telstra 4G connection with Starlink and Wi-Fi into the existing data rack.",
    image: "/scenes-new/casey-estates.webp",
    imageAlt: "Newer housing on the edge of Cranbourne, the kind of estate VINCONNECT installs Starlink in.",
    vinready: true,
    sections: [
      {
        heading: "Local installation, short travel",
        copy: [
          "Because the workshop is in Cranbourne, many local addresses have little or no travel on the quote. That is calculated from the street, not assumed for the whole of 3977.",
          "The cricket club job is a finished installation: Starlink, Ubiquiti Wi-Fi, FrogBox streaming and the existing rack. It was a club, not a house, and it is not a template for every club in town.",
        ],
      },
      {
        heading: "Estates, older streets and the rural edge",
        copy: [
          "Cranbourne East and West are mostly newer double-storey homes. The south side opens into larger blocks toward Botanic Ridge and Devon Meadows. A house in town and a shed three paddocks back are different quotes.",
          "Tile and Colorbond both appear. The mount follows the roof. Fascia mounts show up on estate homes where the builder's roof should not be penetrated.",
        ],
      },
      {
        heading: "Cabinets, clubs and small business",
        copy: [
          "Cranbourne has more existing data cabinets than a brand-new estate. If the router needs to land in a rack, that is a quoted extra. Commercial sites are quoted after a conversation, not from the online house price.",
        ],
      },
      {
        heading: "VINREADY for local builders",
        copy: [
          "Builders working in Cranbourne, Clyde and the eastern estates can offer VINREADY as a variation so the home is Starlink-ready before plaster. The homeowner activates when they move in. NBN remains an option.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are you based in Cranbourne?",
        a: "Yes. VINCONNECT operates from Cranbourne and installs through the south-east, the Peninsula, Western Port and Gippsland.",
      },
      {
        q: "Was the cricket club a real installation?",
        a: "Yes. Starlink and Wi-Fi replaced the club's Telstra 4G link, with streaming into the existing data rack. The project page has the photographs.",
      },
    ],
  },
  "cranbourne-east": {
    title: "Starlink Installation Cranbourne East 3977 | VINCONNECT",
    description:
      "Starlink installation for Cranbourne East estates and double-storey homes. A completed VINCONNECT upgrade is published. VINREADY for houses still under construction.",
    h1: "Starlink Installation Cranbourne East",
    intro:
      "Cranbourne East is newer housing: double-storey homes, estate streets and roofs that should be mounted the way the house was built. A completed VINCONNECT job here used a mounted Starlink system after the previous connection kept dropping out.",
    image: "/media/projects/cranbourne-east-upgrade-hero-v5.webp",
    imageAlt: "Completed VINCONNECT Starlink installation at a Cranbourne East home.",
    vinready: true,
    sections: [
      {
        heading: "Estate homes and the completed upgrade",
        copy: [
          "The published Cranbourne East job was a finished house with an unreliable connection, not a vacant lot. The mount and cable route were chosen for that building. Your house may have a different roof and a different view of the sky.",
          "Fascia, tripod and tile mounts are all used here. We do not default to a penetration.",
        ],
      },
      {
        heading: "Double storey is the normal extra",
        copy: [
          "Two storeys change the ladder and the place the router should live. Add it on the quote if the house is double storey. Internal walls, if you want the cable hidden, are quoted from a starting price because the plaster path varies.",
        ],
      },
      {
        heading: "VINREADY before the plaster goes on",
        copy: [
          "If the house is still being built in Cranbourne East, VINREADY is the cleaner path. The builder offers it as a variation. VINCONNECT does the specialist rough-in so the home is ready to connect when the owner moves in.",
        ],
      },
      {
        heading: "Wi-Fi inside a new house",
        copy: [
          "New estate homes are full of foil sarking and insulation. A single router in the garage will not cover upstairs. Router placement, or a small mesh, is part of making the install useful. A shed in the backyard is usually still in mesh range. A second dwelling is not.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have a real Cranbourne East installation?",
        a: "Yes. The Cranbourne East job is a finished installation after the connection kept dropping out. It is one house.",
      },
      {
        q: "Can a builder add Starlink during construction?",
        a: "Yes. That is VINREADY. It prepares the home during the build. The owner activates Starlink when they are ready. It does not replace NBN.",
      },
    ],
  },
  "cranbourne-west": {
    title: "Starlink Installation Cranbourne West 3977 | VINCONNECT",
    description:
      "Starlink installation in Cranbourne West, including a completed double-storey tripod mount with no roof penetration. Quote your address online.",
    h1: "Starlink Installation Cranbourne West",
    intro:
      "Cranbourne West follows the newer-home pattern on the west side of town. A completed VINCONNECT job used an Astrogear tripod on a double-storey house so the roof did not need a penetration.",
    image: "/media/projects/cranbourne-west-roof-mount-hero-v5.webp",
    imageAlt: "Double-storey Cranbourne West home with a VINCONNECT tripod Starlink mount.",
    vinready: true,
    sections: [
      {
        heading: "Non-penetrating mounts on newer houses",
        copy: [
          "Estate roofs are often still under builder warranties. A tripod on Colorbond, or a fascia mount, is frequently the right call. Tile roofs, where they exist, take a hockey-stick mount instead. The quote asks which roof you have when a mount is being supplied.",
        ],
      },
      {
        heading: "Cable to a useful room",
        copy: [
          "The standard finish is a wall plate on the external wall. On a double-storey Cranbourne West house the household often wants the router nearer the living rooms, not in the garage. That internal route is an extra and the price can move once the walls are seen.",
        ],
      },
      {
        heading: "New builds still going up",
        copy: [
          "Where a home is not finished, VINREADY does the Starlink-ready work during construction. Cranbourne West, East and Clyde are the local places that comes up most often.",
        ],
      },
    ],
    faqs: [
      {
        q: "Did you install a tripod in Cranbourne West?",
        a: "Yes. One completed double-storey job used an Astrogear tripod without penetrating the roof. Other houses may suit a fascia or tile mount instead.",
      },
    ],
  },
  clyde: {
    title: "Starlink Installation Clyde 3978 | VINCONNECT",
    description:
      "Starlink installation for Clyde new homes, including a completed estate house connected before street internet was available. VINREADY for builders.",
    h1: "Starlink Installation Clyde",
    intro:
      "Clyde is still being built. A finished VINCONNECT installation connected a new estate home where NBN and OptiComm were not available at that address yet. That was one house. Other streets in Clyde may already have a service.",
    image: "/media/projects/clyde-new-estate-home-hero-v5.webp",
    imageAlt: "New estate home in Clyde with a completed VINCONNECT Starlink installation.",
    vinready: true,
    sections: [
      {
        heading: "New estates and houses already occupied",
        copy: [
          "Some Clyde homes are finished and lived in. Some are still at lock-up. A finished house is a retrofit: mount, cable, wall plate. A house still under construction can take VINREADY so the cable path is in the walls before plaster.",
          "Starlink is an option when the estate connection is late or the buyer wants it as well as NBN. It is not sold as a replacement for the estate network.",
        ],
      },
      {
        heading: "Roofs on new houses",
        copy: [
          "New Clyde roofs are commonly Colorbond, with tile on some builder ranges. We match the mount to the roof. Neighbour shading is the usual sky-view problem on narrow estate lots, not trees.",
        ],
      },
      {
        heading: "Wi-Fi in a foil-lined house",
        copy: [
          "New homes with sarking need the router out of the garage. Mesh covers the house. A wireless link is only for a separate building. Most Clyde lots do not have a distant shed, but some of the older lots on the fringe do.",
        ],
      },
      {
        heading: "VINREADY for Clyde builders",
        copy: [
          "Offer VINREADY as a variation. VINCONNECT handles the specialist Starlink-ready work during the build. The buyer connects when they move in. There is no public price list. The variation is quoted for the homes you are building.",
        ],
      },
    ],
    faqs: [
      {
        q: "You connected a Clyde house before the estate internet was ready?",
        a: "Yes. One completed new-estate home was connected because NBN and OptiComm were not available there yet. Check your own address. Estates change street by street.",
      },
      {
        q: "Can this be done during construction?",
        a: "Yes. That product is VINREADY by VINCONNECT. Built ready. Connected when you are.",
      },
    ],
  },
  "clyde-north": {
    title: "Starlink Installation Clyde North 3978 | VINCONNECT",
    description:
      "Starlink installation and VINREADY pre-wire for Clyde North estates. Sky view, neighbour shading and cable routes planned for new homes.",
    h1: "Starlink Installation Clyde North",
    intro:
      "Clyde North is rapid estate growth between Cranbourne East, Officer and Berwick. The usual constraints are neighbouring second storeys, narrow lots and a cable path that has to be decided before the walls are closed.",
    image: "/scenes-new/casey-estates.webp",
    imageAlt: "New housing estate typical of Clyde North and the south-east growth corridor.",
    vinready: true,
    alsoNear: ["clyde", "cranbourne-east"],
    sections: [
      {
        heading: "Estate lots, not acreage",
        copy: [
          "This is suburban new housing. A dish on the wrong roof plane looks straight into the neighbour's upper floor. We place it for sky, not for the centre of the roof. There is no published VINCONNECT project that claims to be a specific Clyde North street. Nearby completed estate work is the Clyde new-home job.",
        ],
      },
      {
        heading: "VINREADY while the house is being built",
        copy: [
          "Clyde North is one of the better places to offer VINREADY. The builder adds it as a selections item. VINCONNECT does the specialist preparation. The owner activates Starlink, NBN, or both, depending on what the address can actually get.",
        ],
      },
      {
        heading: "Router and upstairs coverage",
        copy: [
          "Double-storey display homes and standard builder plans both struggle if the only data point is in the garage. The quote can include double storey and an internal route. A data cabinet is only added if the house has one or the builder wants one.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is VINREADY available in Clyde North?",
        a: "Yes. It is aimed at builders and buyers in new estates, including Clyde North, Clyde, Officer and Pakenham.",
      },
    ],
  },
  berwick: {
    title: "Starlink Installation Berwick 3806 | VINCONNECT",
    description:
      "Starlink installation in Berwick for larger homes, established trees and double-storey cable paths. Professional mounts and Wi-Fi from VINCONNECT.",
    h1: "Starlink Installation Berwick",
    intro:
      "Berwick sits between the Casey estates and the hills. Houses are often larger, trees are established, and a double-storey cable path is a normal part of the job rather than a surprise.",
    image: "/scenes-new/inner-se-street.webp",
    imageAlt: "Tree-lined south-east Melbourne street, typical of established suburbs such as Berwick.",
    vinready: true,
    alsoNear: ["cranbourne-east", "pakenham"],
    sections: [
      {
        heading: "Trees, slopes and bigger houses",
        copy: [
          "A Berwick roof can have a clear sky or it can sit under a gum. We do not promise a mount position from the postcode. If the best sky is on a particular face of the roof, the cable run has to follow that, including on two-storey homes.",
          "Tile is common on older streets. Colorbond shows up on newer builds toward Officer and Clyde North. The mount follows the roof.",
        ],
      },
      {
        heading: "Wi-Fi through a large floor plan",
        copy: [
          "A single router will not cover a large Berwick house with a separate upstairs living zone. Mesh, or a better cabinet location, is the usual next step. Sheds and studios at the back of a deeper block may need a wireless link rather than another indoor node.",
        ],
      },
      {
        heading: "New homes on the edge of Berwick",
        copy: [
          "Infill and estate edges can use VINREADY during construction. Most of Berwick itself is already built, so the everyday job is a retrofit that respects the existing house.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do trees in Berwick stop Starlink?",
        a: "Sometimes. Obstructions are checked for the actual roof, not assumed for the suburb. The trees-and-obstructions guide explains what we look for.",
      },
    ],
  },
  officer: {
    title: "Starlink Installation Officer 3809 | VINCONNECT",
    description:
      "Starlink installation in Officer for new estates and older Cardinia blocks. VINREADY pre-wire for houses still under construction. VINCONNECT.",
    h1: "Starlink Installation Officer",
    intro:
      "Officer is where new estates meet older Cardinia properties. Sky view on a new lot is often about the house next door. On an older block it is about trees. The install method changes with the property, not with the suburb slogan.",
    image: "/scenes-new/cardinia-paddocks.webp",
    imageAlt: "Cardinia paddocks and housing, the mix of country and new estates around Officer.",
    vinready: true,
    alsoNear: ["clyde", "pakenham"],
    sections: [
      {
        heading: "Two kinds of Officer property",
        copy: [
          "Estate houses want a mount that suits a new Colorbond or tile roof and a cable path that reaches past the garage. Older properties toward Beaconsfield and Pakenham are more likely to have a shed, a larger block and a reason for a wireless link.",
          "We do not publish a completed Officer street address. The closest published new-home job is Clyde. The closest published commercial rooftop is Pakenham.",
        ],
      },
      {
        heading: "VINREADY in the growth corridor",
        copy: [
          "Officer is a priority area for VINREADY. Builders can offer a Starlink-ready home as a variation. The buyer is not locked out of NBN. They have another way to connect when they move in.",
        ],
      },
      {
        heading: "Data points in display-home plans",
        copy: [
          "If the only outlet is in the garage, say so. Moving the router to a living area, or landing it in a cabinet, is quoted. It is cheaper to plan that before handover than to open walls later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you install in Officer estates?",
        a: "Yes. New homes and finished houses are both in scope. Use VINREADY if the house is still being built.",
      },
    ],
  },
  pakenham: {
    title: "Starlink Installation Pakenham 3810 | VINCONNECT",
    description:
      "Starlink installation in Pakenham for homes and commercial roofs. A completed factory rooftop job is published. VINREADY for new estates.",
    h1: "Starlink Installation Pakenham",
    intro:
      "Pakenham covers homes on the Cardinia growth corridor and commercial roofs closer to the industrial streets. A completed VINCONNECT job was a factory rooftop installation, from the mount and cable run through commissioning.",
    image: "/media/projects/pakenham-commercial-factory-hero-v5.webp",
    imageAlt: "Commercial factory roof in Pakenham after a completed VINCONNECT Starlink installation.",
    vinready: true,
    sections: [
      {
        heading: "Homes and the factory rooftop",
        copy: [
          "A house quote and a factory quote are different. The published Pakenham job is commercial: a rooftop dish, a cable run, and the service working before we left. Homes around Pakenham are quoted as houses, with storeys, roof type and travel shown on the estimator.",
          "Commercial work does not get an online price. Send the site address and we will contact you.",
        ],
      },
      {
        heading: "New housing and VINREADY",
        copy: [
          "Pakenham's newer estates have the same construction window as Officer and Clyde. VINREADY prepares the home during the build. The factory job is not an example of VINREADY. It was a finished commercial roof.",
        ],
      },
      {
        heading: "Sheds on the older blocks",
        copy: [
          "Toward Nar Nar Goon and the edge of town, the shed is far enough that house Wi-Fi will not reach it. That is a point-to-point link, then Wi-Fi or cameras inside the shed as a separate step.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the Pakenham factory a real completed job?",
        a: "Yes. It is a published commercial rooftop installation. The price is not a house install, and it is not a template for every industrial roof.",
      },
      {
        q: "Can I get an online price for a Pakenham business?",
        a: "No. The online quote is for residential installation. Commercial sites are quoted after we speak with you.",
      },
    ],
  },
  "koo-wee-rup": {
    title: "Starlink Installation Koo Wee Rup 3981 | VINCONNECT",
    description:
      "Starlink installation in Koo Wee Rup for homes, market gardens and long flat properties. Shed links and gate cameras quoted properly.",
    h1: "Starlink Installation Koo Wee Rup",
    intro:
      "Koo Wee Rup is flat country: houses, market gardens and sheds that sit a long way from the back door. The Starlink job and the shed job are usually two different pieces of work.",
    image: "/scenes-new/cardinia-paddocks.webp",
    imageAlt: "Flat rural country typical of the properties around Koo Wee Rup.",
    vinready: false,
    alsoNear: ["tooradin", "caldermeade"],
    sections: [
      {
        heading: "A house install on flat, open country",
        copy: [
          "Sky view is often easier here than in the hills. The roof is still chosen properly: tile or Colorbond, tripod or hockey stick, and a cable down to a wall plate. Wind on an open block matters more than trees.",
        ],
      },
      {
        heading: "When the shed is too far for house Wi-Fi",
        copy: [
          "If you can see the shed from the house but the Wi-Fi dies halfway across the yard, another indoor unit will not fix it. A wireless bridge carries the network to the shed. Cameras at the gate can go on the same network later.",
        ],
      },
      {
        heading: "Town houses as well as farms",
        copy: [
          "The township itself is a normal home install. Do not let a rural page talk you into a pole and a bridge if you live on a house block. The quote starts with the address.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you get Wi-Fi to a shed in Koo Wee Rup?",
        a: "Yes, with a point-to-point link when the shed is too far for house Wi-Fi. The link and the indoor Wi-Fi inside the shed are scoped separately.",
      },
    ],
  },
  "lang-lang": {
    title: "Starlink Installation Lang Lang 3984 | VINCONNECT",
    description:
      "Starlink installation in Lang Lang for the township and surrounding farms on the road to South Gippsland. VINCONNECT, from Cranbourne.",
    h1: "Starlink Installation Lang Lang",
    intro:
      "Lang Lang sits on the way from Western Port toward South Gippsland. Enquiries are a mix of houses in town, farms, and sometimes the showgrounds. An installation and the Rural Connections roadshow are separate.",
    image: "/scenes-new/gippsland-farm.webp",
    imageAlt: "Gippsland farmland, the setting for rural Starlink installation past Lang Lang.",
    vinready: false,
    alsoNear: ["nyora", "caldermeade"],
    sections: [
      {
        heading: "Township or farm",
        copy: [
          "A house in town is a roof mount, a cable and a router. A farm toward Koo Wee Rup, Nyora or Grantville usually adds a shed, a yard or a gate. Tell us which one you are, because the equipment is different.",
        ],
      },
      {
        heading: "Mounts in open country",
        copy: [
          "Open roofs see the sky. They also take the wind. Hardware is chosen for the roof material and the exposure, not the cheapest bracket in a kit. Horse properties should say where the dish must not become a distraction for the yards.",
        ],
      },
      {
        heading: "Travel is on the quote",
        copy: [
          "Lang Lang is further out than a Cranbourne estate. Enter the address and travel is included. A normal house install still has an online quote.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you install at farms past Lang Lang?",
        a: "Yes, through Nyora, Grantville, Koo Wee Rup and Caldermeade. A link to a second building is checked on site. It is not sold as a box of mesh units.",
      },
    ],
  },
  nyora: {
    title: "Starlink Installation Nyora 3987 | VINCONNECT",
    description:
      "Starlink installation in Nyora with two completed VINCONNECT jobs: a new home tied into existing CCTV, and a roof mount that replaced unreliable fixed wireless at that property.",
    h1: "Starlink Installation Nyora",
    intro:
      "Nyora has two published VINCONNECT installations. One was a newly occupied home, mounted without a roof penetration and tied into the existing CCTV. The other was a roof-mounted system that replaced an unreliable fixed-wireless connection at that rural property.",
    image: "/media/projects/nyora-fixed-wireless-upgrade-hero-v6.webp",
    imageAlt: "Rural Nyora property with a completed roof-mounted VINCONNECT Starlink installation.",
    vinready: false,
    sections: [
      {
        heading: "What those two jobs actually were",
        copy: [
          "Those are two properties. They do not mean every address in Nyora is on fixed wireless, or that every new home needs Starlink. The nbn service still varies by address. If fixed wireless is dropping out at your house, it is worth comparing.",
          "Horse properties and new houses sit in the same postcode. A shed across a paddock needs its own link.",
        ],
      },
      {
        heading: "Roof mounts without guessing",
        copy: [
          "The new-home job avoided a penetration. The fixed-wireless replacement was roof-mounted. Your roof might want a tripod, a tile mount or a fascia bracket. The quote asks. We do not copy the last job onto the next roof.",
        ],
      },
      {
        heading: "CCTV that already exists",
        copy: [
          "The new-home job connected Starlink to cameras that were already there. If you want new cameras, that is a separate scope. We do not imply the Nyora CCTV job is a package price.",
        ],
      },
    ],
    faqs: [
      {
        q: "Did Starlink replace fixed wireless in Nyora?",
        a: "At one completed property, yes. That does not mean the whole town is on fixed wireless. Check the address you actually have.",
      },
      {
        q: "Was there a new-home install as well?",
        a: "Yes. A newly occupied home was connected with a non-penetrating mount and linked to the existing CCTV.",
      },
    ],
  },
  warragul: {
    title: "Starlink Installation Warragul 3820 | VINCONNECT",
    description:
      "Starlink installation in Warragul for town homes and surrounding farms. Travel is on the quote. VINCONNECT installs from Cranbourne.",
    h1: "Starlink Installation Warragul",
    intro:
      "Warragul is the West Gippsland centre. Town houses and farms outside town are both installed, and they are priced differently. Travel from Cranbourne is on the quote once you enter the address.",
    image: "/scenes-new/cattle-farm.webp",
    imageAlt: "West Gippsland farmland typical of the properties around Warragul.",
    vinready: false,
    sections: [
      {
        heading: "Town install or farm install",
        copy: [
          "In town, the work is a roof, a cable and Wi-Fi that covers the house. On a farm, add the shed, the yards or the second dwelling only if you actually need them. A mesh node will not cross a paddock.",
          "Warragul is also a proposed Rural Connections show stop. That is a community program. It is not how you book an installation.",
        ],
      },
      {
        heading: "Roofs and weather",
        copy: [
          "Tile and steel both appear. Open farm roofs take more wind than a sheltered town street. The mount is chosen for that roof. Double-storey townhouses add the double-storey line on the quote.",
        ],
      },
      {
        heading: "Businesses in town",
        copy: [
          "Shops and small commercial sites are quoted individually. Use the contact form and mark the property as commercial. The online estimator is the residential price.",
        ],
      },
    ],
    faqs: [
      {
        q: "How does travel to Warragul work?",
        a: "Enter the address. Travel is included on the residential quote. It is a longer trip than a Cranbourne estate.",
      },
    ],
  },
  drouin: {
    title: "Starlink Installation Drouin 3818 | VINCONNECT",
    description:
      "Starlink installation in Drouin, where newer estates meet dairy country. House Wi-Fi and acreage links are quoted as different jobs.",
    h1: "Starlink Installation Drouin",
    intro:
      "Drouin sits between Pakenham and Warragul. One side of town is newer housing. The other opens into dairy country. A house install and a link to a shed are different jobs even when they share a postcode.",
    image: "/scenes-new/cattle-farm.webp",
    imageAlt: "Farm country between the estates and the paddocks around Drouin.",
    vinready: true,
    alsoNear: ["pakenham"],
    sections: [
      {
        heading: "Estates on one side, farms on the other",
        copy: [
          "Newer streets behave like Officer or Pakenham: Colorbond or tile, double storey, router placement. Farm properties behave like the rest of West Gippsland: distance, sheds and a real wireless link.",
          "Say which one you are when you start the quote. The address usually makes it obvious.",
        ],
      },
      {
        heading: "New homes",
        copy: [
          "Where Drouin is still being built, VINREADY can be offered by the builder during selections. It prepares the house for Starlink. It does not cancel an NBN order.",
        ],
      },
      {
        heading: "No invented Drouin case study",
        copy: [
          "There is no published VINCONNECT project in Drouin yet. Nearby published work includes the Pakenham factory roof. That job was in Pakenham, not a Drouin house.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you install on Drouin farms?",
        a: "Yes. Sheds and second buildings are scoped as wireless links when they are too far for house Wi-Fi.",
      },
    ],
  },
  wonthaggi: {
    title: "Starlink Installation Wonthaggi 3995 | VINCONNECT",
    description:
      "Starlink installation in Wonthaggi for town homes, shops and the farms behind Bass Coast. Travel is quoted. Coastal wind is part of the mount choice.",
    h1: "Starlink Installation Wonthaggi",
    intro:
      "Wonthaggi is the Bass Coast centre: homes and shops in town, farms behind it, and coastal weather that shows up in the hardware. Inverloch and Grantville are the neighbouring pages.",
    image: "/scenes-new/bass-coast-bay.webp",
    imageAlt: "Bass Coast landscape, the wider setting for installation work around Wonthaggi.",
    vinready: false,
    sections: [
      {
        heading: "Town, then the farms",
        copy: [
          "A Wonthaggi house is a straightforward roof and cable job, with travel on the quote. A property out toward Dalyston or the farms behind town often adds a shed. We do not price the farm as if it were a street in town.",
        ],
      },
      {
        heading: "Wind and the mount",
        copy: [
          "Coastal and open sites need a mount that stays put. Tile and steel are both common. A tripod or hockey-stick mount is chosen from the roof, then fixed properly. Salt air is a reason to choose the right bracket.",
        ],
      },
      {
        heading: "Shops and commercial",
        copy: [
          "Shops in town are commercial quotes. Call or send the enquiry. The online estimator stays on residential work.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you come to Wonthaggi?",
        a: "Yes. It is a regular Bass Coast work area. Travel is shown once the address is entered.",
      },
    ],
  },
  cowes: {
    title: "Starlink Installation Cowes, Phillip Island | VINCONNECT",
    description:
      "Starlink installation in Cowes and on Phillip Island. Holiday homes, businesses and rural corners. Travel from Cranbourne is on the quote.",
    h1: "Starlink Installation Cowes",
    intro:
      "Cowes is the Phillip Island base. Holiday homes, permanent houses, small businesses and the rural west of the island are all in scope. The quote includes getting there from Cranbourne, including bridge timing.",
    image: "/scenes-new/bass-coast-bay.webp",
    imageAlt: "Coastal Victoria, the setting for Phillip Island and Cowes installation work.",
    vinready: false,
    sections: [
      {
        heading: "Holiday homes and permanent houses",
        copy: [
          "A holiday house still needs a mount that survives the wind while nobody is there, and a router position that covers the rooms guests actually use. Cameras come up often because the house is empty midweek. Cameras are a separate scope from the dish.",
        ],
      },
      {
        heading: "Salt, wind and compact roofs",
        copy: [
          "Island roofs are often modest. A tripod or fascia mount is frequently kinder than a penetration. Hardware is specified for salt air. We do not use inland brackets and hope.",
        ],
      },
      {
        heading: "The rest of the island",
        copy: [
          "Cowes is the town page. The Phillip Island page covers the wider island, including farms away from the foreshore. San Remo is the bridge end. Use the page that matches the address.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Phillip Island travel extra?",
        a: "Travel is calculated from the Cowes address you enter and shown on the residential quote. It is not absorbed into a Cranbourne house price.",
      },
    ],
  },
  "phillip-island": {
    title: "Starlink Installation Phillip Island | VINCONNECT",
    description:
      "Phillip Island Starlink installation for holiday homes, farms and venues. Quoted from Cranbourne, including the trip across the bridge.",
    h1: "Starlink Installation Phillip Island",
    intro:
      "Phillip Island work runs from Cowes through the rural west. It is quoted from Cranbourne and it includes the trip. A holiday house on a small block and a farm on the island are not treated as the same job.",
    image: "/scenes-new/bass-coast-bay.webp",
    imageAlt: "Coastal water and land typical of Phillip Island installation trips.",
    vinready: false,
    sections: [
      {
        heading: "Where the address actually is",
        copy: [
          "Use the Cowes page for the town, San Remo for the mainland side of the bridge, and this page for the wider island. The estimator uses the street address either way, so the travel figure follows the pin, not the page title.",
        ],
      },
      {
        heading: "Farms and venues",
        copy: [
          "Rural parts of the island need shed and yard connectivity in the same way South Gippsland does. Venues that want guest Wi-Fi need a design, not a single router in a kiosk. Event Link is temporary event internet. A permanent island install is a different job.",
        ],
      },
      {
        heading: "Mounts that can be left",
        copy: [
          "Holiday houses are unattended. The mount has to be finished, sealed and obvious to the owner before we leave. We do not leave a temporary setup as the permanent job unless that was the booking.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you cover the whole island?",
        a: "Yes, by address. Cowes, the rural west and San Remo each have a page so the local notes stay specific.",
      },
    ],
  },
  leongatha: {
    title: "Starlink Installation Leongatha 3953 | VINCONNECT",
    description:
      "Starlink installation in Leongatha for homes, farms and small businesses in South Gippsland. Travel is itemised. VINCONNECT.",
    h1: "Starlink Installation Leongatha",
    intro:
      "Leongatha is the South Gippsland hub. Homes in town, farms around it, and small businesses all come through. Travel from Cranbourne is part of the quote. It is a different trip from a Cranbourne estate.",
    image: "/scenes-new/gippsland-farm.webp",
    imageAlt: "South Gippsland farm country around the Leongatha district.",
    vinready: false,
    alsoNear: ["nyora", "caldermeade"],
    sections: [
      {
        heading: "A regional install, quoted properly",
        copy: [
          "The residential estimator still applies: standard install, roof mount if you need one, double storey, internal cable, cabinet, Saturday and travel. What changes is the travel line and, on a farm, whether a second building is in scope.",
        ],
      },
      {
        heading: "Farms around Leongatha",
        copy: [
          "Korumburra, Meeniyan and Mirboo North are the neighbouring pages. Sheds, dairies and yards away from the house need a wireless link. House Wi-Fi will not reach that far, and the link does not replace Wi-Fi inside the shed.",
        ],
      },
      {
        heading: "No fake Leongatha case study",
        copy: [
          "There is no completed Leongatha project published on this site yet. Nearby published rural work includes Nyora and Caldermeade. Those pages name the suburb the job was actually in.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you install for Leongatha farms?",
        a: "Yes. Multi-building farms are scoped as a house install plus the links they actually need.",
      },
    ],
  },
  frankston: {
    title: "Starlink Installation Frankston 3199 | VINCONNECT",
    description:
      "Starlink installation in Frankston for houses, units and small commercial sites. Sky view, cable entry and cabinet work. VINCONNECT.",
    h1: "Starlink Installation Frankston",
    intro:
      "Frankston is the Peninsula gateway: houses, units and small commercial buildings. The job is still a clear view of the sky, a sealed cable entry and a router or cabinet that can be worked on later.",
    image: "/scenes-new/peninsula-home.webp",
    imageAlt: "Peninsula home, typical of the housing between Frankston and the coast.",
    vinready: false,
    sections: [
      {
        heading: "Houses and units",
        copy: [
          "A freestanding Frankston house can take a roof or fascia mount like anywhere else. A unit, or a property with an owners corporation, may not allow a roof mount. If body corporate rules apply, tell us before the day is booked.",
        ],
      },
      {
        heading: "Cabinets and existing cabling",
        copy: [
          "Older Peninsula houses sometimes already have a cabinet or a messy phone frame. Landing Starlink there is quoted. It is not assumed in the standard wall-plate install.",
        ],
      },
      {
        heading: "Commercial Frankston",
        copy: [
          "Workshops and small commercial sites are quoted after a look at access and the roof. Use the commercial path on the estimator or the enquiry form.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you install Starlink on a Frankston unit?",
        a: "Only if the building allows it. Owners-corporation rules decide the mount. Tell us before the quote becomes a booking.",
      },
    ],
  },
  langwarrin: {
    title: "Starlink Installation Langwarrin 3910 | VINCONNECT",
    description:
      "Starlink installation in Langwarrin for larger suburban blocks between Frankston and Somerville. Whole-home Wi-Fi and roof mounts.",
    h1: "Starlink Installation Langwarrin",
    intro:
      "Langwarrin sits between Frankston and Somerville, where the blocks get larger and a single hallway router starts to fail. It is the start of Peninsula acreage without being a farm.",
    image: "/scenes-new/peninsula-home.webp",
    imageAlt: "Peninsula house and garden, typical of larger blocks around Langwarrin.",
    vinready: false,
    alsoNear: ["somerville", "pearcedale"],
    sections: [
      {
        heading: "Bigger blocks, ordinary roofs",
        copy: [
          "Roofs are a mix of tile and Colorbond. The mount follows the material. The more interesting problem is coverage: the back of the block, a granny flat, or a shed that the house Wi-Fi almost reaches and then doesn't.",
          "If it almost reaches, test a mesh node. If it doesn't reach at all, it is a wireless bridge. We will say which one after the distance is clear.",
        ],
      },
      {
        heading: "Between two work areas",
        copy: [
          "Frankston is the urban side. Somerville and Pearcedale are where the properties get properly rural. A completed Somerville tripod job and a Pearcedale five-acre job are the nearest published installations. They are not Langwarrin jobs.",
        ],
      },
      {
        heading: "Cameras on a family block",
        copy: [
          "A small camera kit is common once the network exists. Cameras need cable or a proper wireless plan. They are not an add-on sticker on the Starlink quote unless you ask for them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Langwarrin a rural install?",
        a: "Usually no. Most Langwarrin jobs are larger suburban blocks. Acreage toward Pearcedale is the point where a shed link becomes likely.",
      },
    ],
  },
};

export const PRIORITY_SUBURB_LINKS: { slug: string; label: string }[] = [
  { slug: "narre-warren", label: "Narre Warren" },
  { slug: "cranbourne", label: "Cranbourne" },
  { slug: "clyde", label: "Clyde" },
  { slug: "clyde-north", label: "Clyde North" },
  { slug: "berwick", label: "Berwick" },
  { slug: "officer", label: "Officer" },
  { slug: "pakenham", label: "Pakenham" },
  { slug: "koo-wee-rup", label: "Koo Wee Rup" },
  { slug: "nyora", label: "Nyora" },
  { slug: "warragul", label: "Warragul" },
  { slug: "drouin", label: "Drouin" },
  { slug: "wonthaggi", label: "Wonthaggi" },
  { slug: "cowes", label: "Cowes" },
  { slug: "leongatha", label: "Leongatha" },
  { slug: "frankston", label: "Frankston" },
];

export const GUIDE_CLUSTER = [
  { href: mount, label: "Choosing a Starlink mount" },
  { href: cable, label: "External or concealed cable" },
  { href: router, label: "Where the router should go" },
  { href: shed, label: "Wi-Fi into a shed" },
  { href: bridge, label: "Point-to-point wireless" },
  { href: newHome, label: "New-home Starlink notes" },
  { href: horse, label: "Horse property networks" },
];
