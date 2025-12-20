import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class AboutNote extends StatelessWidget {
  final double scale;
  final double opacity;

  const AboutNote({
    super.key,
    required this.scale,
    required this.opacity,
  });

  // Improved Launch Logic: Uses Gmail Web for reliable email opening on Web browsers
  Future<void> _launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    
    // Check if it's a mailto link and redirect to Gmail Web to avoid blank tabs
    if (url.contains("mailto:")) {
      final String email = url.replaceFirst("mailto:", "");
      final String gmailWebUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=$email";
      final Uri gmailUri = Uri.parse(gmailWebUrl);
      
      if (await canLaunchUrl(gmailUri)) {
        await launchUrl(gmailUri, mode: LaunchMode.externalApplication);
        return;
      }
    }

    // Standard launch for GitHub and LinkedIn
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Transform.scale(
      scale: scale,
      child: Opacity(
        opacity: opacity,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 50),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center, // Centers the content block globally
            children: [
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 700),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start, // Aligns everything inside the block to the left
                  children: [
                    // --- SECTION HEADER ---
                    const Text(
                      "About Me",
                      style: TextStyle(
                        color: Color(0xFFEC5334), // Arsenal Red
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Container(
                      height: 3,
                      width: 60,
                      color: const Color(0xFFEC5334),
                    ),
                    
                    const SizedBox(height: 40),
                    
                    // --- THE ARSENAL THEMED TEXT ---
                    Text(
                      "A Frontend Developer who believes in the 'Arsenal' way of playing—creative, attacking, and beautiful. "
                      "I build smooth, high-performance apps with Flutter, focusing on elegant code and seamless user experiences. "
                      "When I'm not coding, I'm likely cheering for the Gunners or exploring new tech trends.",
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.8),
                        fontSize: 20,
                        height: 1.6,
                        fontFamily: 'Georgia',
                      ),
                    ),
                    
                    const SizedBox(height: 40),
                    
                    // --- SOCIALS WRAP ---
                    Wrap(
                      spacing: 20,
                      runSpacing: 20,
                      children: [
                        _HoverSocialButton(
                          imagePath: "assets/icons/github.png",
                          label: "GitHub",
                          onTap: () => _launchURL("https://github.com/Yashsharma-12"),
                        ),
                        _HoverSocialButton(
                          imagePath: "assets/icons/linkedin.png",
                          label: "LinkedIn",
                          onTap: () => _launchURL("https://www.linkedin.com/in/yash-sharma-2004d"),
                        ),
                        _HoverSocialButton(
                          imagePath: "assets/icons/gmail.png",
                          label: "Email",
                          onTap: () => _launchURL("mailto:yashsharma2044@gmail.com"),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HoverSocialButton extends StatefulWidget {
  final String imagePath;
  final String label;
  final VoidCallback onTap;

  const _HoverSocialButton({
    required this.imagePath,
    required this.label,
    required this.onTap,
  });

  @override
  State<_HoverSocialButton> createState() => _HoverSocialButtonState();
}

class _HoverSocialButtonState extends State<_HoverSocialButton> {
  bool isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => isHovered = true),
      onExit: (_) => setState(() => isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          decoration: BoxDecoration(
            // Background opacity increases on hover for feedback
            color: isHovered 
                ? const Color(0xFFEC5334).withOpacity(0.15) 
                : Colors.white.withOpacity(0.06), 
            borderRadius: BorderRadius.circular(30),
            border: Border.all(
              color: isHovered ? const Color(0xFFEC5334) : Colors.white10,
              width: 1,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Image.asset(
                widget.imagePath,
                width: 20,
                height: 20,
                fit: BoxFit.contain,
                color: null, // Set to null to show original icon colors
                errorBuilder: (context, error, stackTrace) => 
                  const Icon(Icons.link, color: Colors.white, size: 18),
              ),
              const SizedBox(width: 10),
              Text(
                widget.label,
                style: TextStyle(
                  color: isHovered ? Colors.white : Colors.white.withOpacity(0.9),
                  fontWeight: FontWeight.w500,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}