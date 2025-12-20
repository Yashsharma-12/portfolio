import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ProjectCard extends StatefulWidget {
  final String title;
  final String description;
  final String imagePath;
  final List<String> tech;
  final List<String> screenshots;
  final String link;

  const ProjectCard({
    super.key,
    required this.title,
    required this.description,
    required this.imagePath,
    required this.tech,
    required this.link,
    this.screenshots = const [],
  });

  @override
  State<ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<ProjectCard> {
  bool isHovered = false;
  bool isTitleHovered = false;

  Future<void> _launchURL() async {
    final Uri url = Uri.parse(widget.link);
    if (!await launchUrl(url)) {
      throw Exception('Could not launch $url');
    }
  }

  void _showFullScreenImage(BuildContext context, String path) {
    showDialog(
      context: context,
      barrierColor: Colors.black87,
      builder: (context) => GestureDetector(
        onTap: () => Navigator.pop(context),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Dialog(
            backgroundColor: Colors.transparent,
            insetPadding: const EdgeInsets.all(20),
            child: Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.asset(path, fit: BoxFit.contain),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => isHovered = true),
      onExit: (_) => setState(() => isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 400),
        margin: const EdgeInsets.only(bottom: 100), // Increased spacing between cards
        padding: const EdgeInsets.only(left: 30), // Space for the indicator line
        decoration: BoxDecoration(
          border: Border(
            left: BorderSide(
              color: isHovered ? const Color(0xFFEC5334) : Colors.transparent,
              width: 4,
            ),
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --- LEFT SIDE: PROJECT LOGO ---
            Expanded(
              flex: 2,
              child: Container(
                height: 400, // Reduced height for a cleaner look
                alignment: Alignment.center,
                child: AnimatedScale(
                  scale: isHovered ? 1.05 : 1.0,
                  duration: const Duration(milliseconds: 500),
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Image.asset(widget.imagePath, fit: BoxFit.contain),
                  ),
                ),
              ),
            ),

            // --- RIGHT SIDE: INFO & SCREENSHOTS ---
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // --- HYPERLINKED TITLE ---
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      onEnter: (_) => setState(() => isTitleHovered = true),
                      onExit: (_) => setState(() => isTitleHovered = false),
                      child: GestureDetector(
                        onTap: _launchURL,
                        child: AnimatedDefaultTextStyle(
                          duration: const Duration(milliseconds: 200),
                          style: TextStyle(
                            color: isTitleHovered ? const Color(0xFFEC5334) : Colors.white,
                            fontSize: 38, // Slightly larger title
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Georgia', // Matching your Hero/About style
                            decoration: isTitleHovered ? TextDecoration.underline : TextDecoration.none,
                            decorationColor: const Color(0xFFEC5334),
                          ),
                          child: Text(widget.title),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      widget.description,
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: 18,
                        height: 1.6,
                      ),
                    ),
                    const SizedBox(height: 30),
                    Wrap(
                      spacing: 12,
                      runSpacing: 12,
                      children: widget.tech.map((t) => _buildTechTag(t)).toList(),
                    ),
                    const SizedBox(height: 40),
                    if (widget.screenshots.isNotEmpty) _buildScreenshotList(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTechTag(String t) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(30), // Pill shape to match social buttons
        border: Border.all(color: Colors.white10),
      ),
      child: Text(
        t,
        style: const TextStyle(
          color: Color(0xFFEC5334), // Accent color for tech text
          fontSize: 13,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildScreenshotList() {
    return SizedBox(
      height: 250,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        itemCount: widget.screenshots.length,
        separatorBuilder: (context, index) => const SizedBox(width: 20),
        itemBuilder: (context, index) {
          return InkWell(
            onTap: () => _showFullScreenImage(context, widget.screenshots[index]),
            borderRadius: BorderRadius.circular(16),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              width: 140,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: isHovered ? Colors.white24 : Colors.transparent,
                ),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: Image.asset(widget.screenshots[index], fit: BoxFit.cover),
              ),
            ),
          );
        },
      ),
    );
  }
}