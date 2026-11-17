import type { GuideText } from "@/lib/guide/types";

const en: GuideText = {
  nav: { culture: "Culture", itineraries: "Itineraries", practical: "Practical", food: "Food" },

  ger: {
    doorKicker: "Welcome",
    doorTitle: "Step into a ger",
    doorLead:
      "Everything on this site lives inside a Mongolian ger. Open the door, and look at what is standing around you.",
    doorAction: "Open the door",
    skip: "Go straight to the site",
    sceneTitle: "Inside the ger",
    hint: "Pick up the things in the ger",
    scrollHint: "or browse all 21 provinces",
    back: "Step outside",
    close: "Close",
    objectsLabel: "Things in the ger",
    doorAria: "Open the ger door and go inside",
    objects: {
      map: {
        name: "The map on the wall",
        teaser:
          "Twenty-one provinces, each with its own landscape — glaciers in the Altai, dunes in the Gobi, taiga in the north and steppe without end.",
        cta: "See the 21 provinces",
      },
      chest: {
        name: "The painted chest",
        teaser:
          "Inside: a deel, a silver bowl, a snuff bottle. The things a Mongolian household keeps — and the unwritten rules that come with them.",
        cta: "Culture and customs",
      },
      ticket: {
        name: "The plane ticket on the table",
        teaser:
          "Chinggis Khaan International Airport, 50 km south of Ulaanbaatar. Visas, flights, money and the long road that starts there.",
        cta: "How to get to Mongolia",
      },
      pot: {
        name: "The pot on the hearth",
        teaser:
          "Buuz, khuushuur, tsuivan and salted milk tea: what goes into the pot, and what is poured for every guest who comes in.",
        cta: "Mongolian food",
      },
    },
  },

  search: {
    open: "Search",
    title: "Search",
    placeholder: "A province, a sight, a page…",
    hint: "Try “Gobi”, “eagle”, “Khövsgöl” or “visa”.",
    empty: (q) => `Nothing found for “${q}”.`,
    emptyHint: "Check the spelling, or try the name of a province or a sight.",
    provinces: "Provinces",
    sights: "Sights",
    pages: "Pages",
    close: "Close search",
    results: (n) => `${n} ${n === 1 ? "result" : "results"}`,
  },

  /* ================= itineraries ================= */
  itineraries: {
    kicker: "Itineraries",
    pageTitle: "Six ways across Mongolia",
    pageLead:
      "Mongolia is the size of Western Europe with almost no motorways, so a good trip is built around one region rather than all of them. These six routes are the classics — take them as they are, or cut and join them.",
    metaDescription:
      "Six suggested routes through Mongolia — the Gobi loop, the Orkhon Valley, Lake Khövsgöl, the eastern steppe, the Altai and a short trip from Ulaanbaatar — with stops, length and the best season.",
    daysLabel: (from, to) => (from === to ? `${from} days` : `${from}–${to} days`),
    distanceLabel: (km) => `≈ ${km.toLocaleString("en-US")} km`,
    bestTimeLabel: "Best time",
    stopsLabel: "The route",
    tipLabel: "Good to know",
    provincesLabel: "Provinces on this route",
    openProvince: (name) => `Open ${name}`,
    note:
      "Distances are rough driving figures from Ulaanbaatar and back, on roads that are often unpaved. Reckon on 250–350 km a day rather than a motorway pace, and add a spare day for weather, rivers and breakdowns.",
    routes: {
      short: {
        name: "Three days from Ulaanbaatar",
        summary:
          "The short trip for a layover or a tight week: grassland, granite mountains and wild horses, all within a morning’s drive of the capital.",
        bestTime: "All year — easiest May to October",
        tip: "Everything here can be done as day trips from Ulaanbaatar, but one night in a ger camp changes the whole experience. The sky after dark is the point.",
        stops: [
          {
            place: "Ulaanbaatar",
            text: "Gandan monastery and its 26-metre standing Buddha, the National Museum for the empire in one hour, and the Zaisan hill for the layout of the city.",
          },
          {
            place: "Gorkhi-Terelj National Park",
            text: "Granite outcrops, larch forest and easy walks an hour and a half east of the city. The 40-metre steel Chinggis Khaan statue at Tsonjin Boldog is on the way.",
          },
          {
            place: "Khustai National Park",
            text: "The home of the takhi, the only truly wild horse left on earth, reintroduced here from zoos in 1992. Dawn and dusk are when the herds come down to drink.",
          },
        ],
      },

      orkhon: {
        name: "The Orkhon Valley and the Khangai",
        summary:
          "The historical heart of the country: the imperial capital, the oldest monastery, a waterfall, hot springs and a volcano, through the green mountains of the Khangai.",
        bestTime: "Late May – September",
        tip: "This is the route to pick if you only make one trip outside the capital. It has history, forest, water and steppe, and the driving days are shorter than on any other loop.",
        stops: [
          {
            place: "Gorkhi-Terelj and Khustai",
            text: "Ease into the distances with a first night close to the city, among granite towers or wild horses.",
          },
          {
            place: "Kharkhorin, Erdene Zuu and the Orkhon waterfall",
            text: "Karakorum was the capital of the largest contiguous land empire in history; Erdene Zuu, walled in 108 stupas, was built from its stones in 1586. The Ulaan Tsutgalan waterfall and the Tövkhön hermitage are a day further.",
          },
          {
            place: "Tsenkher hot springs, Terkhiin Tsagaan Nuur and Khorgo",
            text: "Soak in open-air hot pools, then climb the crater of the Khorgo volcano whose lava dammed the valley and made the White Lake.",
          },
          {
            place: "Uran Togoo and the road home",
            text: "A small extinct volcano with a forested crater lake, an easy last stop before the paved road back to Ulaanbaatar.",
          },
        ],
      },

      gobi: {
        name: "The classic Gobi loop",
        summary:
          "Ice in a desert gorge, singing dunes, the cliffs where the first dinosaur eggs were found, and a ruined monastery on the way back north.",
        bestTime: "May – June and September – October",
        tip: "The Gobi is gravel and rock far more than sand, and it swings from 35 °C at noon to near freezing at night. Avoid July and August if you can; bring more water than you think you need.",
        stops: [
          {
            place: "Baga Gazriin Chuluu and Tsagaan Suvarga",
            text: "Granite hills with a hidden spring, then the striped sixty-metre clay cliffs of the “white stupa”, the edge of an ancient seabed.",
          },
          {
            place: "Yolyn Am, Khongoryn Els and Bayanzag",
            text: "A gorge in the Gurvan Saikhan mountains that holds ice into summer, 180 km of dunes up to 300 m high, and the Flaming Cliffs where Roy Chapman Andrews found dinosaur eggs in 1922.",
          },
          {
            place: "Bayangovi and the Bichigt rock art",
            text: "Red cliffs, rock paintings and the quiet western Gobi, where the road sees a vehicle an hour at most.",
          },
          {
            place: "Ongi monastery and Kharkhorin",
            text: "The ruins of a monastery destroyed in 1937 on the bank of the Ongi river, then back north through the old imperial capital.",
          },
        ],
      },

      khuvsgul: {
        name: "Lake Khövsgöl and the taiga",
        summary:
          "North to the edge of Siberia: a monastery in the hills, an extinct volcano, and a lake 262 m deep holding one per cent of the world’s fresh water.",
        bestTime: "June – September",
        tip: "The lake shore is cold even in July and the mosquitoes are serious in midsummer. Visiting the Tsaatan reindeer herders means a long horse ride into the taiga and should be arranged with a community-run operator.",
        stops: [
          {
            place: "Amarbayasgalant monastery",
            text: "One of the three great monasteries of Mongolia, built in the 1730s for Zanabazar in a quiet valley, and one of the few that survived the 1930s almost intact.",
          },
          {
            place: "Uran Togoo",
            text: "An extinct volcano you can walk around in an hour, with a crater lake and larch forest — a good halfway night.",
          },
          {
            place: "Khatgal and Lake Khövsgöl",
            text: "Kayaking, horse riding and walking along the western shore, under mountains that run on into the Siberian taiga. In early March the ice festival is held on the frozen lake.",
          },
          {
            place: "Terkhiin Tsagaan Nuur",
            text: "A second lake and a volcano on the southern road home, which turns the trip into a loop rather than an out-and-back.",
          },
        ],
      },

      east: {
        name: "The eastern steppe and the Chinggis trail",
        summary:
          "The emptiest and greenest quarter of the country: the birthplace of Chinggis Khaan, grassland to the horizon in every direction, gazelle herds and a field of extinct volcanoes.",
        bestTime: "June – September",
        tip: "The east gets a fraction of Mongolia’s visitors, so expect fewer ger camps and more homestays and camping. The grass is at its best in July, right after the summer rain.",
        stops: [
          {
            place: "Deluun Boldog and Baldan Bereeven",
            text: "The hill by the Onon river said to be the birthplace of Temüjin in 1162, and a large monastery in the Khentii mountains slowly being rebuilt.",
          },
          {
            place: "Kherlen river, Khökh Nuur and the Menen steppe",
            text: "The lake where Temüjin was first raised as a khan, and one of the largest unbroken grasslands left on earth, crossed by herds of Mongolian gazelle.",
          },
          {
            place: "Dariganga, Shiliin Bogd and Ganga Nuur",
            text: "A volcanic field of more than 200 craters, the sacred cone of Shiliin Bogd at sunrise, and a small lake where thousands of swans stop each autumn.",
          },
          {
            place: "Khamar monastery and Sainshand",
            text: "The desert monastery of the poet-monk Danzanravjaa and its “energy centre”, on the railway line back to the capital.",
          },
        ],
      },

      altai: {
        name: "The Altai and the eagle hunters",
        summary:
          "Mongolia’s far west, where glaciers come down from 4,000-metre peaks, the villages are Kazakh, and hunters ride out in winter with golden eagles on their arms.",
        bestTime: "June – September; early October for the eagle festival",
        tip: "Fly to Ölgii rather than drive — the road from Ulaanbaatar is 1,700 km. Tavan Bogd needs a border permit and a national park fee, arranged in advance through a local operator.",
        stops: [
          {
            place: "Ölgii and Altai Tavan Bogd",
            text: "A Kazakh town of mosques and markets, then the five holy peaks on the Russian and Chinese border, the Potanin glacier, and the Tsagaan Salaa petroglyphs.",
          },
          {
            place: "Khar Us Nuur and Tsambagarav",
            text: "A huge reed-fringed lake that pulls in pelicans and cranes, under a glaciated 4,200-metre massif.",
          },
          {
            place: "Uvs Nuur and Kharkhiraa",
            text: "A salt lake bigger than any other in Mongolia, in a UNESCO-listed basin that runs from desert to glacier within a hundred kilometres.",
          },
          {
            place: "Khar Nuur and the Zavkhan dunes",
            text: "The long way home: freshwater lakes pressed against 100 km of sand dunes, one of the strangest landscapes in the country.",
          },
        ],
      },
    },
  },

  /* ================= culture ================= */
  culture: {
    kicker: "Culture and customs",
    pageTitle: "How Mongolia works",
    pageLead:
      "Mongolian hospitality is unconditional and its rules are unwritten. None of them are hard, and nobody expects a visitor to know them all — but knowing a few changes how a trip feels.",
    metaDescription:
      "Mongolian culture for visitors: ger etiquette, greetings, food, Naadam, music, Buddhism and shamanism, the script, and the nomadic year — with a short list of dos and don’ts.",
    intro: [
      "For most of its history Mongolia has been a country of moving households rather than towns. Almost everything a visitor notices — the shape of the ger, the way food is offered, which direction you walk around a cairn — comes from that.",
      "Herding still supports a large share of the population, and in 2026, a year the United Nations declared the International Year of Rangelands and Pastoralists at Mongolia’s proposal, it remains a living way of life rather than a heritage display.",
    ],
    sections: {
      ger: {
        title: "Inside a ger",
        text: "A ger is one round room, and every part of it is spoken for. You will be invited into one sooner or later, usually without warning and always with tea.",
        points: [
          "Step over the threshold, never on it, and go in and move around to the left (clockwise).",
          "The back of the ger, the khoimor, is for elders, guests of honour and the family altar. Wait to be shown where to sit.",
          "Take whatever is offered with your right hand, or with both, supporting your right elbow with your left hand.",
          "At least taste the tea, the dairy and the vodka, even if you only touch it to your lips. Refusing outright is the one real discourtesy.",
          "Don’t lean on the two central posts, don’t point your feet at the hearth or the altar, and don’t whistle indoors.",
        ],
      },
      greetings: {
        title: "Greetings and small courtesies",
        text: "Greetings in Mongolia are physical and warm, and a few of them survive only here.",
        points: [
          "Zolgokh is the formal greeting of Tsagaan Sar: the younger person holds their arms under the elder’s elbows and both say amar baina uu.",
          "Men exchange a snuff bottle, khöörög, passed and returned with the right hand. Take it, open it, sniff or just raise it, and hand it back.",
          "If you step on someone’s foot, shake their hand straight away. It is automatic and it is not a joke.",
          "Hand over money, cards and gifts with the right hand, supporting the elbow — the same gesture as receiving.",
          "Shout nokhoi khorio — “hold the dog” — before you walk into a family’s yard. It is both a greeting and a sensible precaution.",
        ],
      },
      food: {
        title: "Meat, milk and the two seasons of eating",
        text: "Countryside cooking divides into “white food” from milk in summer and “red food” from meat in winter. Vegetables are a recent and still thin layer on top.",
        points: [
          "Buuz are steamed mutton dumplings, khuushuur the fried version, and tsuivan a one-pan dish of hand-cut noodles, meat and whatever else is to hand.",
          "Khorkhog and boodog are cooked with fire-heated stones, in a milk can or inside the animal itself — the celebration meal of the countryside.",
          "Airag is fermented mare’s milk, mildly alcoholic and slightly sour, drunk by the bowl in summer. Start with a small one.",
          "Suutei tsai, milk tea with salt, is poured for every guest; aaruul, rock-hard dried curd, sits drying on every ger roof.",
          "Vegetarians can manage in Ulaanbaatar but should carry supplies in the countryside and say so, kindly and early.",
        ],
      },
      naadam: {
        title: "Naadam and the three manly games",
        text: "The national festival runs on 11–13 July, nationally in Ulaanbaatar and in every province and district on its own dates through the summer.",
        points: [
          "Wrestling has no weight classes and no time limit; the loser is whoever first touches the ground with anything above the knee.",
          "Archery is shot by men and women at a wall of small leather cylinders, with judges singing the result back down the range.",
          "The horse races are cross-country over 10–25 km, ridden by children, and judged on the horse rather than the rider.",
          "Anklebone shooting, shagai harvaa, is the quiet fourth event, and the easiest one to watch up close.",
          "A district naadam in the countryside is smaller, free, and far more welcoming than the stadium in the capital.",
        ],
      },
      music: {
        title: "Music made for open country",
        text: "Mongolian music was written for distance: for calling animals, for crossing a valley, for a single voice in a very big landscape.",
        points: [
          "The morin khuur, the horsehead fiddle, has two horsehair strings and is on the UNESCO list of intangible heritage.",
          "Khöömii is throat singing: one singer producing a drone and a whistling melody at the same time.",
          "Urtyn duu, the long song, stretches a handful of words over minutes of ornament — herding music, not concert music.",
          "Biyelgee is a dance performed sitting or on the spot, because there is no room to travel inside a ger.",
          "Tsam is the masked monastic dance, suppressed in the 1930s and revived at a few monasteries since the 1990s.",
        ],
      },
      faith: {
        title: "Buddhism, shamanism and the ovoo",
        text: "Tibetan Buddhism and an older shamanism have lived alongside each other for centuries, and most Mongolians see no contradiction in using both.",
        points: [
          "Walk clockwise around temples, stupas and prayer wheels, and around the inside of any monastery courtyard.",
          "An ovoo is a cairn on a pass or a summit. Circle it three times clockwise and add a stone; keep the offerings where they are.",
          "Gandantegchinlen in Ulaanbaatar is the centre of Mongolian Buddhism; Erdene Zuu, founded in 1586, is the oldest surviving monastery.",
          "Burkhan Khaldun in Khentii, the sacred mountain of Chinggis Khaan, is a UNESCO World Heritage site.",
          "Around 18,000 monks were killed and almost every monastery destroyed in the purges of the late 1930s. Most of what stands today was rebuilt after 1990.",
        ],
      },
      script: {
        title: "Two scripts, one language",
        text: "Mongolian is written in Cyrillic today, but the vertical script of the empire never disappeared and is coming back into official use.",
        points: [
          "Cyrillic has been standard since the 1940s and uses two letters you won’t know from Russian: ө and ү.",
          "Mongol bichig, the classical script, runs vertically down the page and is still used in Inner Mongolia and on seals, logos and banknotes.",
          "The state has been phasing the classical script back into official documents alongside Cyrillic.",
          "Place names shift spelling between languages: Khövsgöl, Hovsgol and Xөвсгөл are all the same lake.",
          "English is widely spoken by young people in Ulaanbaatar and rarely in the countryside; Russian is common among older people.",
        ],
      },
      year: {
        title: "The herding year",
        text: "A herding family moves with the seasons, usually between two and four times a year, and a ger can be taken down and loaded in about an hour.",
        points: [
          "The five animals, tavan khoshuu mal, are horses, cattle or yak, camels, sheep and goats.",
          "Summer is for milk: mares are milked through the day and the year’s dairy is made and dried for winter.",
          "Autumn is for fattening and slaughter, and winter for surviving on what was put by.",
          "A dzud — drought followed by a brutal winter — can kill millions of animals, and still shapes rural life and migration to the city.",
          "Dried dung, argal, is the fuel of the steppe, where there is no wood for hundreds of kilometres.",
        ],
      },
    },
    foodLink: "Mongolian food, dish by dish",
    etiquetteTitle: "A short list",
    etiquetteLead: "If you remember nothing else from this page, remember these.",
    doTitle: "Do",
    dontTitle: "Avoid",
    dos: [
      "Accept food and drink with your right hand and at least taste it",
      "Walk clockwise — around a ger, a temple, an ovoo",
      "Call out before entering a yard, and let someone deal with the dogs",
      "Ask before photographing people, animals or inside a temple",
      "Take your rubbish back out with you; there is no collection in the countryside",
    ],
    donts: [
      "Step on a threshold, or lean against the posts of a ger",
      "Point your feet, or anything sharp, at the hearth, the altar or a person",
      "Touch someone’s head or hat, or walk between an elder and the fire",
      "Write a Mongolian person’s name in red, or turn down a bowl without touching it",
      "Pick up artefacts, bones or stones from a grave, an ovoo or a dinosaur site",
    ],
  },

  /* ================= practical ================= */
  practical: {
    kicker: "Before you go",
    pageTitle: "Practical Mongolia",
    pageLead:
      "Getting in, getting around, getting money and staying comfortable in a country with three people per square kilometre. The honest version, including what is harder than it looks.",
    metaDescription:
      "Practical travel information for Mongolia: visas and entry, flights and trains, driving and domestic flights, money, SIM cards, health and safety, accommodation, packing, useful phrases and emergency numbers.",
    sections: {
      visa: {
        title: "Visas and entry",
        text: "Mongolia has steadily opened up, and many nationalities now arrive without a visa at all. The lists change from year to year, so this is the one thing to verify yourself.",
        points: [
          "Citizens of many countries may enter visa-free for up to 30 days under a programme the government keeps extending.",
          "Everyone else applies through the official e-visa system before travelling; approval normally takes a few working days.",
          "A passport valid for at least six months beyond arrival is the usual requirement.",
          "Staying longer than 30 days means registering with the Immigration Agency within the first week, usually handled by your hotel or host.",
          "Check the Ministry of Foreign Affairs or your nearest Mongolian embassy before you book anything — nothing on this page replaces that.",
        ],
      },
      arriving: {
        title: "Getting there",
        text: "Almost everyone arrives through Ulaanbaatar, by air from Asia and Europe or overland on the railway between Russia and China.",
        points: [
          "Chinggis Khaan International Airport sits about 50 km south of Ulaanbaatar; the expressway takes 40–60 minutes.",
          "Direct flights connect Seoul, Beijing, Tokyo, Istanbul, Frankfurt, Hong Kong, Bangkok and several Chinese and Russian cities, with more in summer.",
          "The Trans-Mongolian Railway runs Beijing–Ulaanbaatar–Irkutsk, a 27-hour journey from Beijing and the most scenic way in.",
          "The main land crossings are Zamyn-Üüd for China and Altanbulag for Russia; some borders are closed to third-country nationals, so check first.",
          "Book a hotel pickup for a first arrival at night; the airport taxi queue is not where you want to negotiate.",
        ],
      },
      around: {
        title: "Getting around",
        text: "There are about 1.5 million square kilometres and very little tarmac. How you move is the single biggest decision of the trip.",
        points: [
          "Most visitors travel by Russian van or 4×4 with a local driver, and a guide if nobody in the group speaks Mongolian. Fuel, food and the driver’s costs are normally included.",
          "Domestic flights from Ulaanbaatar reach around a dozen province centres; Ölgii, Khovd and Dalanzadgad save days of driving.",
          "Long-distance buses and shared minivans connect the capital with every province centre, cheaply and slowly.",
          "Outside the cities there are no road signs, no fuel for long stretches and often no road — only tracks. Self-driving is for experienced overlanders in pairs of vehicles.",
          "Rivers rise after rain and passes close with snow. Build a spare day into any plan with a flight at the end of it.",
        ],
      },
      money: {
        title: "Money",
        text: "The currency is the tögrög (₮, MNT). Cards work in the cities and almost nowhere between them.",
        points: [
          "Carry enough cash for the whole countryside leg; ATMs exist in every province centre but can be empty or offline.",
          "Cards are fine in Ulaanbaatar hotels, restaurants and supermarkets, and in larger shops in province centres.",
          "Change money at a bank or an exchange in the city rather than at the airport; US dollars and euros get the best rates.",
          "Tipping is not traditional, but 10% in city restaurants and a tip for a driver-guide at the end of a tour is now normal.",
          "Keep small notes for ger camps, toilets at petrol stations, and the family whose spring you are filling bottles from.",
        ],
      },
      connect: {
        title: "Staying connected",
        text: "Coverage is better than the emptiness suggests — but it stops where the tracks do.",
        points: [
          "Buy a prepaid SIM from Mobicom, Unitel or Skytel at the airport or any branch; you need your passport, and data is cheap.",
          "4G reaches province and district centres and most main roads; expect nothing in the mountains, in the deep Gobi or on the lake shore.",
          "Download offline maps and your route before leaving the capital. Mongolia’s address system is partly digital, so ask for coordinates.",
          "Hotels and city cafés have wifi; ger camps usually have electricity for a few hours in the evening from a generator or solar panel.",
          "Bring a power bank and a 12 V car charger. The vehicle is the only reliable socket for days at a time.",
        ],
      },
      health: {
        title: "Health and safety",
        text: "Mongolia is a safe country with difficult logistics. The risks are distance and weather far more than crime.",
        points: [
          "Take travel insurance that explicitly covers remote areas and helicopter evacuation. Serious cases are flown to Ulaanbaatar or Seoul.",
          "No vaccinations are required, but ask a travel clinic about rabies, tick-borne encephalitis and hepatitis A, and carry what you normally take.",
          "Drink bottled or boiled water, and be cautious with unpasteurised dairy if you are not used to it.",
          "Guard dogs at gers and camps are working animals and are not there to be petted. Wait for the owner.",
          "In Ulaanbaatar watch your pockets in the State Department Store, Narantuul market and crowded buses. Winter air pollution in the city is severe.",
          "Summer nights fall below 5 °C and the Gobi swings 30 degrees in a day. Hypothermia is a far likelier problem than heat.",
        ],
      },
      stay: {
        title: "Where to stay",
        text: "From international hotels to a spare bed in a family’s ger, often within the same week.",
        points: [
          "Ger camps are the standard countryside accommodation: a bed in a felt tent, shared showers, and dinner in a central building.",
          "Province centres have simple hotels and guesthouses; book ahead during Naadam and in August.",
          "Homestays with herding families are arranged on the spot by a guide, and are the reason most people remember the trip.",
          "Wild camping is widely accepted away from homes and herds. Ask if anyone is nearby, and camp well away from livestock.",
          "Ulaanbaatar has everything from hostels to five-star hotels, and prices rise sharply in July.",
        ],
      },
      pack: {
        title: "What to pack",
        text: "Pack for four seasons in a week and for being a long way from a shop.",
        points: [
          "Layers, a warm jacket and a hat for every month of the year, plus a windproof shell — the wind is constant.",
          "Strong sun protection and sunglasses: the altitude is 1,300 m and up, and there is no shade.",
          "Head torch, wet wipes, hand sanitiser and a quick-dry towel for the days between showers.",
          "A sleeping bag or liner if you plan on homestays or camping, and earplugs for the generator.",
          "A dust-proof bag for cameras, a power bank, spare batteries, and a basic first aid kit with rehydration salts.",
        ],
      },
      respect: {
        title: "Travelling lightly",
        text: "There is no waste collection, no fence and no ranger between the tracks. What visitors do here is visible for years.",
        points: [
          "Carry every piece of rubbish out to a province centre. Burying it is not an option in permafrost or sand.",
          "Stay on existing tracks. New tyre lines across grassland last decades and braid into scars visible from the air.",
          "Ask before photographing people, their animals and the inside of their home — and send the photo back if you promise to.",
          "Buy from local families, herders’ co-ops and community-run camps rather than importing everything with your tour.",
          "Fossils, artefacts and stones from graves and ovoos stay where they are. Taking them out of the country is also a crime.",
        ],
      },
    },
    phrasesTitle: "Ten words that help",
    phrasesLead:
      "Mongolian is not close to anything you are likely to know, and any attempt at all is received warmly. Stress falls on the first syllable.",
    phrases: [
      "Hello",
      "Thank you",
      "Yes / No",
      "Sorry, excuse me",
      "Hold the dog! (say this before entering a yard)",
      "How much is it?",
      "Water",
      "Where is the toilet?",
      "I don’t understand",
      "Goodbye",
    ],
    phraseHeadMn: "Mongolian",
    phraseHeadSay: "Say it like",
    phraseHeadMeaning: "Meaning",
    emergencyTitle: "Emergency numbers",
    emergencyLead: "These work nationwide from any mobile. Outside the cities, help may be hours away — tell someone your route before you leave.",
    emergency: ["Ambulance", "Police", "Fire", "Emergency and rescue"],
    disclaimer:
      "This page is a starting point, not official advice. Visa rules, flight routes, prices and road conditions change — confirm anything that matters with the Mongolian Immigration Agency, your embassy and a local operator before you travel.",
  },

  food: {
    pageTitle: "Mongolian food",
    pageLead: "Mutton, flour and milk, cooked to carry a household through a winter on the steppe. What to eat, where to find it, and how to be a good guest at the table.",
    metaDescription: "A visitor’s guide to Mongolian food: buuz, khuushuur, tsuivan, khorkhog, milk tea, airag and the dairy of summer — where to eat, table manners and a few useful words.",
    intro: [
      "Mongolian cooking comes from herding, not farming. For centuries a family lived on what its animals gave: meat in the cold months, when it keeps, and milk in summer, when the herds have their young. Flour arrived through trade and became dumplings and noodles; vegetables are a recent and still modest addition.",
      "The result is simple, filling and heavy on mutton, with salt as the main seasoning. It is food for long days outdoors at forty below, and it tastes best in that setting — out of a family’s pot in a ger, or at a roadside canteen halfway across the steppe.",
    ],
    dishesTitle: "Eight things to try",
    dishesLead: "Most of them are on the menu of any guanz, the roadside canteen, and all of them will be offered to you in a family ger sooner or later.",
    dishes: {
      buuz: {
        name: "Steamed dumplings",
        text: "Minced mutton or beef with onion and a little garlic, folded into a pleated cup of dough with a hole at the top, and steamed. Families make hundreds at a time for Tsagaan Sar, the lunar new year, and keep them frozen in the snow.",
        tip: "Bite a small hole first and drink the hot juice before you eat the rest.",
      },
      khuushuur: {
        name: "Fried meat pastries",
        text: "The same filling in a flat half-moon of dough, fried in mutton fat until crisp. It is the food of Naadam: every stall around the stadium sells it by the plate.",
        tip: "Best straight from the pan, eaten with your hands, with a bowl of milk tea.",
      },
      tsuivan: {
        name: "Stir-fried noodles",
        text: "Hand-cut flat noodles steamed over strips of mutton with carrot, cabbage and potato, then stirred together in the one pan. The everyday dinner of the countryside, and the most filling thing on most menus.",
        tip: "Ask for less fat (öökh) if you prefer; the cook will usually oblige.",
      },
      shul: {
        name: "Noodle soup with mutton",
        text: "Guriltai shul is a clear mutton broth with home-made noodles and a few vegetables. It is what you are given when you arrive cold, and what a family cooks on an ordinary day.",
        tip: "With bansh, small dumplings, the same soup becomes banshtai shul.",
      },
      khorkhog: {
        name: "Meat cooked with hot stones",
        text: "Mutton on the bone, potato and carrot packed into a sealed milk can with stones heated in the fire, and left to cook in their own steam. It is made outdoors for guests and celebrations, not ordered in a restaurant.",
        tip: "The hot stones are handed round afterwards: pass one from palm to palm — it is said to be good for you.",
      },
      tsai: {
        name: "Milk tea",
        text: "Suutei tsai is brick tea boiled with water and milk and seasoned with salt, sometimes with butter, roasted millet or a piece of meat in it. It is poured for every guest before anything else is said.",
        tip: "Take the bowl with your right hand and drink at least a little.",
      },
      airag: {
        name: "Fermented mare’s milk",
        text: "Mare’s milk churned in a leather sack or a barrel for days until it turns sour and slightly fizzy, at two or three per cent alcohol. It is made only in summer, when the mares are milked every two hours.",
        tip: "Start with a small sip: it is an acquired taste, and it can upset an unprepared stomach.",
      },
      dairy: {
        name: "White food",
        text: "Tsagaan idee, the dairy of summer: aaruul, curd dried hard on the ger roof; öröm, thick clotted cream; byaslag, a fresh cheese; and boortsog, fried dough to dip in tea. White is the colour of purity, so these are offered first at any celebration.",
        tip: "Aaruul is very hard: suck it slowly rather than bite it.",
      },
    },
    tableTitle: "At the table",
    tableLead: "A meal in a family ger follows small rules that nobody will explain, but everyone notices.",
    table: [
      "Take food and drink with your right hand, or with both; the left hand alone is impolite.",
      "Taste whatever you are offered, even if you leave the rest. Refusing outright can give offence; touching the bowl to your lips is enough.",
      "Guests are served first, and the best piece — often the fatty tail of the sheep — goes to the eldest or the guest of honour.",
      "Do not step over food, a bowl or the hearth.",
      "When you have had enough, put the bowl down in front of you with a word of thanks. An empty bowl will simply be filled again.",
    ],
    whereTitle: "Where to eat",
    whereLead: "From a canteen on the main road to a family’s own pot.",
    where: [
      {
        title: "Guanz",
        text: "The roadside canteen, in every sum centre and along the main roads. Two or three dishes and tea, quick and cheap; menus are rarely in English, so point at what others are eating.",
      },
      {
        title: "Ulaanbaatar",
        text: "The capital has Mongolian restaurants serving the classics in comfort, and Korean, Japanese, Russian, Indian and vegetarian places besides. It is the easiest place in the country to eat well without meat.",
      },
      {
        title: "With a family",
        text: "On a tour or a homestay, meals are cooked in the ger: what the family eats, which is the best introduction there is. Bring something small to the table — sweets or fruit.",
      },
      {
        title: "At Naadam",
        text: "In July the festival grounds fill with stalls of khuushuur and airag, and the khuushuur is often better here than anywhere else all year.",
      },
    ],
    phrasesTitle: "Words for the table",
    phrasesLead: "A few words of Mongolian go a long way with a cook.",
    phrases: [
      "Enjoy your meal",
      "It’s delicious",
      "I’m full, thank you",
      "I don’t eat meat",
      "The bill, please",
    ],
    note: "Vegetarians and anyone with allergies should say so early and kindly: outside Ulaanbaatar meat is in almost everything, and a dish “without meat” may still be cooked in mutton fat. On long trips, carry some food of your own.",
  },
};

export default en;
