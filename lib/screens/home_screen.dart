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

    // Redirect mailto to Gmail Web to avoid blank browser tabs on Web
    if (url.contains("mailto:")) {
      final String email = url.replaceFirst("mailto:", "");
      final String gmailWebUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=$email";
      final Uri gmailUri = Uri.parse(gmailWebUrl);

      if (await canLaunchUrl(gmailUri)) {
        await launchUrl(gmailUri, mode: LaunchMode.externalApplication);
        return;
      }
    }

    // Standard launch for GitHub/LinkedIn/PDFs
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
    return Scaffold(
      backgroundColor: Colors.black,
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
                            child: Transform.scale(
                              scale: heroScale,
                              child: Opacity(
                                opacity: heroOpacity,
                                child: _buildHeroText(),
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
                            padding: const EdgeInsets.only(top: 100, left: 50, right: 50),
                            child: _buildProjectSection(),
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
                onResumeTap: () => _launchURL('https://your-resume-link.pdf'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // --- FOOTER WITH COLORED LOCAL ICONS ---
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
          color: null, // Shows original colored icons
        ),
      ),
    );
  }

  Widget _buildProjectSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Featured Projects",
          style: TextStyle(
            color: Colors.white,
            fontSize: 32,
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

  Widget _buildHeroText() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        RichText(
          textAlign: TextAlign.center,
          text: const TextSpan(
            style: TextStyle(
              fontSize: 60,
              color: Colors.white,
              height: 1.2,
              fontFamily: 'Georgia',
            ),
            children: [
              TextSpan(text: "Hi! I'm "),
              TextSpan(
                text: "Yash",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFEC5334),
                ),
              ),
              TextSpan(text: ".\nA creative Frontend Developer."),
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