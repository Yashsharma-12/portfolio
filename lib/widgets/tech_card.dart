import 'package:flutter/material.dart';
import 'dart:ui';

class TechCard extends StatelessWidget {
  final String name;
  final String logoUrl;
  final int index;
  final double scrollOffset;
  final double baseTrigger;

  const TechCard({
    super.key,
    required this.name,
    required this.logoUrl,
    required this.index,
    required this.scrollOffset,
    required this.baseTrigger,
  });

  @override
  Widget build(BuildContext context) {
    // 1. Snappier Stagger (50ms): The cards will follow each other very closely
    double cardDelay = index * 80.0; 

    // 2. High Velocity Range (450.0): The animation finishes in just 450px of scrolling
    double entryProgress = ((scrollOffset - baseTrigger - cardDelay) / 450.0).clamp(0.0, 1.0);

    return AnimatedOpacity(
      // 3. Instant Fade (200ms): Almost immediate appearance
      duration: const Duration(milliseconds: 400), 
      opacity: entryProgress,
      child: Transform.translate(
        // 4. Long Travel (-200px): Starts from much further left
        // Moving 200px over a 450px scroll window creates a 4/9 speed ratio
        offset: Offset(-200 * (1 - entryProgress), 0),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.05),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: Color.lerp(
                const Color(0xFFEC5334), 
                Colors.white.withOpacity(0.05), 
                entryProgress, 
              )!,
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFEC5334).withOpacity(0.25 * (1 - entryProgress)),
                blurRadius: 15,
                spreadRadius: 1,
              ),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                logoUrl, 
                width: 26, 
                height: 26, 
                fit: BoxFit.contain,
                errorBuilder: (context, error, stackTrace) => const Icon(Icons.code, color: Colors.white24),
              ),
              const SizedBox(width: 12),
              Text(
                name,
                style: const TextStyle(
                  color: Colors.white, 
                  fontSize: 15, 
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.8,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}