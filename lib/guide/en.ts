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
    toGer: "Back to the ger",
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
          "Inside: a book of Mongolian history, a silk deel, a wrestler’s zodog and shuudag, and a snuff bottle. Open any of them.",
        cta: "Culture and customs",
      },
      treats: {
        name: "White food on the table",
        teaser:
          "Aaruul, butter and boortsog: the white food that is laid out for Tsagaan Sar, the lunar new year, when the whole country goes visiting.",
        cta: "Tsagaan Sar",
      },
      ticket: {
        name: "The plane ticket on the table",
        teaser:
          "Fly into Chinggis Khaan International Airport, or come overland from China, Russia or Kazakhstan. Every way into Mongolia, on one map.",
        cta: "How to get to Mongolia",
      },
      pot: {
        name: "The pot on the hearth",
        teaser:
          "Buuz, khuushuur, tsuivan and salted milk tea: what goes into the pot, and what is poured for every guest who comes in.",
        cta: "Mongolian food",
      },
    },
    chest: {
      book: { name: "A book of Mongolian history", page: "A history of Mongolia" },
      deel: { name: "A silk deel", page: "The deels of Mongolia’s peoples" },
      zodog: { name: "A wrestler’s zodog and shuudag", page: "Naadam and Mongolian wrestling" },
      snuff: { name: "A snuff bottle", page: "Exchanging snuff bottles" },
    },
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

  /* ================= getting here ================= */
  arrive: {
    pageTitle: "Getting to Mongolia",
    pageLead:
      "Mongolia lies between Russia and China, so every journey here either crosses one of them or flies over. These are the ways in, and what each one is like.",
    metaDescription:
      "How to get to Mongolia: flights to Chinggis Khaan International Airport, the train and road from China at Zamyn-Üüd, the crossings from Russia, and the way in from Kazakhstan through the Altai.",
    mapLabel:
      "Map of Mongolia with its neighbours, showing the flights into Ulaanbaatar and the border crossings at Zamyn-Üüd, Altanbulag, Tsagaannuur and Ereentsav.",
    places: {
      russia: "Russia",
      china: "China",
      kazakhstan: "Kazakhstan",
      altai: "Altai",
      ulaanbaatar: "Ulaanbaatar",
      zamynUud: "Zamyn-Üüd",
      altanbulag: "Altanbulag",
      tsagaannuur: "Tsagaannuur",
      ereentsav: "Ereentsav",
      ulanUde: "Ulan-Ude",
      beijing: "Beijing",
    },
    waysLabel: "Ways into Mongolia",
    ways: {
      air: {
        title: "By air",
        text: "The easiest way in, and the one most visitors take. Nearly every international flight lands at Chinggis Khaan International Airport.",
        points: [
          "The airport opened in 2021 in the Khöshig valley, about 50 km south of Ulaanbaatar. The expressway into the city takes 40–60 minutes.",
          "Regular direct flights connect Ulaanbaatar with Seoul, Tokyo, Beijing, Hong Kong, Istanbul and Frankfurt, and summer adds more cities in China, Japan, Korea and Southeast Asia.",
          "From Central Asia, Hunnu Air flies direct from Almaty in about four hours, though not in every season.",
          "There is no train to the airport. Book a hotel pickup, or take the airport bus or a registered taxi and agree the fare first.",
          "Heading west? Ölgii and Khovd have domestic flights from Ulaanbaatar, which turns a three-day drive into a flight of about three hours.",
        ],
      },
      china: {
        title: "From China",
        text: "The railway and the main road south both cross at Zamyn-Üüd, opposite the Chinese town of Erenhot. It is the busiest border in the country.",
        points: [
          "The through train from Beijing to Ulaanbaatar has run again since June 2025, about once a week. The journey takes around 30 hours.",
          "At Erenhot the train stands for a few hours while its wheels are changed: China uses standard gauge, and Mongolia the wider Russian gauge.",
          "You cannot walk across at Zamyn-Üüd. Shared jeeps and minibuses in Erenhot take foot passengers over, and on the Mongolian side trains and buses leave for Ulaanbaatar, about 700 km north.",
          "The road is paved all the way to the capital, through Sainshand and Choir.",
          "Most other crossings on the Chinese border are open only to Mongolian and Chinese citizens, or only to freight.",
        ],
      },
      russia: {
        title: "From Russia",
        text: "Three crossings on the northern border take foreign travellers: north of Ulaanbaatar, at Tsagaannuur in the far west, and at Ereentsav in the east.",
        points: [
          "Trains from Irkutsk and Ulan-Ude, and less often from Moscow, cross at Naushki and Sükhbaatar. Expect a journey of more than a day, much of it spent at the border.",
          "Drivers use Kyakhta–Altanbulag, open around the clock and about 350 km from Ulaanbaatar on a paved road.",
          "Tashanta–Tsagaannuur, at the end of the Chuysky Trakt through the Altai Republic, leads straight into Bayan-Ölgii. It is usually closed on Sundays.",
          "Ereentsav, in Dornod, links eastern Mongolia with Russia’s Zabaykalsky Krai and sees few travellers.",
          "The road crossings cannot be walked. Without a vehicle of your own, pay for a seat in one that is going across.",
        ],
      },
      kazakhstan: {
        title: "From Kazakhstan",
        text: "Kazakhstan comes within about 40 km of Mongolia’s western tip, but the two do not touch: a narrow strip of Russia and China lies between them.",
        points: [
          "The quickest way is the direct flight from Almaty to Ulaanbaatar.",
          "Overland, the road goes north through Russia: into the Altai Republic, along the Chuysky Trakt to Tashanta, and across to Tsagaannuur.",
          "That means entering Russia too, so check whether your passport needs a Russian visa, and allow two or three days of driving from eastern Kazakhstan.",
          "Bayan-Ölgii, just over the border, is home to most of Mongolia’s Kazakhs. In Ölgii you will hear more Kazakh than Mongolian.",
          "Ölgii has flights to Ulaanbaatar, so the overland crossing can end with a flight east.",
        ],
      },
    },
    border: {
      title: "At the border",
      text: "Land crossings are slow and keep office hours. A little planning saves a day.",
      points: [
        "Borders close on Mongolian public holidays, including Tsagaan Sar in winter and Naadam on 11–15 July.",
        "Arrive early. Road crossings let a few vehicles through at a time, and lines of trucks can take hours.",
        "Bringing your own car or motorbike means a temporary import declaration and local insurance at the border. Keep the papers until you leave.",
        "Have the address of your first night’s stay to hand; officers may ask where you are going.",
      ],
    },
    visa: "Whether you need a visa depends on your passport. {link} covers visas, money, SIM cards and health.",
    visaLink: "The practical guide",
    disclaimer:
      "Timetables, routes and border rules change, sometimes at short notice. Check with the airline, the railway or a Mongolian embassy before you travel.",
  },

  /* ================= deels ================= */
  deels: {
    pageTitle: "The deels of Mongolia’s peoples",
    pageLead:
      "Every people in Mongolia wears the deel its own way: the cut of a collar, the height of a shoulder, a band of colour or a hat tell a Khalkha from a Buryat or a Torguud. Here they are, side by side.",
    metaDescription:
      "The traditional deels of Mongolia’s ethnic groups: Khalkha, Dörvöd, Bayad, Zakhchin, Torguud, Uriankhai, Myangad, Buryat, Barga, Darkhad, Dariganga, Kazakh, Dukha, Khamnigan and more, and what sets each apart.",
    note:
      "The pictures are illustrations made with AI from written descriptions of each people’s dress; the Kazakh family is a photograph. Dress also varies from family to family and from one century to the next, so take them as a guide, not a record.",
    lineupLabel: "The peoples on this page",
    aiCaption: "AI illustration",
    imageAlt: "{name}: a man and a woman in traditional dress",
    photoCaption: "A Kazakh eagle-hunter family in western Mongolia",
    missing: "We have not found a reliable description of this deel yet, so it is not drawn here.",
    families: {
      khalkha: {
        title: "The Khalkha",
        text: "Four in five Mongolians are Khalkha, and theirs is the deel most visitors picture.",
      },
      west: {
        title: "The west",
        text: "The Oirat peoples and their neighbours in Uvs, Khovd and Zavkhan, where white sheepskin, black trim and tall hats are common.",
      },
      northEast: {
        title: "The north and east",
        text: "From the Khövsgöl taiga to the eastern steppe, where banded lapels and gathered shoulders show the Buryat world next door.",
      },
      turkic: {
        title: "Turkic and Tungusic peoples",
        text: "Peoples whose languages and dress come from beyond the Mongol world.",
      },
    },
    groups: {
      khalkha: {
        name: "Khalkha",
        place: "The whole country",
        text: "A man’s deel closes to the right with knot buttons and has wide, cuffed sleeves. A married woman’s rises at the shoulders into stiff puffs and is worn under a sleeveless uuj edged in silk. Hats carry a red knot on top and red ribbons behind.",
      },
      durvud: {
        name: "Dörvöd",
        place: "Uvs province",
        text: "In winter men and women wore deels of undyed white lambskin without side slits. A woman’s dark-blue summer deel closes with five silver buttons and is trimmed with black silk and a rainbow ribbon, but its hem is left plain, which sets the Dörvöd apart from other Oirats.",
      },
      bayad: {
        name: "Bayad",
        place: "Uvs province, with communities in Dundgovi and Dornod",
        text: "Women wear crimson or burgundy deels whose collar and lapel are edged with a broad white band, with very wide cuffed sleeves and red boots. Men’s white sheepskin winter deels are bordered all round in black velvet.",
      },
      zakhchin: {
        name: "Zakhchin",
        place: "Southern Khovd province",
        text: "Men wear a white sheepskin deel with a double band of trim at the collar and chest. A married woman’s summer deel is dark blue, wide at the upper arm and narrow at the wrist, with red silk and coloured ribbons at the hem. Hats are low, red and stitched in 32 panels.",
      },
      torguud: {
        name: "Torguud",
        place: "Bulgan district, Khovd province",
        text: "Deels are cut roomy, with wide gussets under the arms, long sleeves that keep the hands warm on the reins, and fur along the collar, front and cuffs. Women’s tall hats are set with coral and pearls.",
      },
      uriankhai: {
        name: "Altai Uriankhai",
        place: "The Altai slopes of Khovd province",
        text: "A man’s everyday deel is white, slit at both sides with a large black shape above each slit and wide black trim at the collar and hem, and his hat is shaped like a helmet. Women hang three or five coloured kerchiefs from the waist.",
      },
      myangad: {
        name: "Myangad",
        place: "Myangad district, Khovd province",
        text: "Deels are cut without gores, with a wide black collar and front trim and a red edge to the collar. Men and women alike wear black velvet hats, and women hang a knife and five coloured kerchiefs from the belt.",
      },
      oold: {
        name: "Ööld",
        place: "Khovd province",
        text: "An Oirat people of Khovd. Men favour blue deels with a broad band of black trim, 15–20 cm wide, along the collar and front, and no side slits; women's deels are brightly coloured, with silver ornaments. The Ööld avoid grey, the colour bondsmen wore under the Manchus.",
      },
      khotgoid: {
        name: "Khotgoid",
        place: "Zavkhan and Khövsgöl provinces",
        text: "Once part of the Oirat confederation, the Khotgoid rose against the Manchus under Chingünjav in 1755–57. No account of their own dress was found, so the picture follows Oirat dress in general: a married woman's deel with a large folded white collar under an embroidered sleeveless jacket.",
      },
      sartuul: {
        name: "Sartuul",
        place: "Zavkhan province",
        text: "A small Mongol people of Zavkhan, known for their short songs; Sartuul also live in Buryatia. Women wear a brocade deel with raised shoulders and black velvet cuffs under a short sleeveless khantaaz, and a round black hat ringed with red coral beads.",
      },
      buryat: {
        name: "Buryat",
        place: "Khentii, Dornod and Selenge provinces",
        text: "A man’s deel has a square opening and a front made of three bands, white, black and red. A married woman’s is gathered into pleated, raised shoulders with a decorative band set into each sleeve. Conical hats have tassels spreading from the peak.",
      },
      barga: {
        name: "Barga",
        place: "Dornod province",
        text: "Men’s deels have a wide black collar and lapel and a wide hem, tightly belted. Married women wear a deel with rounded shoulders under a sleeveless vest, a tall round hat trimmed with fox or squirrel fur, and two long braids reaching the hem.",
      },
      darkhad: {
        name: "Darkhad",
        place: "The Darkhad valley, northern Khövsgöl",
        text: "At the edge of the taiga, the Darkhad wear deels with a lapel of several colour bands, like the Buryat, and a back skirt cut longer than the front.",
      },
      dariganga: {
        name: "Dariganga",
        place: "Sükhbaatar province",
        text: "Their dress is close to the Khalkha’s. What sets them apart is silver: the Dariganga are famous smiths, and women wear headbands, hair clasps and ornaments of silver and coral.",
      },
      uzemchin: {
        name: "Üzemchin",
        place: "Dornod and Sükhbaatar provinces",
        text: "A people of the eastern steppe, known for archery and long songs. Every Üzemchin deel, for men, women and children, has a stand-up collar, a curved front and slits on both sides; men wear blue, women brown or green, and a wife's ceremonial uuj is edged with two rows of trim.",
      },
      kazakh: {
        name: "Kazakh",
        place: "Bayan-Ölgii province",
        text: "Turkic-speaking and Muslim, Kazakhs wear their own dress rather than the deel: the long chapan robe, embroidered velvet, fox-fur coats in winter, a small embroidered cap for men and white headwear for married women.",
      },
      tsaatan: {
        name: "Dukha (Tsaatan)",
        place: "The taiga of northern Khövsgöl",
        text: "Reindeer herders who speak a Turkic language. Their everyday deels are wide and practical, with hats like those of the Khalkha.",
      },
      khamnigan: {
        name: "Khamnigan",
        place: "Khentii province, along the Onon",
        text: "A people of Evenki origin who live alongside the Buryat. Women’s deels are cut like Buryat ones, with a broad band at the hem and tasselled belts; hunters once wore short deels of roe-deer hide and hats of deer skin.",
      },
      khoton: {
        name: "Khoton",
        place: "Uvs province",
        text: "A people of Turkic origin who now speak the Oirat Mongolian of their neighbours. The Khoton favour black for deels and hats, which they link to their faith; sleeves are cut straight, without the hoof-shaped cuffs, and sleeve warmers are pulled over them in the cold.",
      },
    },
    sources:
      "Descriptions follow Mongolian ethnographic accounts, Montsame, Insight Mongolia and the Mongolian Guide School. The dress of most of these peoples is listed in Mongolia’s national register of intangible heritage.",
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

  naadam: {
    pageTitle: "Naadam and Mongolian wrestling",
    pageLead: "Every July the country stops for the three manly games: wrestling, horse racing and archery. Wrestling comes first, and it is the one every Mongolian follows.",
    metaDescription: "A visitor's guide to Naadam and Mongolian wrestling (bökh): the rules, the zodog and shuudag, the eagle dance, the titles from Nachin to Avarga, the horse races and archery, and where to watch.",
    intro: [
      "Naadam means simply ‘games’. Its full name, eriin gurvan naadam, is ‘the three games of men’, and it grew out of the gatherings at which khans tested their warriors. Today the national festival opens in Ulaanbaatar on 11 July, and every province and district holds its own naadam on its own dates through the summer. UNESCO added it to its list of intangible heritage in 2010.",
    ],
    wrestlingTitle: "Bökh, Mongolian wrestling",
    wrestlingLead: "Hundreds of wrestlers take to the grass at once, in pairs, and wrestle on until one of each pair falls. There are no rings and no mats.",
    rulesTitle: "How a bout is won",
    rulesLead: "Simple rules, and none of the ones other wrestling has.",
    rules: [
      "You lose when anything but the soles of your feet or the palms of your hands touches the ground: a knee, an elbow, a shoulder or your back.",
      "There are no weight classes. A light, quick wrestler can be drawn against one twice his size.",
      "Traditionally there is no time limit; a long bout is eventually given a set grip to bring it to an end.",
      "At the national Naadam 512 or 1024 wrestlers start, and each round halves the field. In the early rounds the higher-ranked wrestler chooses his opponent.",
      "The festival's bökh is for men. Women compete in archery and girls ride in the horse races.",
    ],
    outfitTitle: "What a wrestler wears",
    outfitText: "The outfit is old and nearly the same everywhere in the country, and every part of it has a reason.",
    outfit: {
      zodog: "A short jacket that is only two sleeves and a back, tied at the waist with a cord. Its chest is left open, by legend since a woman once entered in disguise and threw every man she met.",
      shuudag: "Tight briefs of silk or cotton, red or blue, that give an opponent nothing to hold.",
      gutal: "Heavy leather boots with upturned toes, bound tight with cord for the bout.",
      malgai: "A pointed hat whose ribbons and height show the wrestler's rank. His second holds it during the bout and hands it back when he wins.",
    },
    ritualTitle: "The eagle dance and the second",
    ritualText: "Before a bout each wrestler dances the eagle dance, arms spread like wings, to the judges and the banner. His second, the zasuul, slaps his thigh to send him in and calls out his titles. When it is over, the loser unties his zodog and passes under the winner's raised arm, and the winner dances the eagle dance again.",
    titlesTitle: "From Nachin to Avarga",
    titlesLead: "A title is won at the national Naadam and kept for life. Each one is named after a bird or a beast, and each is harder than the last.",
    titles: {
      nachin: {
        meaning: "Falcon",
        rule: "Wins five rounds",
      },
      khartsaga: {
        meaning: "Hawk",
        rule: "Wins six rounds",
      },
      zaan: {
        meaning: "Elephant",
        rule: "Wins seven rounds",
      },
      garid: {
        meaning: "Garuda",
        rule: "Wins eight rounds",
      },
      arslan: {
        meaning: "Lion",
        rule: "Wins the national Naadam",
      },
      avarga: {
        meaning: "Titan",
        rule: "Wins it a second time",
      },
    },
    gamesTitle: "The other two games",
    games: {
      horse: {
        title: "Horse racing",
        text: "Races are run cross-country over 10 to 28 km, in six classes by the horses' age, ridden by children of five to thirteen. The horse, not the rider, is the winner: the first five are praised in song, and the last two-year-old home is sung a teasing verse.",
      },
      archery: {
        title: "Archery",
        text: "Men shoot from 75 metres and women from 65 at a low wall of small leather cylinders. When an arrow hits, the judges at the target raise their arms and sing out ‘uukhai’.",
      },
    },
    watchTitle: "Watching it",
    watchLead: "The capital's Naadam is the grandest; a district naadam is the friendliest.",
    watch: [
      "The opening ceremony is on the morning of 11 July at the National Sports Stadium in Ulaanbaatar. Tickets sell out, so buy them early through your hotel or a tour operator.",
      "Wrestling fills the stadium for both main days; the archery ground is right beside it.",
      "The horse races are at Khui Doloon Khudag, about 40 km west of the city, with traffic to match. Go early or go with a driver.",
      "Every province and district holds its own naadam in July and August. They are smaller and free, and you can stand right at the edge of the wrestling.",
    ],
    photoAlt: {
      hero: "Wrestlers grappling on the grass at a naadam in Terelj",
      outfit: "A wrestler in a red zodog and blue shuudag at the national stadium",
      dance: "A wrestler dancing the eagle dance after a win",
      grapple: "Two wrestlers locked together in a bout",
      horse: "Child jockeys racing their horses at Naadam",
      archery: "Archers in deels shooting at Naadam",
    },
    note: "Dates and venues can change from year to year; check the schedule for the year you travel before you plan around it.",
  },

  snuff: {
    pageTitle: "Exchanging snuff bottles",
    pageLead: "When Mongolian men meet, at Tsagaan Sar or when a guest comes into the ger, they greet each other by exchanging snuff bottles. It takes a few seconds, and every movement in it means something.",
    metaDescription: "How the Mongolian snuff-bottle greeting works: the five steps, how to greet an elder, what not to do, and the bottles themselves — agate, coral, jade and silver.",
    heroAlt: "Two men in deels exchanging snuff bottles in a ger",
    aiCaption: "AI illustration",
    intro: [
      "A snuff bottle, khöörög, is carried in a pouch at the belt and taken out to greet. Two men exchange bottles, each smells the other's, and each hands it back. It is a way of saying ‘I am at peace with you’, and between an older and a younger man it is also a show of respect. A good bottle is kept for life and passed from father to son.",
      "Women sometimes carry one too, and anyone may be offered a bottle in a family ger. You do not have to take snuff: smelling the bottle is enough.",
    ],
    stepsTitle: "How the exchange goes",
    steps: [
      {
        title: "Take out your bottle",
        text: "Take the bottle from its pouch and loosen the stopper a little, so that it is ready to open.",
      },
      {
        title: "Hold it out on your palm",
        text: "Rest it in your right hand, palm up, and support your right elbow with your left hand. Keep your sleeves down and your deel buttoned.",
      },
      {
        title: "Pass the bottles",
        text: "Both men hold out their bottles at once and take each other's. A younger man receives with both hands. The bottles must not knock together.",
      },
      {
        title: "Smell it",
        text: "Open the stopper slightly and bring the bottle to your nose. You can take a pinch with the little spoon, or just smell it.",
      },
      {
        title: "Hand it back",
        text: "Return it the same way, the stopper still loose, and take your own bottle back.",
      },
    ],
    elderTitle: "With an elder",
    elderText: "With an older man the younger one rises to receive the bottle. He may go down on his left knee with his right knee raised, take the bottle with both hands, smell it and return it in the same way. The elder holds his bottle in his left hand and supports his right elbow.",
    avoidTitle: "What not to do",
    avoidLead: "A few things turn the greeting into an insult.",
    avoid: [
      "Do not press the stopper shut before handing a bottle back. In the old days a man condemned to death was offered snuff from a closed bottle.",
      "Do not roll up your sleeves, unbutton your deel or put your hands on your hips while you exchange.",
      "Do not let the two bottles touch: knocking them together is a sign of a quarrel.",
      "Do not refuse a bottle. If you do not take snuff, bring it to your nose and hand it back.",
    ],
    bottlesTitle: "The bottles",
    bottlesText: "Bottles are carved from agate, jade, jasper, coral or crystal, or made of silver set with coral and turquoise. The stopper is usually coral or turquoise, with a tiny spoon fixed beneath it, and the bottle lives in an embroidered silk pouch. A fine one could be worth a herd of horses; these four are in the National Museum of Mongolia.",
    bottles: {
      agate: "Agate with a coral stopper",
      coral: "Carved red coral",
      silver: "Silver set with coral and turquoise",
      jasper: "Jasper, shaped like a pouch",
    },
    note: "Customs vary a little from region to region and family to family. If in doubt, watch your host and do as he does.",
  },

  tsagaanSar: {
    pageTitle: "Tsagaan Sar, the White Moon",
    pageLead: "The Mongolian lunar new year is the family's festival: three days of greeting the elders, eating dumplings by the hundred and visiting every relative in turn.",
    metaDescription: "A visitor's guide to Tsagaan Sar, the Mongolian lunar new year: the eve and the first day, the zolgokh greeting, the festive table of ul boov and buuz, and how to be a good guest.",
    heroAlt: "A tower of ul boov biscuits filled with white food",
    intro: [
      "Tsagaan Sar, the White Moon, begins on the first day of the first spring month of the Mongolian lunar calendar, so it falls somewhere between late January and early March. White stands for purity and plenty, and the holiday is about starting the year clean, full and at peace with everyone.",
      "It is a public holiday of three days, but the visiting can go on for weeks. In the city most offices close, and in the countryside families travel long distances to sit at their parents' table.",
    ],
    daysTitle: "The eve and the first days",
    days: [
      "The last day of the old year. The home is cleaned and old quarrels and debts are settled. The family eats until everyone is full, and some of every dish is left over so that the new year starts with plenty. Three lumps of ice are set by the door for the mule of the goddess Palden Lhamo.",
      "Everyone is up before dawn. The men walk out from the ger in the direction the year's almanac names as lucky, and the family greets its eldest first, one by one, with the zolgokh. Only then does everyone sit down to the feast.",
      "From the second day the visiting begins, eldest relatives first. Every household lays the same table, and at every door the greeting, the tea, the dumplings and a parting gift come round again.",
    ],
    zolgokhTitle: "The zolgokh greeting",
    zolgokhText: "The younger person holds out both forearms, palms up, and supports the elder's arms from below at the elbows; the elder rests their arms on top and touches or sniffs both of the younger's cheeks. ‘Amar baina uu?’, are you at peace, says the younger. A khadag silk scarf is often laid over the hands. Two people of the same age each hold one arm over and one under. Hats stay on, and husbands and wives do not greet each other this way.",
    zolgokhAlt: "A young man greeting his grandmother with the zolgokh, a blue khadag over his hands",
    aiCaption: "AI illustration",
    tableTitle: "The table",
    tableLead: "Every home lays out the same things, and the same table waits for every guest.",
    table: [
      "Ul boov, ‘sole biscuits’, stamped with a pattern and stacked in an odd number of layers, higher for older households, and crowned with aaruul, sugar lumps and sweets.",
      "Uuts, the steamed back and fat tail of a sheep, set at the head of the table and carved for the guests.",
      "Buuz, steamed dumplings, made by the hundred in the days before and kept frozen outside, so that every visitor can be fed.",
      "Milk tea poured for each guest on arrival, and a glass of vodka or airag offered with both hands.",
    ],
    tableAlt: "A Tsagaan Sar table with the sheep's back, ul boov and white food",
    boovAlt: "Ul boov biscuits stamped with patterns",
    guestTitle: "As a guest",
    guestLead: "If you are invited, you will be fed well, and nobody expects you to know everything.",
    guest: [
      "Greet the eldest first, then the others in order of age.",
      "Take the tea and the food with your right hand and eat at least a few buuz; three is polite, more is welcome.",
      "You will be offered vodka. Take the glass, and if you do not drink, touch it to your lips and hand it back.",
      "Bring a small gift for the household. You will leave with one too: the host gives every guest a present at the door.",
      "Wear a deel if you have one, or at least something smart, and keep your hat on for the greeting.",
    ],
    phrasesTitle: "What to say",
    phrasesLead: "Three phrases are heard at every door for a month.",
    phrases: [
      "Are you at peace? — said by the younger in the zolgokh",
      "Did you see the new year in well?",
      "We are seeing it in well — the reply",
    ],
    note: "The date moves with the lunar calendar every year; check it before you plan a visit. Customs vary from family to family, so watch your hosts and follow them.",
  },
};

export default en;
