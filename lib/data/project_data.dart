class ProjectModel {
  final String title;
  final String description;
  final String imagePath;
  final List<String> technologies;
  final String link;
  final List<String>? screenshots; 

  ProjectModel({
    required this.title, 
    required this.description, 
    required this.imagePath, 
    required this.technologies,
    required this.link,
    this.screenshots,
  });
}

final List<ProjectModel> projects = [
  ProjectModel(
    title: "Arsenal Fan App (The Armoury)",
    description: "A comprehensive platform for Gunners to track match stats, player news, and live updates with a sleek red & white UI.",
    imagePath: "assets/projects/arsenal.jpeg", 
    technologies: ["Flutter", "Firebase", "MongoDB", "Node.js", "REST API"],
    link: "https://github.com/Yashsharma-12/the-armoury-flutter",
    // IMPORTANT: Ensure the folder name on your disk matches 'assets/screenshorts/' exactly
    screenshots: [
      "assets/screenshorts/login.jpeg",
      "assets/screenshorts/homepage.jpeg",
      "assets/screenshorts/playerinfo.jpeg",
      "assets/screenshorts/matches.jpeg",
      "assets/screenshorts/squad.jpeg",
    ],
  ),
  ProjectModel(
    title: "Portfolio",
    description: "Personal portfolio website with interactive star fields, scroll-linked animations, and glassmorphism design.(you are in this project now!)",
    imagePath: "assets/projects/Portfolio.png",
    technologies: ["Flutter Web", "Canvas API"],
    link: "#",
    screenshots: [
      "assets/screenshorts/homescreen.png",
    ], // Passing empty list instead of null is safer for ListView
  ),
];