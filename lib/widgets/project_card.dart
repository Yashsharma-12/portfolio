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
    final double width = MediaQuery.of(context).size.width;
    final bool isMobile = width < 800; // Breakpoint for mobile layout

    return MouseRegion(
      onEnter: (_) => setState(() => isHovered = true),
      onExit: (_) => setState(() => isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 400),
        margin: const EdgeInsets.only(bottom: 100),
        padding: EdgeInsets.only(left: isMobile ? 15 : 30),
        decoration: BoxDecoration(
          border: Border(
            left: BorderSide(
              color: isHovered ? const Color(0xFFEC5334) : Colors.transparent,
              width: 4,
            ),
          ),
        ),
        child: isMobile ? _buildMobileLayout() : _buildDesktopLayout(),
      ),
    );
  }

  // --- MOBILE LAYOUT (Vertical) ---
  Widget _buildMobileLayout() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildTitle(),
        const SizedBox(height: 20),
        _buildMainLogo(height: 250),
        const SizedBox(height: 20),
        _buildDescription(),
        const SizedBox(height: 20),
        _buildTechStack(),
        const SizedBox(height: 30),
        if (widget.screenshots.isNotEmpty) ...[
          const Text(
            "SCREENSHOTS",
            style: TextStyle(
              color: Color(0xFFEC5334),
              fontSize: 12,
              fontWeight: FontWeight.bold,
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 15),
          _buildVerticalScreenshotList(),
        ]
      ],
    );
  }

  // --- DESKTOP LAYOUT (Horizontal Row) ---
  Widget _buildDesktopLayout() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(flex: 2, child: _buildMainLogo(height: 400)),
        Expanded(
          flex: 4,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildTitle(),
                const SizedBox(height: 20),
                _buildDescription(),
                const SizedBox(height: 30),
                _buildTechStack(),
                const SizedBox(height: 40),
                if (widget.screenshots.isNotEmpty) _buildHorizontalScreenshotList(),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // --- SUB-WIDGETS ---

  Widget _buildTitle() {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => isTitleHovered = true),
      onExit: (_) => setState(() => isTitleHovered = false),
      child: GestureDetector(
        onTap: _launchURL,
        child: AnimatedDefaultTextStyle(
          duration: const Duration(milliseconds: 200),
          style: TextStyle(
            color: isTitleHovered ? const Color(0xFFEC5334) : Colors.white,
            fontSize: MediaQuery.of(context).size.width < 600 ? 28 : 38,
            fontWeight: FontWeight.bold,
            fontFamily: 'Georgia',
            decoration: isTitleHovered ? TextDecoration.underline : TextDecoration.none,
            decorationColor: const Color(0xFFEC5334),
          ),
          child: Text(widget.title),
        ),
      ),
    );
  }

  Widget _buildMainLogo({required double height}) {
    return Container(
      height: height,
      alignment: Alignment.centerLeft,
      child: AnimatedScale(
        scale: isHovered ? 1.05 : 1.0,
        duration: const Duration(milliseconds: 500),
        child: Image.asset(widget.imagePath, fit: BoxFit.contain),
      ),
    );
  }

  Widget _buildDescription() {
    return Text(
      widget.description,
      style: TextStyle(
        color: Colors.white.withOpacity(0.7),
        fontSize: 16,
        height: 1.6,
      ),
    );
  }

  Widget _buildTechStack() {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: widget.tech.map((t) => _buildTechTag(t)).toList(),
    );
  }

  Widget _buildTechTag(String t) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.white10),
      ),
      child: Text(
        t,
        style: const TextStyle(
          color: Color(0xFFEC5334),
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  // Used for Desktop
  Widget _buildHorizontalScreenshotList() {
    return SizedBox(
      height: 250,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        itemCount: widget.screenshots.length,
        separatorBuilder: (context, index) => const SizedBox(width: 20),
        itemBuilder: (context, index) => _screenshotItem(widget.screenshots[index], width: 140),
      ),
    );
  }

  // Used for Mobile
  Widget _buildVerticalScreenshotList() {
    return Column(
      children: widget.screenshots.map((s) => Padding(
        padding: const EdgeInsets.only(bottom: 20),
        child: _screenshotItem(s, width: double.infinity),
      )).toList(),
    );
  }

  Widget _screenshotItem(String path, {required double width}) {
    return InkWell(
      onTap: () => _showFullScreenImage(context, path),
      borderRadius: BorderRadius.circular(16),
      child: Container(
        width: width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isHovered ? Colors.white24 : Colors.transparent,
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.asset(path, fit: BoxFit.cover),
        ),
      ),
    );
  }
}