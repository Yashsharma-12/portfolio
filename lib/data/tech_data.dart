class TechModel {
  final String name;
  final String logo;
  final double proficiency; // Added proficiency (0.0 to 1.0)

  TechModel({
    required this.name, 
    required this.logo, 
    required this.proficiency,
  });
}

// Grid 1: Core Tech Stack
final List<TechModel> techStack = [
  TechModel(name: "Flutter", logo: "assets/icons/flutter.png", proficiency: 0.90),
  TechModel(name: "HTML", logo: "assets/icons/html.png", proficiency: 0.95),
  TechModel(name: "CSS", logo: "assets/icons/css.png", proficiency: 0.85),
  TechModel(name: "JavaScript", logo: "assets/icons/js.png", proficiency: 0.80),
  TechModel(name: "Node.js", logo: "assets/icons/nodejs.png", proficiency: 0.70),
  TechModel(name: "React", logo: "assets/icons/react.png", proficiency: 0.75),
  TechModel(name: "MongoDB", logo: "assets/icons/mongodb.png", proficiency: 0.65),
];

// Grid 2: Professional Tools
final List<TechModel> toolStack = [
  TechModel(name: "GitHub", logo: "assets/icons/github.png", proficiency: 0.85),
  TechModel(name: "Firebase", logo: "assets/icons/firebase.png", proficiency: 0.75),
  TechModel(name: "Figma", logo: "assets/icons/figma.png", proficiency: 0.80),
];