export type EventItem = {
  slug: string
  title: string
  date: string
  description: string
  longDescription: string
  imgAlt: string
  imgUrl: string
}

export const events: EventItem[] = [
  {
   slug: "pitch-deck",
  title: "PITCH DECK",
  date: "Sep 12, 2021",
  description: "A 1-minute presentation competition to pitch new ideas to industry experts.",
  longDescription: 
    "PITCH DECK was a presentation competition conducted by ISA VIT Pune where students developed skills in pitching ideas. Participants came up with new concepts, presented them to industry experts for approval, and learned key strategies for securing product funding or sponsorships.",
  imgAlt: "ISA VIT Pune Pitch Deck Event Poster",
    imgUrl: "https://raw.githubusercontent.com/pikachu-byte/IMAGES/refs/heads/main/PITCH_DECK_12sep.jpeg",
  },
  {
    slug: "ingenious-2022",
    title: "INGENIOUS 2022",
    date: "Apr 18, 2022",
    description: "A  national hackathon featuring 90+ teams  in advanced technology domains.",
    longDescription:
      "A national hackathon featuring domains like Robotics, IoT, AI/ML, and AR/VR. The event included an Abstract Submission Round and an Idea Briefing Round, culminating in a final round where 20 teams presented projects to start-up funders and technocrats",
    imgAlt: "Oscilloscope with waveform",
    imgUrl: "https://raw.githubusercontent.com/pikachu-byte/IMAGES/refs/heads/main/Ingenious2.png",
  },
  {
   slug: "satellite-building-workshop",
  title: "Satellite Building Workshop",
  // Date from report: 10th to 28th February 2022
  date: "Feb 10, 2022 - Feb 28, 2022", 
  description: "A 7-day intensive online workshop conducted by ISRO and IUCAA scientists.",
  longDescription:
    "This Phase 1 workshop, conducted online via Google Meet, featured distinguished speakers including former ISRO scientists Mr. Ratan Singh Bisht and Mr. Bhagirath Mankad, and Mr. Vishnu Lal from VSSC. Over 120 students participated nationwide, covering theoretical and interactive sessions on satellite orbits (LEO, MEO, GEO), remote sensing, launch vehicles, and sky communication. The event provided a unique opportunity for students to interact directly with scientists who worked on various Indian space missions.",
  imgAlt: "Satellite Orbits presentation during online workshop",
    imgUrl: "https://raw.githubusercontent.com/pikachu-byte/IMAGES/refs/heads/main/satellight_10feb.png",
  },
  {
   slug: "flutter-workshop",
  title: "Android App Development in Flutter Workshop",
  // Date from report: 29th, 30th and 31st October 2021
  date: "Oct 29, 2021 - Oct 31, 2021", 
  description: "A three-day hands-on online workshop focused on building cross-platform mobile applications.",
  longDescription:
    "This intensive three-day interactive workshop, held virtually via Google Meet, was led by instructor Mr. Shardul Inamdar. Over 40 students participated, gaining hands-on coding experience in Flutter to develop core programming skills for mobile application development. The sessions included important Q&A rounds, providing participants with real-world insights into the app development process.",
  imgAlt: "Android App Development in Flutter Workshop Schedule",
    imgUrl: "https://github.com/pikachu-byte/IMAGES/blob/main/Flutter_boot.png?raw=true",
  },
    {
   slug: "systech-industry-visit",
  title: "Industry Visit at Systech Solutions",
  // Date from report: 27th November 2021
  date: "Nov 27, 2021",
  description: "An educational visit to Systech Solutions in Pune to explore the manufacturing of industrial control panel cabinets.",
  longDescription:
    "A group of 35 students and one faculty member visited Systech Solutions, a Pune-based leader in manufacturing Control Panel Cabinets. The visit provided firsthand exposure to industrial design, drafting, and complex wiring processes such as GA and Panel wiring. Students learned about the production of fire-resistant and high-accuracy heavy-duty industrial products while understanding the quality standards required by esteemed clients like Honeywell and Emerson India.",
  imgAlt: "Industry Visit at Systech Solutions Report",
    imgUrl: "https://github.com/pikachu-byte/IMAGES/blob/main/industry_visit.png?raw=true",
  },
    {
   slug: "isro-industrial-visit",
  title: "Industrial Visit ISRO Ahmedabad",
  // Date from report: 25 April to 5 May
  date: "Apr 25, 2022 - May 05, 2022", 
  description: "An extensive industrial visit to ISRO Ahmedabad featuring interactions with scientists and tours of advanced research facilities.",
  longDescription:
    "Organized by ISA VIT Pune, this multi-day offline industrial visit to ISRO Ahmedabad provided over 30 participants with the unique opportunity to interact directly with senior ISRO scientists. The itinerary included a visit to the center's newly launched Robotics lab and the on-site aquarium. Additionally, the trip integrated cultural exploration, with participants visiting historic sites such as the Adlaj Stepwell.",
  imgAlt: "Industrial Visit ISRO Ahmedabad and Adlaj Stepwell Highlights",
    imgUrl: "https://github.com/pikachu-byte/IMAGES/blob/main/Ahmdebad_industry_visit.png?raw=true",
  },
]

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug)
}
