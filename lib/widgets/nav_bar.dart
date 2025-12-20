import 'dart:ui'; // Required for BackdropFilter
import 'package:flutter/material.dart';

class NavBar extends StatelessWidget {
  final VoidCallback onAboutTap;
  final VoidCallback onProjectTap;
  final VoidCallback onResumeTap;

  const NavBar({
    super.key,
    required this.onAboutTap,
    required this.onProjectTap,
    required this.onResumeTap,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      child: BackdropFilter(
        // This creates the frosted glass effect as you scroll
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
          decoration: BoxDecoration(
            // Use a very light opacity (0.05 to 0.1) for true transparency
            color: Colors.black.withOpacity(0.1),
            border: const Border(
              bottom: BorderSide(color: Colors.white10, width: 1),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Logo
              const Text(
                "YASH.",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                ),
              ),
              
              // Nav Buttons
              Row(
                children: [
                  _navButton("About", onAboutTap),
                  const SizedBox(width: 30),
                  _navButton("Projects", onProjectTap),
                  const SizedBox(width: 30),
                  _navButton("Resume", onResumeTap, isSpecial: true),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _navButton(String title, VoidCallback onTap, {bool isSpecial = false}) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: isSpecial ? BoxDecoration(
            border: Border.all(color: const Color(0xFFEC5334)),
            borderRadius: BorderRadius.circular(10),
          ) : null,
          child: Text(
            title,
            style: TextStyle(
              color: isSpecial ? const Color(0xFFEC5334) : Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }
}