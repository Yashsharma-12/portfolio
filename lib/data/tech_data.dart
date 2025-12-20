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
  TechModel(name: "Flutter", logo: "icons/flutter.png", proficiency: 0.90),
  TechModel(name: "HTML", logo: "icons/html.png", proficiency: 0.95),
  TechModel(name: "CSS", logo: "icons/css.png", proficiency: 0.85),
  TechModel(name: "JavaScript", logo: "icons/js.png", proficiency: 0.80),
  TechModel(name: "Node.js", logo: "icons/nodejs.png", proficiency: 0.70),
  TechModel(name: "React", logo: "icons/react.png", proficiency: 0.75),
  TechModel(name: "MongoDB", logo: "icons/mongodb.png", proficiency: 0.65),
];

// Grid 2: Professional Tools
final List<TechModel> toolStack = [
  TechModel(name: "GitHub", logo: "icons/github.png", proficiency: 0.85),
  TechModel(name: "Firebase", logo: "icons/firebase.png", proficiency: 0.75),
  TechModel(name: "Figma", logo: "icons/figma.png", proficiency: 0.80),
];