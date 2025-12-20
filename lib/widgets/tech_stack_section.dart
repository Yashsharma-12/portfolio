import 'package:flutter/material.dart';
import 'tech_card.dart';
import '../data/tech_data.dart';

class TechStackSection extends StatelessWidget {
  final double scrollOffset;

  const TechStackSection({super.key, required this.scrollOffset});

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final bool isMobile = screenWidth < 600;

    return Container(
      // Reduce padding for mobile screens
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 50, 
        vertical: 80
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Core Tech Stack",
            style: TextStyle(
              color: Colors.white, 
              fontSize: isMobile ? 26 : 32, // Smaller title on mobile
              fontWeight: FontWeight.bold, 
              letterSpacing: 1.5
            ),
          ),
          const SizedBox(height: 40),
          _buildGrid(context, techStack, screenWidth, baseTrigger: 400),

          const SizedBox(height: 120),

          Text(
            "Professional Tools",
            style: TextStyle(
              color: Colors.white, 
              fontSize: isMobile ? 26 : 32, // Smaller title on mobile
              fontWeight: FontWeight.bold, 
              letterSpacing: 1.5
            ),
          ),
          const SizedBox(height: 40),
          _buildGrid(context, toolStack, screenWidth, baseTrigger: 900),
        ],
      ),
    );
  }

  Widget _buildGrid(BuildContext context, List<TechModel> list, double screenWidth, {required double baseTrigger}) {
    // Determine column count based on width
    int crossAxisCount;
    if (screenWidth > 1200) {
      crossAxisCount = 4;
    } else if (screenWidth > 800) {
      crossAxisCount = 3;
    } else if (screenWidth > 500) {
      crossAxisCount = 2;
    } else {
      crossAxisCount = 1; // Single column for very small phones
    }

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: list.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
        // Aspect ratio needs to be closer to 1.5 - 2.0 on mobile to avoid squishing text
        childAspectRatio: screenWidth < 500 ? 2.5 : 3.0, 
      ),
      itemBuilder: (context, index) => TechCard(
        name: list[index].name,
        logoUrl: list[index].logo,
        index: index,
        scrollOffset: scrollOffset,
        baseTrigger: baseTrigger, 
      ),
    );
  }
}