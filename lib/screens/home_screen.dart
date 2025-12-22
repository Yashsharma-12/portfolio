import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../widgets/star_field.dart';
import '../widgets/nav_bar.dart';
import '../widgets/tech_stack_section.dart';
import '../widgets/about_note.dart';
import '../widgets/project_card.dart'; 
import '../data/project_data.dart'; 
import '../widgets/custom_cursor.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _scrollController = ScrollController();

  // --- NAVIGATION KEYS ---
  final GlobalKey _aboutKey = GlobalKey();
  final GlobalKey _projectKey = GlobalKey();

  // --- SCROLL LOGIC ---
  void _scrollToSection(GlobalKey key) {
    final context = key.currentContext;
    if (context != null) {
      Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOut,
        alignment: 0.0, 
      );
    }
  }

  // --- UPDATED EXTERNAL LINKS LOGIC ---
  Future<void> _launchURL(String url) async {
    final Uri uri = Uri.parse(url);

    if (url.contains("mailto:")) {
      final String email = url.replaceFirst("mailto:", "");
      final String gmailWebUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=$email";
      final Uri gmailUri = Uri.parse(gmailWebUrl);

      if (await canLaunchUrl(gmailUri)) {
        await launchUrl(gmailUri, mode: LaunchMode.externalApplication);
        return;
      }
    }

    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      debugPrint("Could not launch $url");
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Screen width for responsive decisions
    final double screenWidth = MediaQuery.of(context).size.width;
    final bool isMobile = screenWidth < 800;

    return Scaffold(
      backgroundColor: Colors.black,
      // Add endDrawer for mobile navigation
      endDrawer: isMobile ? _buildMobileDrawer() : null,
      body: CustomCursor(
        child: Stack(
          children: [
            // Layer 1: Fixed Background Star Field
            const StarField(),

            // Layer 2: Scrollable Content
            SingleChildScrollView(
              controller: _scrollController,
              child: Column(
                children: [
                  const SizedBox(height: 80),

                  AnimatedBuilder(
                    animation: _scrollController,
                    builder: (context, child) {
                      double offset = _scrollController.hasClients ? _scrollController.offset : 0;

                      // Hero Logic
                      double heroScale = (1.0 - (offset / 400)).clamp(0.0, 1.0);
                      double heroOpacity = (1.0 - (offset / 300)).clamp(0.0, 1.0);

                      // About Logic
                      double aboutScale = (0.5 + (offset / 800)).clamp(0.5, 1.0);
                      double aboutOpacity = (offset / 400).clamp(0.0, 1.0);

                      return Column(
                        children: [
                          // --- HERO SECTION ---
                          Container(
                            height: MediaQuery.of(context).size.height - 80,
                            alignment: Alignment.center,
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            child: Transform.scale(
                              scale: heroScale,
                              child: Opacity(
                                opacity: heroOpacity,
                                child: _buildHeroText(isMobile),
                              ),
                            ),
                          ),

                          // --- ABOUT ME SECTION ---
                          Padding(
                            key: _aboutKey,
                            padding: const EdgeInsets.only(top: 100), 
                            child: AboutNote(
                              scale: aboutScale,
                              opacity: aboutOpacity,
                            ),
                          ),

                          const SizedBox(height: 120),

                          // --- TECH STACK SECTION ---
                          TechStackSection(scrollOffset: offset),

                          // --- PROJECTS SECTION ---
                          Padding(
                            key: _projectKey,
                            padding: EdgeInsets.only(
                              top: 100, 
                              left: isMobile ? 20 : 50, 
                              right: isMobile ? 20 : 50
                            ),
                            child: _buildProjectSection(isMobile),
                          ),

                          const SizedBox(height: 150),

                          // --- MINIMAL FOOTER ---
                          _buildFooter(),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),

            // Layer 3: Fixed Transparent NavBar
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: NavBar(
                onAboutTap: () => _scrollToSection(_aboutKey),
                onProjectTap: () => _scrollToSection(_projectKey),
                onResumeTap: () => _launchURL('https://Yashsharma-12.github.io/portfolio/resume.pdf'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Mobile Navigation Drawer
  Widget _buildMobileDrawer() {
    return Drawer(
      backgroundColor: Colors.black.withOpacity(0.9),
      child: Column(
        children: [
          const DrawerHeader(
            child: Center(
              child: Text(
                "YASH",
                style: TextStyle(
                  color: Color(0xFFEC5334),
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          ListTile(
            title: const Text("ABOUT", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              _scrollToSection(_aboutKey);
            },
          ),
          ListTile(
            title: const Text("PROJECTS", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              _scrollToSection(_projectKey);
            },
          ),
          ListTile(
            title: const Text("RESUME", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              _launchURL('https://Yashsharma-12.github.io/portfolio/resume.pdf');
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 60),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.transparent, Colors.white.withOpacity(0.03)],
        ),
      ),
      child: Column(
        children: [
          const Text(
            "LET'S CONNECT",
            style: TextStyle(
              color: Color(0xFFEC5334),
              fontSize: 14,
              fontWeight: FontWeight.bold,
              letterSpacing: 3,
            ),
          ),
          const SizedBox(height: 25),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _socialIcon("assets/icons/github.png", "https://github.com/Yashsharma-12"),
              const SizedBox(width: 30),
              _socialIcon("assets/icons/linkedin.png", "https://www.linkedin.com/in/yash-sharma-2004d"),
              const SizedBox(width: 30),
              _socialIcon("assets/icons/gmail.png", "mailto:yashsharma2044@gmail.com"),
            ],
          ),
          const SizedBox(height: 40),
          const Text(
            "Designed & Built by Yash Sharma",
            style: TextStyle(color: Colors.white54, fontSize: 14),
          ),
          const SizedBox(height: 8),
          const Text(
            "© 2025 | Flutter Developer",
            style: TextStyle(color: Colors.white24, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _socialIcon(String assetPath, String url) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => _launchURL(url),
        child: Image.asset(
          assetPath,
          width: 28,
          height: 28,
          fit: BoxFit.contain,
          color: null,
        ),
      ),
    );
  }

  Widget _buildProjectSection(bool isMobile) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Featured Projects",
          style: TextStyle(
            color: Colors.white,
            fontSize: isMobile ? 26 : 32,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 10),
        Container(
          height: 3,
          width: 80,
          color: const Color(0xFFEC5334), 
        ),
        const SizedBox(height: 50),
        
        ...projects.map((p) => ProjectCard(
              title: p.title,
              description: p.description,
              imagePath: p.imagePath,
              tech: p.technologies,
              screenshots: p.screenshots ?? [],
              link: p.link, 
            )),
      ],
    );
  }

  Widget _buildHeroText(bool isMobile) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
            style: TextStyle(
              fontSize: isMobile ? 36 : 60, // Smaller font for phones
              color: Colors.white,
              height: 1.2,
              fontFamily: 'Georgia',
            ),
            children: [
              const TextSpan(text: "Hi! I'm "),
              const TextSpan(
                text: "Yash",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFEC5334),
                ),
              ),
              TextSpan(text: isMobile ? ".\nA Flutter Developer." : ".\nA creative Frontend Developer."),
            ],
          ),
        ),
        const SizedBox(height: 20),
        const Icon(
          Icons.keyboard_arrow_down,
          color: Colors.white54,
          size: 40,
        ),
      ],
    );
  }
}