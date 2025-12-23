class ProjectModel {
  final String title;
  final String description;
  final String imagePath;
  final List<String> technologies;
  final String link;
  final List<String>? screenshots;
  final bool isLaptop; // Added to handle different dimensions

  ProjectModel({
    required this.title, 
    required this.description, 
    required this.imagePath, 
    required this.technologies,
    required this.link,
    this.screenshots,
    this.isLaptop = false, // Defaults to false (mobile/phone style)
  });
}

final List<ProjectModel> projects = [
  ProjectModel(
    title: "Arsenal Fan App (The Armoury)",
    description: "A comprehensive platform for Gunners to track match stats, player news, and live updates with a sleek red & white UI.",
    imagePath: "assets/projects/arsenal.jpeg", 
    technologies: ["Flutter", "Firebase", "MongoDB", "Node.js", "REST API"],
    link: "https://github.com/Yashsharma-12/the-armoury-flutter",
    isLaptop: false, // Phone dimensions
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
    description: "Personal portfolio website with interactive star fields, scroll-linked animations, and glassmorphism design.",
    imagePath: "assets/projects/Portfolio.png",
    technologies: ["Flutter Web", "Canvas API"],
    link: "#",
    isLaptop: true, // Portfolio is viewed on a browser
    screenshots: [
      "assets/screenshorts/homescreen.png",
    ],
  ),
  ProjectModel(
    title: "SnapBrief (Text Summarizer)",
    description: "SnapBrief is an AI-powered document intelligence platform designed to conquer information overload. transform dense text, PDFs, and Word documents into instant, actionable summaries.",
    imagePath: "assets/projects/SnapBrief.png", 
    technologies: ["Next.js", "tailwind CSS", "Gemini 2.5"],
    link: "https://github.com/Yashsharma-12/snap-brief",
    isLaptop: true, // Laptop dimensions for web app screenshots
    screenshots: [
      "assets/screenshorts/summary_page.png",
      "assets/screenshorts/history_page.png",
    ],
  ),
];