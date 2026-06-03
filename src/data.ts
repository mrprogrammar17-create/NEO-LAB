import { Product, Testimonial, GalleryItem, ServiceItem } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "vessel-x1",
    name: "Bugatti Tourbillon",
    tagline: "The Grand Hybrid V16 Masterpiece",
    category: "Hypercar",
    price: "$4,600,000",
    color: "#FF4E00", // Bold primary Orange accent
    image: "https://cdn.motor1.com/images/mgl/vxZvnQ/s1/bugatti-tourbillon.jpg",
    specs: {
      speed: "277 mph",
      power: "1,800 hp",
      range: "350 miles (hybrid)",
      acceleration: "2.0s (0-60)",
      weight: "1,995 kg",
      efficiency: "94.2%"
    },
    colors: [
      { name: "French Racing Blue", hex: "#06b6d4" },
      { name: "Pulse Orange", hex: "#FF4E00" },
      { name: "Nocturne Carbon", hex: "#09090b" },
      { name: "Zenith Purple", hex: "#8b5cf6" },
      { name: "Liquid Silver", hex: "#f4f4f5" }
    ],
    description: "The peak of luxury hybrid craftsmanship. The Bugatti Tourbillon unites an all-new naturally aspirated 8.3L V16 gas engine with triple electric vector motors to deliver an unprecedented 1,800 hp.",
    longDescription: "Handcrafted inside Molsheim, France, the Tourbillon completely redefines hypercar capability. Featuring an analog instrument cluster styled by elite Swiss watchmakers, an active rear aerodynamic diffuser wing, and dual-clutch transmission, every detail stands as an architectural work of kinetic sculpture.",
    features: [
      "Naturally aspirated 8.3L V16 design paired with 3 electric motors",
      "Bespoke Swiss mechanical skeletonized display cluster",
      "Advanced 800V high-capacity traction battery array",
      "Full carbon composite monocoque chassis blueprint",
      "Dihedral active synchro-helix scissor doors"
    ]
  },
  {
    id: "aurora-stratos",
    name: "Koenigsegg Jesko Absolut",
    tagline: "The Absolute World-Velocity Record Holder",
    category: "Hypercar",
    price: "$3,400,000",
    color: "#8b5cf6", // Purple accent
    image: "https://tse1.mm.bing.net/th/id/OIP.lrm1DOvV_jhNiyUnnNXGzAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      speed: "330 mph (target)",
      power: "1,600 hp",
      range: "485 miles",
      acceleration: "2.5s (0-60)",
      weight: "1,390 kg",
      efficiency: "92.0%"
    },
    colors: [
      { name: "Zenith Purple", hex: "#8b5cf6" },
      { name: "Matt Grey Carbon", hex: "#27272a" },
      { name: "Strobotronic Orange", hex: "#f97316" },
      { name: "Glacier Silver", hex: "#ffffff" }
    ],
    description: "The fastest car Koenigsegg will ever build. Designed with streamlined aerodynamic flow to eliminate drag down to a minimal 0.278 Cd, maximizing raw straight-line acceleration.",
    longDescription: "Combining a twin-turbocharged flat-plane V8 engine with a revolutionary 9-speed, 7-clutch Light Speed Transmission (LST), the Jesko Absolut is designed to shatter records. Its featherlight carbon monocoque shell is autoclaved at aerospace standards for unparalleled torsional rigidity.",
    features: [
      "Flat-plane 5.0L twin-turbocharged V8 engine",
      "Koenigsegg 9-speed Multi-Clutch Light Speed Transmission (LST)",
      "Ultra-slippery low-drag coefficient structural canopy (0.278 Cd)",
      "Triplex front and rear active suspension stabilization",
      "Integrated Autoskin touch-free pneumatic doors"
    ]
  },
  {
    id: "quantum-pod",
    name: "Lamborghini Revuelto",
    tagline: "V12 Hybrid Super Sports High Performance",
    category: "Supercar",
    price: "$608,000",
    color: "#f97316", // Orange accent
    image: "https://tse4.mm.bing.net/th/id/OIP.42nw19WkbgHiMO1jdcU2eQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      speed: "217 mph",
      power: "1,015 hp",
      range: "310 miles",
      acceleration: "2.5s (0-100 km/h)",
      weight: "1,772 kg",
      efficiency: "89.5%"
    },
    colors: [
      { name: "Giallo Auge (Yellow)", hex: "#fbcfe8" }, // light-to-yellow hue
      { name: "Pulse Orange", hex: "#f97316" },
      { name: "Stealth Matt Black", hex: "#09090b" },
      { name: "Verde Mantis Green", hex: "#10b981" }
    ],
    description: "The first hybrid super sports V12 HPEV (High Performance Electrified Vehicle) from Sant'Agata, delivering over 1,000 combined horsepower with unmatched torque vectoring.",
    longDescription: "The Lamborghini Revuelto introduces an entirely new architecture. It merges the legendary roar of a naturally aspirated 6.5L V12 engine with three high-density electric motors. A carbon-fiber Monofuselage structural cell ensures ultimate stiffness and driver safety.",
    features: [
      "Monolithic naturally aspirated 6.5L V12 engine with 3 e-motors",
      "Full carbon-fiber Monofuselage structural frame",
      "Electronic torque vectoring via front e-axles",
      "Dual-clutch 8-speed transverse gearbox behind the V12",
      "Active high-drag and aerodynamic profile rear wings"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Rostova",
    role: "Propulsion Engineering Director",
    company: "AeroVanguard Space Labs",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    content: "The extreme attention to aerodynamic efficiency and the seamless torque delivery of the V16 hybrid on the Bugatti Tourbillon is unparalleled. It truly is the future of street-legal engineering.",
    rating: 5
  },
  {
    id: "t2",
    name: "Marcus Vance",
    role: "Design Principal & Collector",
    company: "Vance Luxury Portfolios",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    content: "Having experienced countless exotic supercars and custom jets, the Jesko Absolut represents the ultimate design paradigm shift. Interactive custom colors look even more jaw-dropping under true physical lighting.",
    rating: 5
  },
  {
    id: "t3",
    name: "Dr. Kenji Yoshida",
    role: "Autonomous Robotics Professor",
    company: "Kyoto Tech Institute",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    content: "The absolute telemetry accuracy of the Revuelto's hybrid torque vectoring in extreme track profiles makes it an invaluable sports vehicle. Fully custom, modular, and extremely reliable.",
    rating: 5
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Chassis Calibration Lab",
    category: "Development",
    image: "https://th.bing.com/th/id/R.788e16a8243c645e6cae9b5069483e9a?rik=YOdInJN9cuLx1Q&pid=ImgRaw&r=0",
    meta: "Laser alignment scanning within 0.01mm tolerance check"
  },
  {
    id: "g2",
    title: "Jesko Active Wing Design",
    category: "Aerodynamics",
    image: "https://tse3.mm.bing.net/th/id/OIP.Iw3Ozc1zliNJDjOkaAzafwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    meta: "Fibre orientation optimization across structural stress wings"
  },
  {
    id: "g3",
    title: "V16 Hybrid Reactor Core",
    category: "Propulsion",
    image: "https://tse1.mm.bing.net/th/id/OIP.nFOLEmhipyQAy8pF2ZFDTgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    meta: "Superconducting energy ring glow during 80h static tests"
  },
  {
    id: "g4",
    title: "Composite Monofuselage Chamber",
    category: "Materials",
    image: "https://tse2.mm.bing.net/th/id/OIP.dPqt33dRNlDIqWlEx_H2egHaEi?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    meta: "Ultra-high temperature baking cycles for single carbon cast"
  },
  {
    id: "g5",
    title: "Revuelto Track Dynamics",
    category: "Testing",
    image: "https://tse3.mm.bing.net/th/id/OIP.gMBUpPMnhV2GoGnAKtZWWAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    meta: "Infrared brake rotor capture at corner entry speeds"
  },
  {
    id: "g6",
    title: "Cockpit Interface Rig",
    category: "Telemetry",
    image: "https://tse1.mm.bing.net/th/id/OIP.YzMnwlcZ4_waE1V7Ky0oZgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    meta: "Full simulated environment testing holographic HUD projection"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "s1",
    title: "Bespoke 3D Engineering",
    description: "Work directly alongside our aerospace structural and design engineering teams to customize the composite layout, power, and aerodynamic trims.",
    icon: "Layers"
  },
  {
    id: "s2",
    title: "Virtual Wind-Tunnel Simulation",
    description: "Every order triggers complex fluid dynamics modeling in our virtual wind-tunnel server array to optimize bespoke downforce arrays.",
    icon: "Wind"
  },
  {
    id: "s3",
    title: "Global Drone Delivery Network",
    description: "Enjoy zero-carbon rapid delivery of modules and vehicles directly to your hangar or property, anywhere with satellite coordinate permissions.",
    icon: "PlaneTakeoff"
  },
  {
    id: "s4",
    title: "Quantum Lifecycle Support",
    description: "Every vehicle contains secure diagnostic beacons linked with our smart maintenance labs for instant overnight updates and custom calibration packs.",
    icon: "Cpu"
  }
];
